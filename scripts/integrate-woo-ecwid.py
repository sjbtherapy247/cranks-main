#!/usr/bin/env python3
"""
Integrate WooCommerce products into Ecwid catalog
- Find products to add
- Generate 301 redirects from old WooCommerce URLs to Ecwid
"""

import csv
import re
from difflib import SequenceMatcher

# Load Ecwid products
print("Loading Ecwid catalog...")
ecwid_products = {}
ecwid_by_sku = {}
with open('Cranks_ecwid_catalogue.csv', 'r') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    for row in reader:
        if row['type'] == 'product':
            name = row['product_name'].lower().strip()
            ecwid_products[name] = row
            if row['product_sku']:
                ecwid_by_sku[row['product_sku']] = row

print(f"Loaded {len(ecwid_products)} Ecwid products")

# Load WooCommerce products  
print("Loading WooCommerce products...")
woo_products = []
with open('scripts/woo-products-extracted.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        woo_products.append(row)

print(f"Loaded {len(woo_products)} WooCommerce products")

def similar(a, b):
    """Calculate similarity ratio between two strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def find_ecwid_match(woo_name, woo_sku=''):
    """Find matching Ecwid product"""
    woo_name_lower = woo_name.lower().strip()
    
    # Exact match
    if woo_name_lower in ecwid_products:
        return ecwid_products[woo_name_lower], 'exact'
    
    # SKU match
    if woo_sku and woo_sku in ecwid_by_sku:
        return ecwid_by_sku[woo_sku], 'sku'
    
    # Fuzzy match (>85% similarity)
    best_match = None
    best_score = 0
    for ecwid_name, ecwid_data in ecwid_products.items():
        score = similar(woo_name, ecwid_name)
        if score > best_score:
            best_score = score
            best_match = ecwid_data
    
    if best_score > 0.85:
        return best_match, f'fuzzy ({best_score:.0%})'
    
    # Partial match (one contains the other)
    for ecwid_name, ecwid_data in ecwid_products.items():
        if woo_name_lower in ecwid_name or ecwid_name in woo_name_lower:
            return ecwid_data, 'partial'
    
    return None, None

# Process all WooCommerce products
print("\nMatching products...")
matches = []
to_add = []

for woo in woo_products:
    ecwid_match, match_type = find_ecwid_match(woo['name'], woo.get('sku', ''))
    
    if ecwid_match:
        matches.append({
            'woo_name': woo['name'],
            'woo_slug': woo['slug'],
            'woo_url': f"/product/{woo['slug']}/",
            'ecwid_name': ecwid_match['product_name'],
            'ecwid_id': ecwid_match['product_internal_id'],
            'ecwid_url': ecwid_match.get('url', ''),
            'match_type': match_type
        })
    else:
        to_add.append(woo)

print(f"Matched: {len(matches)}")
print(f"To add: {len(to_add)}")

# Generate products to add in Ecwid format
print("\nGenerating Ecwid import file for new products...")
ecwid_import = []
for woo in to_add:
    # Map WooCommerce categories to Ecwid format
    cats = woo.get('categories', '').split('; ')
    primary_cat = ''
    for cat in cats:
        # Get first non-brand category
        if 'Brand' not in cat:
            primary_cat = cat.split(' > ')[0]
            break
    if not primary_cat and cats:
        primary_cat = cats[0].split(' > ')[0]
    
    ecwid_import.append({
        'type': 'product',
        'product_internal_id': '',
        'product_sku': woo.get('sku', ''),
        'product_name': woo['name'],
        'product_price': woo.get('price', '').replace('$', ''),
        'product_compare_to_price': woo.get('regular_price', '').replace('$', ''),
        'product_is_inventory_tracked': 'false',
        'product_quantity': woo.get('stock', '0') or '0',
        'product_is_available': 'true',
        'product_media_main_image_url': woo.get('image_urls', '').split('|')[0] if woo.get('image_urls') else '',
        'product_description': woo.get('description', ''),
        'product_category_1': primary_cat,
        'product_is_shipping_required': 'true',
        'product_weight': woo.get('weight', '0.0') or '0.0',
    })

# Write products to add
if ecwid_import:
    with open('scripts/ecwid-products-to-add.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['type', 'product_internal_id', 'product_sku', 
            'product_name', 'product_price', 'product_compare_to_price', 'product_is_inventory_tracked',
            'product_quantity', 'product_is_available', 'product_media_main_image_url',
            'product_description', 'product_category_1', 'product_is_shipping_required', 'product_weight'])
        writer.writeheader()
        writer.writerows(ecwid_import)
    print(f"Written {len(ecwid_import)} products to scripts/ecwid-products-to-add.csv")

# Generate 301 redirects
print("\nGenerating 301 redirects...")

redirects = []
for m in matches:
    if m['ecwid_url']:
        # Extract Ecwid path from full URL
        ecwid_path = m['ecwid_url'].replace('https://v0-cranks.vercel.app', '')
        if ecwid_path:
            redirects.append({
                'source': m['woo_url'],
                'destination': ecwid_path,
                'product': m['woo_name']
            })

# Vercel redirects format (vercel.json)
vercel_redirects = []
for r in redirects:
    vercel_redirects.append({
        'source': r['source'],
        'destination': r['destination'],
        'permanent': True
    })

# Write Vercel redirects
import json
with open('scripts/redirects-vercel.json', 'w') as f:
    json.dump({'redirects': vercel_redirects}, f, indent=2)
print(f"Written {len(vercel_redirects)} redirects to scripts/redirects-vercel.json")

# Write Next.js redirects format
with open('scripts/redirects-nextjs.txt', 'w') as f:
    f.write("// Add to next.config.mjs\n")
    f.write("async redirects() {\n")
    f.write("  return [\n")
    for r in redirects:
        f.write(f"    {{ source: '{r['source']}', destination: '{r['destination']}', permanent: true }},\n")
    f.write("  ]\n")
    f.write("}\n")
print(f"Written Next.js format to scripts/redirects-nextjs.txt")

# Write CSV for review
with open('scripts/redirects-review.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['source', 'destination', 'product'])
    writer.writeheader()
    writer.writerows(redirects)
print(f"Written redirect review file to scripts/redirects-review.csv")

# Summary
print("\n" + "="*60)
print("INTEGRATION SUMMARY")
print("="*60)
print(f"WooCommerce products: {len(woo_products)}")
print(f"Already in Ecwid: {len(matches)}")
print(f"New products to add: {len(to_add)}")
print(f"301 Redirects generated: {len(redirects)}")
print()
if to_add:
    print("Products to ADD to Ecwid:")
    for p in to_add:
        print(f"  - {p['name']} (${p.get('price', 'N/A')})")
print()
print("FILES GENERATED:")
print("  - scripts/ecwid-products-to-add.csv (import to Ecwid)")
print("  - scripts/redirects-vercel.json (for Vercel)")
print("  - scripts/redirects-nextjs.txt (for next.config.mjs)")
print("  - scripts/redirects-review.csv (for review)")
