#!/usr/bin/env node
/**
 * Extract files from All-in-One WP Migration .wpress archive
 * Format: 255 bytes filename, 14 bytes size, 12 bytes mtime, 4096 bytes prefix, then content
 */

const fs = require('fs')
const path = require('path')

const HEADER_SIZE = 255 + 14 + 12 + 4096 // 4377 bytes

const wpressPath = process.argv[2]
const outputDir = process.argv[3] || './wpress-extracted'

if (!wpressPath) {
  console.log('Usage: node extract-wpress.js <file.wpress> [output-dir]')
  process.exit(1)
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log(`Extracting ${wpressPath} to ${outputDir}...`)
console.log('Looking for database.sql and product-related files...\n')

const fd = fs.openSync(wpressPath, 'r')
const stats = fs.statSync(wpressPath)
let position = 0
let filesFound = 0

const buffer = Buffer.alloc(HEADER_SIZE)

while (position < stats.size) {
  // Read header
  const bytesRead = fs.readSync(fd, buffer, 0, HEADER_SIZE, position)
  if (bytesRead < HEADER_SIZE) break

  // Parse header
  const filename = buffer.slice(0, 255).toString('utf8').replace(/\0/g, '').trim()
  const sizeStr = buffer.slice(255, 269).toString('utf8').replace(/\0/g, '').trim()
  const fileSize = parseInt(sizeStr, 10)

  if (!filename || isNaN(fileSize)) {
    console.log('End of archive or invalid entry')
    break
  }

  position += HEADER_SIZE

  // Check if this is a file we want
  const isInteresting = 
    filename === 'database.sql' ||
    filename.includes('product') ||
    filename.endsWith('.csv') ||
    filename === 'package.json'

  if (isInteresting) {
    console.log(`Found: ${filename} (${(fileSize / 1024 / 1024).toFixed(2)} MB)`)
    
    // Read and save the file
    const outputPath = path.join(outputDir, path.basename(filename))
    const contentBuffer = Buffer.alloc(fileSize)
    fs.readSync(fd, contentBuffer, 0, fileSize, position)
    fs.writeFileSync(outputPath, contentBuffer)
    console.log(`  -> Saved to ${outputPath}`)
    filesFound++
  }

  position += fileSize
  
  // Progress indicator every 100MB
  if (position % (100 * 1024 * 1024) < HEADER_SIZE) {
    console.log(`Progress: ${(position / stats.size * 100).toFixed(1)}%`)
  }
}

fs.closeSync(fd)
console.log(`\nDone! Extracted ${filesFound} files.`)
