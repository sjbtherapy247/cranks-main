# URL Structure Migration Plan - Cranks.com.au

## 📊 Current Site Analysis

Based on the sitemap from [cranks.com.au](https://cranks.com.au/sitemap_index.xml) and site analysis, the current structure includes:

### **Sitemap Components:**
- **Page Sitemap** (2024-07-30) - Main pages and navigation
- **Product Sitemaps 1-4** (2025-08-01/31) - 4000+ products across multiple files
- **Product Category Sitemap** (2025-08-01) - Product categorization
- **Testimonial Sitemap** (2021-09-29) - Customer reviews
- **Local Sitemap** (2023-05-16) - Local business information

### **Current Site Structure Analysis:**
From [cranks.com.au](https://cranks.com.au/):

**Main Navigation:**
- Home
- Shop (with extensive category structure)
- All Bikes
- Our Services  
- About Us
- Contact Us
- Sale Items

**Product Categories (Major):**
- **Bikes & Frames**
  - Mountain Bikes (Dual Suspension, Hard Tail)
  - CX/Gravel/Urban
  - E Bikes (E Commuter, E MTB, E Road)
  - Kids Bikes (by age: 2-4, 4-6, 5-8, 7-11, 10-15 years)
  - BMX, Road Bikes, Dirt Jumpers
- **Scooters**
  - Kids Scooters, Stunt Scooters, Adult Scooters
- **Accessories**
  - Extensive subcategories (Lights, Locks, Bags, etc.)
- **Clothing & Helmets**
- **Parts**
- **Gift Ideas**

## 🎯 URL Structure Preservation Strategy

### **1. Next.js Route Mapping**

#### **Static Pages (Keep Exact URLs)**
```
Current → New Next.js Structure
/ → app/page.tsx (homepage)
/about-us → app/about-us/page.tsx
/contact → app/contact/page.tsx
/our-services → app/our-services/page.tsx
/wishlist → app/wishlist/page.tsx
```

#### **Product & Category Routes (Dynamic)**
```
Current WooCommerce → New Next.js + Ecwid Structure
/product/[slug] → app/product/[slug]/page.tsx
/product-category/[category] → app/category/[category]/page.tsx
/shop → app/shop/page.tsx
/shop/page/[number] → app/shop/page/[number]/page.tsx

# Preserve exact category URLs
/bikes → app/category/bikes/page.tsx
/scooters → app/category/scooters/page.tsx
/accessories → app/category/accessories/page.tsx
/clothing-helmets → app/category/clothing-helmets/page.tsx
/parts → app/category/parts/page.tsx
/gift-ideas → app/category/gift-ideas/page.tsx
```

#### **WooCommerce E-commerce Routes**
```
Current → New Ecwid Integration
/cart → app/cart/page.tsx (Ecwid widget)
/checkout → app/checkout/page.tsx (Ecwid widget)
/my-account → app/my-account/page.tsx (Ecwid widget)
```

### **2. Category Hierarchy Preservation**

Based on the current extensive categorization:

```typescript
// Category URL structure to maintain
/category/bikes
├── /category/bikes/mountain-bikes
│   ├── /category/bikes/mountain-bikes/dual-suspension
│   └── /category/bikes/mountain-bikes/hard-tail
├── /category/bikes/e-bikes
│   ├── /category/bikes/e-bikes/e-commuter
│   ├── /category/bikes/e-bikes/e-mtb
│   └── /category/bikes/e-bikes/e-road
├── /category/bikes/kids-bikes
│   ├── /category/bikes/kids-bikes/2-4-yrs
│   ├── /category/bikes/kids-bikes/4-6-yrs
│   ├── /category/bikes/kids-bikes/5-8-yrs
│   ├── /category/bikes/kids-bikes/7-11-yrs
│   └── /category/bikes/kids-bikes/10-15-yrs
└── /category/bikes/bmx
```

### **3. Content Type Migration**

#### **WordPress → Sanity Mapping**
```typescript
// Content structure preservation
WordPress Pages → Sanity Documents
├── Homepage → homePage (singleton)
├── About Us → aboutPage (singleton) 
├── Our Services → servicesPage + individual service documents
├── Contact → contactPage + storeInfo
└── Blog Posts → post documents

// Store Information
Business Details → storeInfo (singleton)
├── Address: 352A Penshurst Street, Chatswood, NSW 2067
├── Phone: +61 2 9417 3776
├── Email: sales@cranks.com.au
├── Hours: Mon-Fri 9am-5pm, Sat 9am-4pm, Sun 9am-3pm
└── Established: 30+ years serving North Shore Sydney
```

#### **WooCommerce → Ecwid Product Migration**
```typescript
// Product structure preservation
Current Categories → Ecwid Categories
├── Bikes & Frames (with all subcategories)
├── Scooters (Kids, Stunt, Adult)
├── Accessories (15+ subcategories)
├── Clothing & Helmets
├── Parts (11 subcategories)
└── Gift Ideas (6 subcategories)

// Preserve product URLs
/product/trek-fx-3-stepover → /product/trek-fx-3-stepover
/product/micro-sprite-kids-scooter-blue → /product/micro-sprite-kids-scooter-blue
```

## 🛠️ Implementation Plan

### **Phase 1: Route Structure Setup**

#### **Create Next.js File Structure**
```
app/
├── page.tsx (homepage)
├── about-us/
│   └── page.tsx
├── contact/
│   └── page.tsx  
├── our-services/
│   └── page.tsx
├── shop/
│   ├── page.tsx
│   └── page/
│       └── [number]/
│           └── page.tsx
├── category/
│   └── [...slug]/
│       └── page.tsx (dynamic category pages)
├── product/
│   └── [slug]/
│       └── page.tsx (individual products)
├── cart/
│   └── page.tsx (Ecwid integration)
├── checkout/
│   └── page.tsx (Ecwid integration)
├── my-account/
│   └── page.tsx (Ecwid integration)
└── wishlist/
    └── page.tsx
```

### **Phase 2: SEO & Redirect Strategy**

#### **Critical SEO Preservation**
```typescript
// Maintain key business information
const storeInfo = {
  name: "Cranks Bikes",
  location: "Chatswood, Sydney North Shore",
  established: "30+ years",
  specialties: ["bikes", "ebikes", "scooters", "repairs"],
  brands: ["Trek", "Norco", "Factor", "Micro Scooters", "BYK"],
  services: ["sales", "repairs", "bike fitting", "free 3-month service"]
}
```

#### **URL Redirect Map**
```javascript
// next.config.mjs redirects
const redirects = [
  // Maintain any changed URLs
  {
    source: '/bikes-frames',
    destination: '/category/bikes',
    permanent: true,
  },
  {
    source: '/clothing-helmets', 
    destination: '/category/clothing-helmets',
    permanent: true,
  },
  // Preserve product search patterns
  {
    source: '/product-category/:category',
    destination: '/category/:category',
    permanent: true,
  }
]
```

### **Phase 3: Content Migration Priority**

#### **High Priority (Immediate SEO Impact)**
1. **Homepage** - Hero content, featured products, business info
2. **About Us** - 30+ years experience, local expertise
3. **Our Services** - Repairs, fitting, free service guarantee
4. **Contact** - Location, hours, phone, email
5. **Store Info** - Complete business details

#### **Medium Priority (Product Discovery)**
1. **Category Pages** - All bike types, scooters, accessories
2. **Featured Products** - Top sellers, new arrivals
3. **Brand Pages** - Trek, Norco, Factor showcase

#### **Lower Priority (Enhanced Content)**
1. **Blog Posts** - Cycling tips, maintenance guides
2. **Testimonials** - Customer reviews and feedback
3. **Advanced Features** - Wishlist, advanced search

## 📋 Technical Implementation

### **Category Page Generation**
```typescript
// app/category/[...slug]/page.tsx
export async function generateStaticParams() {
  // Generate all category combinations
  return [
    { slug: ['bikes'] },
    { slug: ['bikes', 'mountain-bikes'] },
    { slug: ['bikes', 'mountain-bikes', 'dual-suspension'] },
    { slug: ['scooters'] },
    { slug: ['scooters', 'kids-scooters'] },
    // ... all category combinations
  ]
}
```

### **Product Page Generation**
```typescript
// app/product/[slug]/page.tsx
export async function generateStaticParams() {
  // Fetch all products from Ecwid
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}
```

### **Sitemap Generation**
```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    // Static pages
    { url: 'https://cranks.com.au/', priority: 1.0 },
    { url: 'https://cranks.com.au/about-us', priority: 0.8 },
    { url: 'https://cranks.com.au/contact', priority: 0.8 },
    
    // Category pages
    ...categories.map(cat => ({
      url: `https://cranks.com.au/category/${cat.slug}`,
      priority: 0.7
    })),
    
    // Product pages
    ...products.map(product => ({
      url: `https://cranks.com.au/product/${product.slug}`,
      priority: 0.6
    }))
  ]
}
```

## 🎯 Success Metrics

### **SEO Preservation Goals**
- ✅ **Zero broken links** - All existing URLs work or redirect properly
- ✅ **Category structure maintained** - All current categories preserved
- ✅ **Product URLs preserved** - Individual product pages keep URLs
- ✅ **Local SEO maintained** - Chatswood, North Shore presence
- ✅ **Brand associations** - Trek, Norco, Factor, etc. maintained

### **User Experience Goals**
- ✅ **Familiar navigation** - Customers find products easily
- ✅ **Search functionality** - Product discovery maintained
- ✅ **Mobile experience** - Responsive design throughout
- ✅ **Page speed** - Faster loading than current site

### **Business Continuity**
- ✅ **Phone integration** - Call buttons prominent
- ✅ **Location prominence** - Chatswood shop highlighted
- ✅ **Service emphasis** - 30+ years experience, free service
- ✅ **Stock messaging** - "Call to check availability" maintained

## 📈 Timeline & Next Steps

### **Week 1-2: Foundation**
- Set up Next.js route structure
- Implement category page templates
- Configure Ecwid integration

### **Week 3-4: Content Migration**
- Migrate WordPress content to Sanity
- Set up product category mappings
- Implement search functionality

### **Week 5-6: Testing & Optimization**
- Test all URL redirects
- Verify category navigation
- Performance optimization

**This plan ensures zero SEO loss while modernizing the platform! 🚴‍♂️**