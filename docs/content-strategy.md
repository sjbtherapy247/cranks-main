# Content Strategy & Information Architecture

## Site Structure

### Public Pages
- **Homepage** - Hero, featured products, about preview
- **Products** - Category pages, individual product pages  
- **Services** - Repairs, fitting, maintenance, rentals
- **About** - Store history, team, mission
- **Contact** - Location, hours, contact form
- **Blog** - Cycling tips, news, product spotlights

### Ecommerce Pages
- **Cart** - Shopping cart management
- **Checkout** - Payment and delivery options
- **Account** - Customer profile and order history
- **Click & Collect** - Pickup management

## Sanity Content Types

### Core Pages
```typescript
// Homepage content
homePage: {
  heroTitle: string
  heroSubtitle: string
  heroImage: image
  featuredCategories: array
  aboutPreview: text
  ctaButtons: array
}

// Service pages
service: {
  title: string
  slug: slug
  description: text
  price: number
  duration: string
  bookingRequired: boolean
}

// Blog posts
post: {
  title: string
  slug: slug
  author: string
  publishedAt: datetime
  excerpt: text
  content: blockContent
  featuredImage: image
  categories: array
}

// Store information
storeInfo: {
  name: string
  address: object
  phone: string
  email: string
  hours: array
  socialMedia: object
}
```

## Ecwid Product Structure

### Categories
- **Bikes**
  - Mountain Bikes
  - Road Bikes  
  - E-Bikes
  - Kids Bikes
- **Parts**
  - Wheels
  - Drivetrain
  - Brakes
  - Suspension
- **Accessories**
  - Helmets
  - Lights
  - Locks
  - Bags
- **Clothing**
  - Jerseys
  - Shorts
  - Shoes
  - Protective Gear

### Product Attributes
- Name, description, price (from Lightspeed)
- Images (managed in Ecwid)
- Categories and tags
- Inventory levels (synced from Lightspeed)
- Variants (size, color, etc.)

## Content Migration Plan

### From WordPress
1. **Export content** using WordPress export tool
2. **Identify page types** and map to Sanity schemas
3. **Image audit** - download and optimize for Sanity
4. **Content cleanup** - remove outdated information
5. **SEO preservation** - maintain URL structure where possible

### Content Priorities
1. **Homepage hero** and key messaging
2. **About page** - store story and team
3. **Services pages** - repair, fitting, etc.
4. **Contact information** and store details
5. **Blog posts** (if valuable for SEO)

## SEO Strategy

### Technical SEO
- [ ] Proper heading structure (H1, H2, H3)
- [ ] Meta descriptions and titles
- [ ] Open Graph tags
- [ ] Structured data for products
- [ ] XML sitemap generation
- [ ] Robot.txt configuration

### Content SEO
- [ ] Local business optimization
- [ ] Product category pages
- [ ] Blog content for cycling topics
- [ ] Location-based landing pages
- [ ] Brand and product name optimization

## User Experience Flow

### Customer Journey
1. **Discovery** - Search, social media, referrals
2. **Browse** - Category pages, featured products
3. **Research** - Product details, reviews, comparisons
4. **Purchase** - Add to cart, checkout process
5. **Fulfillment** - Click & collect or delivery
6. **Support** - Account management, service booking

### Key Conversion Points
- [ ] Clear category navigation
- [ ] Prominent search functionality
- [ ] Easy add-to-cart buttons
- [ ] Trust signals (reviews, warranties)
- [ ] Multiple contact methods
- [ ] Service booking integration

## Content Governance

### Client Responsibilities
- Product descriptions and specifications
- Service information and pricing
- Blog content creation
- Store hours and contact updates
- Promotional content

### Developer Responsibilities
- Technical content structure
- SEO optimization
- Performance monitoring
- Security updates
- Feature enhancements