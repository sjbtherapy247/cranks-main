#!/usr/bin/env node
/**
 * Extract WooCommerce products from WordPress SQL dump
 */

const fs = require('fs')
const path = require('path')

const sqlPath = process.argv[2] || './wpress-extracted/database.sql'
const outputPath = process.argv[3] || './scripts/woo-products.csv'

console.log(`Reading SQL dump from: ${sqlPath}`)

const sql = fs.readFileSync(sqlPath, 'utf8')

// Find all product posts
const products = []
const productMeta = {}
const terms = {}
const termRelationships = {}
const termTaxonomies = {}

// Parse posts - look for products
const postsRegex = /INSERT INTO `SERVMASK_PREFIX_posts` VALUES \(([^;]+)\);/g
let match

console.log('Parsing posts...')
while ((match = postsRegex.exec(sql)) !== null) {
  const values = match[1]
  // Split by ),( to get individual rows
  const rows = values.split('),(')
  
  for (const row of rows) {
    // Clean up the row
    const cleanRow = row.replace(/^\(/, '').replace(/\)$/, '')
    
    // Check if this is a product
    if (cleanRow.includes("'product'") && !cleanRow.includes("'product_variation'")) {
      // Parse the row - WP posts columns:
      // ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt,
      // post_status, comment_status, ping_status, post_password, post_name (slug), to_ping,
      // pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent,
      // guid, menu_order, post_type, post_mime_type, comment_count
      
      try {
        // Extract ID (first number)
        const idMatch = cleanRow.match(/^(\d+),/)
        if (!idMatch) continue
        const id = idMatch[1]
        
        // Extract post_title - find the pattern after the dates and content
        // This is tricky with SQL escaping, let's use a simpler approach
        const titleMatch = cleanRow.match(/'([^']*?)','[^']*?','(publish|draft|private|pending)',/)
        if (titleMatch) {
          const title = titleMatch[1].replace(/\\'/g, "'")
          const status = titleMatch[2]
          
          // Extract slug (post_name)
          const slugMatch = cleanRow.match(/'(publish|draft|private|pending)','[^']*?','[^']*?','[^']*?','([^']+)',/)
          const slug = slugMatch ? slugMatch[2] : ''
          
          if (status === 'publish') {
            products.push({
              id,
              title,
              slug,
              status
            })
          }
        }
      } catch (e) {
        // Skip malformed rows
      }
    }
  }
}

console.log(`Found ${products.length} published products`)

// Parse postmeta for prices, SKUs, etc
console.log('Parsing product meta...')
const metaRegex = /INSERT INTO `SERVMASK_PREFIX_postmeta` VALUES \(([^;]+)\);/g

while ((match = metaRegex.exec(sql)) !== null) {
  const values = match[1]
  const rows = values.split('),(')
  
  for (const row of rows) {
    const cleanRow = row.replace(/^\(/, '').replace(/\)$/, '')
    
    // postmeta: meta_id, post_id, meta_key, meta_value
    const metaMatch = cleanRow.match(/(\d+),(\d+),'([^']+)','([^']*)'/)
    if (metaMatch) {
      const postId = metaMatch[2]
      const metaKey = metaMatch[3]
      const metaValue = metaMatch[4]
      
      if (!productMeta[postId]) {
        productMeta[postId] = {}
      }
      
      // Store relevant meta
      if (['_price', '_regular_price', '_sale_price', '_sku', '_stock', '_stock_status', '_weight', '_thumbnail_id'].includes(metaKey)) {
        productMeta[postId][metaKey] = metaValue
      }
    }
  }
}

// Parse terms (categories, tags)
console.log('Parsing terms...')
const termsRegex = /INSERT INTO `SERVMASK_PREFIX_terms` VALUES \(([^;]+)\);/g

while ((match = termsRegex.exec(sql)) !== null) {
  const values = match[1]
  const rows = values.split('),(')
  
  for (const row of rows) {
    const cleanRow = row.replace(/^\(/, '').replace(/\)$/, '')
    const termMatch = cleanRow.match(/(\d+),'([^']+)','([^']+)',/)
    if (termMatch) {
      terms[termMatch[1]] = {
        name: termMatch[2].replace(/\\'/g, "'"),
        slug: termMatch[3]
      }
    }
  }
}

// Parse term_taxonomy
console.log('Parsing term taxonomies...')
const taxRegex = /INSERT INTO `SERVMASK_PREFIX_term_taxonomy` VALUES \(([^;]+)\);/g

while ((match = taxRegex.exec(sql)) !== null) {
  const values = match[1]
  const rows = values.split('),(')
  
  for (const row of rows) {
    const cleanRow = row.replace(/^\(/, '').replace(/\)$/, '')
    const taxMatch = cleanRow.match(/(\d+),(\d+),'([^']+)',/)
    if (taxMatch) {
      const termTaxId = taxMatch[1]
      const termId = taxMatch[2]
      const taxonomy = taxMatch[3]
      
      if (taxonomy === 'product_cat') {
        termTaxonomies[termTaxId] = {
          termId,
          taxonomy,
          name: terms[termId]?.name || '',
          slug: terms[termId]?.slug || ''
        }
      }
    }
  }
}

// Parse term_relationships
console.log('Parsing term relationships...')
const relRegex = /INSERT INTO `SERVMASK_PREFIX_term_relationships` VALUES \(([^;]+)\);/g

while ((match = relRegex.exec(sql)) !== null) {
  const values = match[1]
  const rows = values.split('),(')
  
  for (const row of rows) {
    const cleanRow = row.replace(/^\(/, '').replace(/\)$/, '')
    const relMatch = cleanRow.match(/(\d+),(\d+),/)
    if (relMatch) {
      const objectId = relMatch[1]
      const termTaxId = relMatch[2]
      
      if (!termRelationships[objectId]) {
        termRelationships[objectId] = []
      }
      termRelationships[objectId].push(termTaxId)
    }
  }
}

// Build final product list with all data
console.log('Building product list...')
const finalProducts = products.map(p => {
  const meta = productMeta[p.id] || {}
  const categories = (termRelationships[p.id] || [])
    .map(taxId => termTaxonomies[taxId])
    .filter(t => t)
    .map(t => t.name)
    .join(' > ')
  
  return {
    id: p.id,
    name: p.title,
    slug: p.slug,
    sku: meta._sku || '',
    price: meta._price || meta._regular_price || '',
    sale_price: meta._sale_price || '',
    stock: meta._stock || '',
    stock_status: meta._stock_status || '',
    weight: meta._weight || '',
    categories: categories,
    old_url: `/product/${p.slug}/`
  }
})

// Write to CSV
console.log(`Writing ${finalProducts.length} products to ${outputPath}`)
const headers = ['id', 'name', 'slug', 'sku', 'price', 'sale_price', 'stock', 'stock_status', 'weight', 'categories', 'old_url']
const csvContent = [
  headers.join(','),
  ...finalProducts.map(p => 
    headers.map(h => {
      const val = p[h] || ''
      // Escape quotes and wrap in quotes if contains comma or quote
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }).join(',')
  )
].join('\n')

fs.writeFileSync(outputPath, csvContent)
console.log('Done!')

// Also output a summary
console.log('\n--- Summary ---')
console.log(`Total products: ${finalProducts.length}`)
const categoryCounts = {}
finalProducts.forEach(p => {
  if (p.categories) {
    const cats = p.categories.split(' > ')
    cats.forEach(c => {
      categoryCounts[c] = (categoryCounts[c] || 0) + 1
    })
  }
})
console.log('\nTop categories:')
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`))
