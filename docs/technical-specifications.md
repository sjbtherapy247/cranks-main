# Technical Specifications

## Current Stack
- **Frontend:** Next.js 15.2.4 + React 19
- **Styling:** Tailwind CSS + shadcn/ui components
- **Deployment:** Vercel (planned)
- **Images:** Currently unoptimized (to be addressed)

## Target Architecture

### Frontend (Next.js)
```bash
Dependencies to add:
- @sanity/client
- next-sanity
- @portabletext/react
- @ecwid/api-client
```

### Content Management (Sanity)
- **Studio:** Hosted Sanity studio for client content management
- **Schemas:** Pages, blog posts, store info, SEO metadata
- **CDN:** Sanity's built-in image CDN for content images

### Ecommerce (Ecwid)
- **Products:** Synced from Lightspeed POS
- **Inventory:** Real-time sync
- **Orders:** Cart, checkout, payment processing
- **Customer Accounts:** Basic profiles and order history

### Image Storage Strategy
1. **Product Images:** Ecwid hosting (simplest, syncs with Lightspeed)
2. **Content Images:** Sanity CDN (hero images, about us, etc.)
3. **Optimization:** Next.js Image component with proper sizing

## API Integration Points

### Sanity API
```typescript
// Fetch homepage content
const homePageData = await sanity.fetch(`
  *[_type == "homePage"][0]{
    title,
    heroImage,
    content
  }
`)
```

### Ecwid API
```typescript
// Fetch products
const products = await ecwid.products.getAll({
  limit: 100,
  category: 'bikes'
})
```

## Data Migration Specs

### WooCommerce Export Format
- **Format:** CSV export
- **Fields:** Product name, description, price, category, images, SKU
- **Volume:** ~4000 products
- **Images:** Download and re-upload to Ecwid

### Ecwid Import Requirements
- **CSV Mapping:** WooCommerce fields → Ecwid fields
- **Image Processing:** Bulk upload with product association
- **Category Mapping:** WordPress categories → Ecwid categories

## Performance Considerations
- **Image Optimization:** Next.js Image component with responsive sizing
- **Static Generation:** ISR for product pages
- **API Caching:** Cache Sanity content, fresh Ecwid inventory
- **Bundle Size:** Code splitting for admin features

## Security & Compliance
- **API Keys:** Environment variables, never in client code
- **Payment Security:** Handled by Ecwid (PCI compliant)
- **HTTPS:** Required for all payment processing
- **Data Privacy:** GDPR compliance through Ecwid