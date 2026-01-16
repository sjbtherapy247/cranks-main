# Image Setup Guide

## Current Image Strategy

### 1. Static Images (Hero, Categories, etc.)
**Location:** `/public` folder  
**Usage:** Direct paths like `/hero-slider-1.png`  
**Status:** ✅ Should work automatically

These images are served directly from the `public` folder:
- `/hero-slider-1.png`, `/hero-slider-2.png`, `/hero-slider-3.png`
- `/mountain-bikes.png`
- `/road-bikes.png`
- `/bike-shop-interior.png`
- `/mountain-bike-rider-on-trail.png`
- `/assorted-bike-accessories.png`
- `/classic-red-bicycle.png`
- `/cranks-logo.png`

### 2. Product Images (Future - Ecwid Integration)
**Source:** Ecwid API  
**Property:** `product.imageUrl` or `product.galleryImages[].url`  
**Status:** ⚠️ Not yet integrated (currently using mock data)

When Ecwid is integrated, product images will come from:
```typescript
// From lib/ecwid.ts
interface EcwidProduct {
  imageUrl?: string  // Main product image
  galleryImages?: Array<{
    id: string
    url: string      // Additional product images
    alt: string
  }>
}
```

### 3. Sanity Images (Optional - for CMS content)
**Source:** Sanity CDN  
**Usage:** Only if you upload images through Sanity Studio  
**Status:** ⚠️ Not currently used for static images

## Troubleshooting Images Not Showing

### Check 1: Verify Images Exist
```bash
ls -la public/*.png
```

### Check 2: Verify Image Paths in Code
All image paths should start with `/` (not `./` or relative paths):
- ✅ Correct: `/hero-slider-1.png`
- ❌ Wrong: `./hero-slider-1.png` or `hero-slider-1.png`

### Check 3: Next.js Image Component
Make sure you're using Next.js `Image` component:
```tsx
import Image from "next/image"

<Image 
  src="/hero-slider-1.png" 
  alt="Description"
  width={1200}
  height={600}
/>
```

### Check 4: Browser Console
Check browser console for 404 errors on image paths.

### Check 5: Dev Server Restart
After adding images to `/public`, restart the dev server:
```bash
npm run dev
```

## Next Steps for Ecwid Product Images

When integrating Ecwid products, update the shop page:

```typescript
// app/shop/page.tsx
import { getProducts } from '@/lib/ecwid'

// Replace mockProducts with:
const productsData = await getProducts()
const products = productsData.items.map(product => ({
  id: product.id.toString(),
  name: product.name,
  image: product.imageUrl || '/placeholder-jez9w.png', // Use Ecwid image
  price: product.defaultDisplayedPrice,
  // ... other fields
}))
```

The `next.config.mjs` already includes Ecwid image domains:
- `images.ecwid.com`
- `d2j6dbq0eux0bg.cloudfront.net`

So Ecwid images will work once integrated!
