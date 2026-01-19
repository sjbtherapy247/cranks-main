#!/usr/bin/env python3
"""
Extract WooCommerce products from WordPress SQL dump
"""

import re
import csv
import sys

sql_path = sys.argv[1] if len(sys.argv) > 1 else './wpress-extracted/database.sql'
output_path = sys.argv[2] if len(sys.argv) > 2 else './scripts/woo-products-extracted.csv'

print(f"Reading SQL dump from: {sql_path}")

with open(sql_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find products - columns in wp_posts:
# ID, author, post_date, post_date_gmt, content, title, excerpt, status, comment_status, 
# ping_status, password, post_name (slug), to_ping, pinged, modified, modified_gmt, 
# filtered, parent, guid, menu_order, post_type, mime_type, comment_count

print("Extracting products...")
product_pattern = r"\((\d+),\d+,'[^']*','[^']*','([^']*)','([^']+)','([^']*)','(publish|draft|private)','[^']*','[^']*','[^']*','([^']+)','[^']*','[^']*','[^']*','[^']*','[^']*',\d+,'[^']*',\d+,'product',"
products = {}

for match in re.finditer(product_pattern, content):
    product_id = match.group(1)
    description = match.group(2).replace("\\n", "\n").replace("\\'", "'")[:500]  # Truncate for CSV
    title = match.group(3).replace("\\'", "'")
    short_desc = match.group(4).replace("\\'", "'")[:200]
    status = match.group(5)
    slug = match.group(6)
    
    if status == 'publish':
        products[product_id] = {
            'id': product_id,
            'name': title,
            'slug': slug,
            'description': description,
            'short_description': short_desc,
            'sku': '',
            'price': '',
            'regular_price': '',
            'sale_price': '',
            'stock': '',
            'stock_status': '',
            'weight': '',
            'categories': [],
            'images': [],
            'old_url': f'/product/{slug}/'
        }

print(f"Found {len(products)} published products")

# Extract postmeta
print("Extracting product metadata...")
meta_pattern = r"\((\d+),(\d+),'(_price|_regular_price|_sale_price|_sku|_stock|_stock_status|_weight|_thumbnail_id|_product_image_gallery)','([^']*)'\)"

for match in re.finditer(meta_pattern, content):
    post_id = match.group(2)
    meta_key = match.group(3)
    meta_value = match.group(4)
    
    if post_id in products:
        if meta_key == '_price':
            products[post_id]['price'] = meta_value
        elif meta_key == '_regular_price':
            products[post_id]['regular_price'] = meta_value
        elif meta_key == '_sale_price':
            products[post_id]['sale_price'] = meta_value
        elif meta_key == '_sku':
            products[post_id]['sku'] = meta_value
        elif meta_key == '_stock':
            products[post_id]['stock'] = meta_value
        elif meta_key == '_stock_status':
            products[post_id]['stock_status'] = meta_value
        elif meta_key == '_weight':
            products[post_id]['weight'] = meta_value
        elif meta_key == '_thumbnail_id':
            products[post_id]['images'].append(meta_value)
        elif meta_key == '_product_image_gallery':
            products[post_id]['images'].extend(meta_value.split(','))

# Extract terms (categories)
print("Extracting categories...")
terms = {}
term_pattern = r"\((\d+),'([^']+)','([^']+)',\d+\)"
for match in re.finditer(term_pattern, content):
    term_id = match.group(1)
    name = match.group(2).replace("\\'", "'")
    slug = match.group(3)
    terms[term_id] = {'name': name, 'slug': slug}

# Extract term taxonomies (to find product categories)
print("Extracting term taxonomies...")
term_taxonomies = {}
tax_pattern = r"\((\d+),(\d+),'product_cat','[^']*',(\d+),"
for match in re.finditer(tax_pattern, content):
    term_tax_id = match.group(1)
    term_id = match.group(2)
    parent = match.group(3)
    if term_id in terms:
        term_taxonomies[term_tax_id] = {
            'term_id': term_id,
            'name': terms[term_id]['name'],
            'slug': terms[term_id]['slug'],
            'parent': parent
        }

# Build category hierarchy
def get_category_path(term_tax_id, depth=0):
    if depth > 10 or term_tax_id not in term_taxonomies:
        return []
    tax = term_taxonomies[term_tax_id]
    if tax['parent'] != '0':
        # Find parent term_tax_id
        for ttid, t in term_taxonomies.items():
            if t['term_id'] == tax['parent']:
                return get_category_path(ttid, depth + 1) + [tax['name']]
    return [tax['name']]

# Extract term relationships (product -> category)
print("Extracting product-category relationships...")
rel_pattern = r"\((\d+),(\d+),\d+\)"
for match in re.finditer(rel_pattern, content):
    object_id = match.group(1)
    term_tax_id = match.group(2)
    
    if object_id in products and term_tax_id in term_taxonomies:
        cat_path = get_category_path(term_tax_id)
        if cat_path:
            products[object_id]['categories'].append(' > '.join(cat_path))

# Extract image URLs from posts (attachments)
print("Extracting image URLs...")
attachment_pattern = r"\((\d+),\d+,'[^']*','[^']*','[^']*','[^']*','[^']*','inherit',[^)]+,'([^']+)',[^,]+,'attachment','image/[^']+',\d+\)"
attachments = {}
for match in re.finditer(attachment_pattern, content):
    att_id = match.group(1)
    guid = match.group(2)
    attachments[att_id] = guid

# Update products with image URLs
for pid, product in products.items():
    image_urls = []
    for img_id in product['images']:
        if img_id in attachments:
            image_urls.append(attachments[img_id])
    product['image_urls'] = '|'.join(image_urls)
    product['categories'] = '; '.join(set(product['categories']))

# Write to CSV
print(f"Writing {len(products)} products to {output_path}")
fieldnames = ['id', 'name', 'slug', 'sku', 'price', 'regular_price', 'sale_price', 
              'stock', 'stock_status', 'weight', 'categories', 'description', 
              'short_description', 'image_urls', 'old_url']

with open(output_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()
    for product in products.values():
        writer.writerow(product)

print("Done!")

# Summary
print("\n--- Summary ---")
print(f"Total products: {len(products)}")
print(f"Products with SKU: {sum(1 for p in products.values() if p['sku'])}")
print(f"Products with price: {sum(1 for p in products.values() if p['price'])}")
print(f"Products with images: {sum(1 for p in products.values() if p['image_urls'])}")

# Category breakdown
cat_counts = {}
for p in products.values():
    for cat in p['categories'].split('; '):
        if cat:
            top_cat = cat.split(' > ')[0]
            cat_counts[top_cat] = cat_counts.get(top_cat, 0) + 1

print("\nTop-level categories:")
for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1])[:15]:
    print(f"  {cat}: {count}")
