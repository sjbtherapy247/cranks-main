/**
 * WooCommerce to Ecwid Migration Script
 * 
 * Features:
 *   - Preserves full category hierarchy (Bikes > Mountain Bikes > Hard Tail)
 *   - Generates category import file for Ecwid
 *   - Cleans HTML from descriptions
 *   - Handles images (Ecwid will download from URLs)
 * 
 * Usage:
 *   1. Export your WooCommerce products as CSV
 *   2. Place the CSV in this scripts folder as 'woo-products.csv'
 *   3. Run: node scripts/woo-to-ecwid-migration.js
 *   4. First import 'ecwid-categories.csv' to Ecwid (Catalog > Categories > Import)
 *   5. Then import 'ecwid-products.csv' to Ecwid (Catalog > Products > Import)
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================

// Set to true to PRESERVE granular categories (Bikes > Mountain Bikes > Hard Tail)
// Set to false to COLLAPSE to top-level categories only
const PRESERVE_CATEGORY_HIERARCHY = true;

// Categories to SKIP (usually empty or system categories)
const SKIP_CATEGORIES = [
  'uncategorized',
  'brands', // Brands are handled separately
];

// Category name corrections (optional - fix typos or standardize names)
const CATEGORY_CORRECTIONS = {
  // 'old name': 'New Name',
  'e bikes': 'E-Bikes',
  'e mtb bikes': 'E-MTB',
  'e city & commuter': 'E-City & Commuter',
  'hard tail': 'Hardtail',
  'dual suspension': 'Full Suspension',
  'cx and gravel bikes': 'Gravel & CX',
};

// ============================================
// FIELD MAPPING - WooCommerce to Ecwid
// ============================================
const FIELD_MAPPING = {
  // WooCommerce field : Ecwid field
  'Name': 'name',
  'name': 'name',
  'post_title': 'name',
  'SKU': 'sku',
  'sku': 'sku',
  'Regular price': 'price',
  'regular_price': 'price',
  'Sale price': 'compareToPrice',
  'sale_price': 'compareToPrice',
  'Description': 'description',
  'description': 'description',
  'Short description': 'description',
  'post_excerpt': 'description',
  'Categories': 'categories',
  'categories': 'categories',
  'Images': 'imageUrl',
  'images': 'imageUrl',
  'Stock': 'quantity',
  'stock': 'quantity',
  'stock_quantity': 'quantity',
  'Weight (kg)': 'weight',
  'weight': 'weight',
  'Brands': 'brand',
  'brand': 'brand',
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = parseCSVLine(lines[0]);
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = parseCSVLine(line);
    const product = {};
    
    headers.forEach((header, index) => {
      product[header.trim()] = values[index] || '';
    });
    
    products.push(product);
  }

  return { headers, products };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function cleanHTML(html) {
  if (!html) return '';
  
  return html
    // Remove HTML tags
    .replace(/<[^>]*>/g, ' ')
    // Decode common HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

function mapCategory(wooCategory, allCategories) {
  if (!wooCategory) return 'Uncategorized';
  
  // WooCommerce exports categories in format: "Parent > Child > Grandchild"
  // or sometimes comma-separated for multiple category assignments
  
  // Take the first category path (primary category)
  const categoryPaths = wooCategory.split(',').map(c => c.trim());
  const primaryPath = categoryPaths[0];
  
  if (PRESERVE_CATEGORY_HIERARCHY) {
    // Clean and preserve the full path
    const parts = primaryPath
      .split('>')
      .map(p => p.trim())
      .filter(p => p && !SKIP_CATEGORIES.includes(p.toLowerCase()));
    
    // Apply corrections
    const correctedParts = parts.map(p => {
      const lower = p.toLowerCase();
      return CATEGORY_CORRECTIONS[lower] || p;
    });
    
    // Build the category path for Ecwid
    // Ecwid uses forward slash for nested categories in import
    const ecwidPath = correctedParts.join('/');
    
    // Track all unique categories
    if (ecwidPath && allCategories) {
      // Add all levels of the hierarchy
      let path = '';
      for (const part of correctedParts) {
        path = path ? `${path}/${part}` : part;
        allCategories.add(path);
      }
    }
    
    return ecwidPath || 'Uncategorized';
  } else {
    // Collapse to top-level only
    const parts = primaryPath.split('>').map(p => p.trim());
    const topLevel = parts[0];
    const lower = topLevel.toLowerCase();
    
    if (SKIP_CATEGORIES.includes(lower)) {
      return parts[1] || 'Uncategorized';
    }
    
    return CATEGORY_CORRECTIONS[lower] || topLevel;
  }
}

function getFirstImageUrl(images) {
  if (!images) return '';
  
  // WooCommerce exports images as comma-separated URLs or pipe-separated
  const urls = images.split(/[,|]/).map(u => u.trim());
  const firstUrl = urls[0];
  
  // Ensure it's a valid URL
  if (firstUrl && (firstUrl.startsWith('http://') || firstUrl.startsWith('https://'))) {
    return firstUrl;
  }
  
  return '';
}

function cleanPrice(price) {
  if (!price) return '';
  
  // Remove currency symbols and clean up
  return price
    .replace(/[^0-9.]/g, '')
    .trim();
}

function transformProduct(wooProduct, headers, allCategories) {
  const ecwidProduct = {
    name: '',
    sku: '',
    price: '',
    compareToPrice: '',
    description: '',
    categories: '',
    imageUrl: '',
    quantity: '',
    weight: '',
    brand: '',
    enabled: 'true'
  };
  
  // Map fields
  for (const [wooField, value] of Object.entries(wooProduct)) {
    const ecwidField = FIELD_MAPPING[wooField];
    
    if (ecwidField) {
      switch (ecwidField) {
        case 'description':
          ecwidProduct.description = cleanHTML(value);
          break;
        case 'categories':
          ecwidProduct.categories = mapCategory(value, allCategories);
          break;
        case 'imageUrl':
          ecwidProduct.imageUrl = getFirstImageUrl(value);
          break;
        case 'price':
        case 'compareToPrice':
          ecwidProduct[ecwidField] = cleanPrice(value);
          break;
        default:
          ecwidProduct[ecwidField] = value;
      }
    }
  }
  
  // Skip products without name or price
  if (!ecwidProduct.name || !ecwidProduct.price) {
    return null;
  }
  
  // Generate SKU if missing
  if (!ecwidProduct.sku) {
    ecwidProduct.sku = ecwidProduct.name
      .substring(0, 20)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '-');
  }
  
  return ecwidProduct;
}

// Generate Ecwid category import CSV
function generateCategoryCSV(categories) {
  // Sort categories so parents come before children
  const sortedCategories = Array.from(categories).sort((a, b) => {
    const aDepth = (a.match(/\//g) || []).length;
    const bDepth = (b.match(/\//g) || []).length;
    if (aDepth !== bDepth) return aDepth - bDepth;
    return a.localeCompare(b);
  });
  
  // Ecwid category import format
  const lines = ['name,parentCategory,enabled,description'];
  
  for (const catPath of sortedCategories) {
    const parts = catPath.split('/');
    const name = parts[parts.length - 1];
    const parent = parts.slice(0, -1).join('/') || '';
    
    // Escape values
    const escapedName = name.includes(',') ? `"${name}"` : name;
    const escapedParent = parent.includes(',') ? `"${parent}"` : parent;
    
    lines.push(`${escapedName},${escapedParent},true,`);
  }
  
  return lines.join('\n');
}

function generateEcwidCSV(products) {
  const headers = [
    'name',
    'sku', 
    'price',
    'compareToPrice',
    'description',
    'categories',
    'imageUrl',
    'quantity',
    'weight',
    'enabled'
  ];
  
  const lines = [headers.join(',')];
  
  for (const product of products) {
    const values = headers.map(h => {
      const val = product[h] || '';
      // Escape quotes and wrap in quotes if contains comma or quote
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    lines.push(values.join(','));
  }
  
  return lines.join('\n');
}

// ============================================
// MAIN EXECUTION
// ============================================

function main() {
  const inputFile = path.join(__dirname, 'woo-products.csv');
  const outputFile = path.join(__dirname, 'ecwid-products.csv');
  const categoryFile = path.join(__dirname, 'ecwid-categories.csv');
  const reportFile = path.join(__dirname, 'migration-report.txt');
  
  console.log('🚴 WooCommerce to Ecwid Migration Tool\n');
  console.log(`   Mode: ${PRESERVE_CATEGORY_HIERARCHY ? 'PRESERVE hierarchy (SEO-friendly)' : 'COLLAPSE to top-level'}\n`);
  
  // Check for input file
  if (!fs.existsSync(inputFile)) {
    console.log('❌ Input file not found!');
    console.log(`   Please place your WooCommerce export at:`);
    console.log(`   ${inputFile}\n`);
    console.log('📝 To export from WooCommerce:');
    console.log('   1. Go to WordPress Admin → WooCommerce → Products');
    console.log('   2. Click "Export" button');
    console.log('   3. Select all columns and export as CSV');
    console.log('   4. Save as "woo-products.csv" in the scripts folder\n');
    
    // Create sample file for reference
    const sampleCSV = `Name,SKU,Regular price,Sale price,Categories,Description,Images,Stock
"Norco Charger 1 (2025)","NOR-CHG1-25","1899.00","","Bikes > Mountain Bikes > Hard Tail","Climb mountains, ride trails","https://cranks.com.au/wp-content/uploads/norco-charger.jpg","5"
"Scott Aspect 930 MTB","SCO-ASP930","1499.00","1199.00","Bikes > Mountain Bikes > Hard Tail","Hardtail mountain bike","https://cranks.com.au/wp-content/uploads/scott-aspect.jpg","3"
"100% Accuri 2 Goggles","100-ACC2-BLK","89.00","","Clothing > Eyewear > Goggles","MTB goggles with clear lens","https://cranks.com.au/wp-content/uploads/100-goggles.jpg","12"`;
    
    fs.writeFileSync(path.join(__dirname, 'woo-products-sample.csv'), sampleCSV);
    console.log('📄 Created sample file: woo-products-sample.csv');
    console.log('   (Shows category hierarchy format: "Bikes > Mountain Bikes > Hard Tail")');
    return;
  }
  
  // Read and parse input
  console.log('📖 Reading WooCommerce export...');
  const csvContent = fs.readFileSync(inputFile, 'utf-8');
  const { headers, products: wooProducts } = parseCSV(csvContent);
  
  console.log(`   Found ${wooProducts.length} products`);
  console.log(`   Columns: ${headers.slice(0, 5).join(', ')}...`);
  
  // Transform products and collect categories
  console.log('\n🔄 Transforming products...');
  const ecwidProducts = [];
  const skipped = [];
  const allCategories = new Set();
  const categoryStats = {};
  
  for (const wooProduct of wooProducts) {
    const ecwidProduct = transformProduct(wooProduct, headers, allCategories);
    
    if (ecwidProduct) {
      ecwidProducts.push(ecwidProduct);
      
      // Track category stats
      const cat = ecwidProduct.categories;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    } else {
      skipped.push(wooProduct['Name'] || wooProduct['name'] || 'Unknown');
    }
  }
  
  console.log(`   ✅ Transformed: ${ecwidProducts.length} products`);
  console.log(`   ⏭️  Skipped (no name/price): ${skipped.length}`);
  console.log(`   📁 Found ${allCategories.size} unique categories`);
  
  // Category hierarchy
  console.log('\n📁 Category hierarchy:');
  const sortedCats = Array.from(allCategories).sort();
  for (const cat of sortedCats.slice(0, 20)) {
    const depth = (cat.match(/\//g) || []).length;
    const indent = '  '.repeat(depth + 1);
    const name = cat.split('/').pop();
    const count = categoryStats[cat] || 0;
    console.log(`${indent}${name}${count ? ` (${count} products)` : ''}`);
  }
  if (sortedCats.length > 20) {
    console.log(`   ... and ${sortedCats.length - 20} more categories`);
  }
  
  // Generate category CSV
  console.log('\n💾 Generating Ecwid category CSV...');
  const categoryCSV = generateCategoryCSV(allCategories);
  fs.writeFileSync(categoryFile, categoryCSV);
  console.log(`   Saved to: ${categoryFile}`);
  
  // Generate products CSV
  console.log('\n💾 Generating Ecwid products CSV...');
  const ecwidCSV = generateEcwidCSV(ecwidProducts);
  fs.writeFileSync(outputFile, ecwidCSV);
  console.log(`   Saved to: ${outputFile}`);
  
  // Generate report
  const report = `
WooCommerce to Ecwid Migration Report
=====================================
Date: ${new Date().toISOString()}
Mode: ${PRESERVE_CATEGORY_HIERARCHY ? 'PRESERVE hierarchy' : 'COLLAPSE to top-level'}

Input: ${inputFile}
Output Products: ${outputFile}
Output Categories: ${categoryFile}

Products Processed: ${wooProducts.length}
Products Migrated: ${ecwidProducts.length}
Products Skipped: ${skipped.length}
Categories Found: ${allCategories.size}

Category Hierarchy:
${Array.from(allCategories).sort().map(cat => {
  const depth = (cat.match(/\//g) || []).length;
  const indent = '  '.repeat(depth);
  const count = categoryStats[cat] || 0;
  return `${indent}- ${cat}${count ? ` (${count} products)` : ''}`;
}).join('\n')}

Skipped Products (no name or price):
${skipped.map(name => `  - ${name}`).join('\n') || '  None'}

===========================================
IMPORT INSTRUCTIONS
===========================================

STEP 1: Import Categories First
-------------------------------
1. Go to Ecwid Control Panel → Catalog → Categories
2. Click Import (or use bulk actions)
3. Upload: ecwid-categories.csv
4. This creates your category hierarchy

STEP 2: Import Products
-----------------------
1. Go to Ecwid Control Panel → Catalog → Products
2. Click Import
3. Upload: ecwid-products.csv
4. Map columns to Ecwid fields
5. ✅ ENABLE "Download images from URLs"
6. Run import

STEP 3: Verify
--------------
1. Check products have correct categories
2. Verify images downloaded properly
3. Test a few product pages

Notes:
- Categories use "/" as path separator (e.g., "Bikes/Mountain Bikes/Hardtail")
- Edit CATEGORY_CORRECTIONS in the script to fix typos
- Set PRESERVE_CATEGORY_HIERARCHY = false to collapse to top-level only
`;
  
  fs.writeFileSync(reportFile, report);
  console.log(`\n📊 Report saved to: ${reportFile}`);
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ Migration prep complete!');
  console.log('='.repeat(50));
  console.log('\n📋 NEXT STEPS:');
  console.log('');
  console.log('   1️⃣  FIRST: Import categories');
  console.log('       Ecwid → Catalog → Categories → Import');
  console.log(`       File: ${path.basename(categoryFile)}`);
  console.log('');
  console.log('   2️⃣  THEN: Import products');
  console.log('       Ecwid → Catalog → Products → Import');
  console.log(`       File: ${path.basename(outputFile)}`);
  console.log('       ✅ Enable "Download images from URLs"');
  console.log('');
}

main();
