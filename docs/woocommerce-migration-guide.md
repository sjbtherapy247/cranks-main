# WooCommerce to Ecwid Migration Guide

## Overview
Migrating ~4000 products from WooCommerce to Ecwid while preserving data integrity and SEO value.

## Pre-Migration Audit

### Data Assessment
- [ ] Product count verification
- [ ] Category structure analysis
- [ ] Image inventory (size, format, quality)
- [ ] Custom fields identification
- [ ] Variant products review
- [ ] SEO URL structure documentation

### Export Preparation
```bash
# WordPress/WooCommerce Export Checklist
- [ ] Admin access confirmed
- [ ] Database backup completed
- [ ] Plugin compatibility checked
- [ ] Export format decided (CSV vs XML)
```

## Export Process

### Method 1: WooCommerce Built-in Exporter
1. **Navigate to:** WooCommerce → Tools → Export
2. **Select:** Products
3. **Configure filters:**
   - Date range: All
   - Product status: Published
   - Categories: All
   - Meta: Include all
4. **Export CSV**

### Method 2: WP All Export Plugin (Recommended)
```xml
<!-- Custom export template for better Ecwid compatibility -->
<products>
  <product>
    <name>{post_title}</name>
    <description>{post_content}</description>
    <short_description>{post_excerpt}</short_description>
    <sku>{_sku}</sku>
    <price>{_regular_price}</price>
    <sale_price>{_sale_price}</sale_price>
    <categories>{product_cat}</categories>
    <images>{_product_image_gallery}</images>
    <weight>{_weight}</weight>
    <stock_quantity>{_stock}</stock_quantity>
  </product>
</products>
```

### Method 3: Database Direct Export
```sql
-- Custom SQL query for advanced users
SELECT 
  p.ID,
  p.post_title as name,
  p.post_content as description,
  p.post_excerpt as short_description,
  pm1.meta_value as sku,
  pm2.meta_value as regular_price,
  pm3.meta_value as sale_price,
  pm4.meta_value as stock_quantity
FROM wp_posts p
LEFT JOIN wp_postmeta pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_sku'
LEFT JOIN wp_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_regular_price'
LEFT JOIN wp_postmeta pm3 ON p.ID = pm3.post_id AND pm3.meta_key = '_sale_price'
LEFT JOIN wp_postmeta pm4 ON p.ID = pm4.post_id AND pm4.meta_key = '_stock'
WHERE p.post_type = 'product' AND p.post_status = 'publish';
```

## Data Transformation

### Field Mapping
```javascript
// WooCommerce → Ecwid field mapping
const fieldMapping = {
  'post_title': 'name',
  'post_content': 'description', 
  'post_excerpt': 'short_description',
  '_sku': 'sku',
  '_regular_price': 'price',
  '_sale_price': 'compare_price',
  '_stock': 'quantity',
  '_weight': 'weight',
  'product_cat': 'categories',
  '_product_image_gallery': 'images'
}
```

### Data Cleaning Script
```javascript
// Node.js script for data transformation
const fs = require('fs');
const csv = require('csv-parser');

function cleanProductData(inputFile, outputFile) {
  const results = [];
  
  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
      // Clean and transform data
      const cleaned = {
        name: data.post_title?.trim(),
        description: cleanHtml(data.post_content),
        sku: data._sku || generateSku(data.post_title),
        price: parseFloat(data._regular_price) || 0,
        categories: parseCategories(data.product_cat),
        images: parseImages(data._product_image_gallery)
      };
      
      if (cleaned.name && cleaned.price > 0) {
        results.push(cleaned);
      }
    })
    .on('end', () => {
      writeEcwidCsv(results, outputFile);
    });
}
```

## Image Migration

### Image Download Strategy
```bash
# Bulk image download script
#!/bin/bash
WORDPRESS_URL="https://oldsite.com"
IMAGE_DIR="./images"

while IFS=',' read -r product_id image_url; do
  if [[ $image_url == http* ]]; then
    filename=$(basename "$image_url")
    wget -P "$IMAGE_DIR" "$image_url"
    echo "$product_id,$filename" >> image_mapping.csv
  fi
done < product_images.csv
```

### Image Optimization
```javascript
// Image processing with Sharp
const sharp = require('sharp');

async function optimizeImages(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    await sharp(`${inputDir}/${file}`)
      .resize(800, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85 })
      .toFile(`${outputDir}/${file}`);
  }
}
```

## Ecwid Import Process

### CSV Format for Ecwid
```csv
Name,Description,SKU,Price,Categories,Image URLs,Weight,Stock
"Trek Mountain Bike","High-performance mountain bike","TRK-MTN-001",1299.99,"Bikes > Mountain Bikes","https://images.com/trek.jpg",15.5,10
```

### Import Steps
1. **Prepare CSV** in Ecwid format
2. **Upload images** to Ecwid or external CDN
3. **Import products** via Ecwid admin
4. **Map categories** to match site structure
5. **Verify import** - spot check products
6. **Fix issues** - reimport failed items

### Bulk Import API Alternative
```javascript
// Ecwid API bulk import
const EcwidAPI = require('@ecwid/api-client');

async function bulkImportProducts(products) {
  const ecwid = new EcwidAPI(storeId, apiToken);
  
  for (const product of products) {
    try {
      await ecwid.products.add(product);
      console.log(`Imported: ${product.name}`);
    } catch (error) {
      console.error(`Failed: ${product.name}`, error);
    }
  }
}
```

## Category Migration

### Category Mapping Strategy
```javascript
// WordPress → Ecwid category mapping
const categoryMapping = {
  'mountain-bikes': 'Bikes/Mountain Bikes',
  'road-bikes': 'Bikes/Road Bikes',
  'bike-parts': 'Parts',
  'accessories': 'Accessories',
  'cycling-clothing': 'Clothing'
};
```

## Quality Assurance

### Post-Import Checklist
- [ ] Product count matches export
- [ ] Random sample verification (50 products)
- [ ] Category structure correct
- [ ] Images displaying properly
- [ ] Prices accurate
- [ ] SKUs preserved
- [ ] Descriptions formatted correctly
- [ ] Variants imported correctly

### SEO Preservation
- [ ] Product URLs documented
- [ ] 301 redirects planned
- [ ] Meta descriptions preserved
- [ ] Image alt text maintained

## Rollback Plan

### Backup Strategy
- [ ] Ecwid export before import
- [ ] Original WooCommerce data preserved
- [ ] Image backups maintained
- [ ] Category structure documented

### Recovery Process
1. Delete imported products
2. Restore from backup
3. Fix data issues
4. Re-import corrected data

## Timeline & Resources

### Estimated Timeline
- **Export & Preparation:** 2-3 days
- **Data Cleaning:** 2-3 days  
- **Image Processing:** 1-2 days
- **Import & Testing:** 2-3 days
- **QA & Fixes:** 1-2 days

### Required Tools
- [ ] WP All Export Plugin (optional)
- [ ] Node.js for data processing
- [ ] Image optimization tools
- [ ] CSV editors (Excel/Google Sheets)
- [ ] FTP/SFTP access for images