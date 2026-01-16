# Cranks Bike Shop - Launch Preparation TODOs

## 🚀 Current Status: **60% Ready for Launch**

**Last Assessment:** See `LAUNCH-READINESS-ASSESSMENT.md` for full details.

### ✅ Completed
- All core pages implemented (Home, Shop, Services, About, Contact)
- Responsive UI/UX complete
- Sanity schema and queries defined
- Ecwid SDK installed and configured
- Image optimization configured
- Metadata/SEO basics implemented

### ⚠️ Critical Blockers
- Server-side Sanity integration not implemented (using mock data)
- Ecwid products not integrated (using mock products)
- Environment variables not verified
- Error handling missing

---

## 🔴 CRITICAL - Must Complete Before Launch

### 1. Environment Variables Setup
**Status:** ❌ Not Configured  
**Time:** 30 minutes

- [ ] Create `.env.local` with development variables:
  ```bash
  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=your_token
  NEXT_PUBLIC_ECWID_STORE_ID=your_store_id
  NEXT_PUBLIC_ECWID_PUBLIC_TOKEN=your_public_token
  ECWID_SECRET_TOKEN=your_secret_token
  ```
- [ ] Configure production environment variables (Vercel/hosting)
- [ ] Test environment variables are accessible
- [ ] Document setup process

---

### 2. Server-Side Sanity Integration
**Status:** ❌ Not Implemented  
**Time:** 2-3 hours  
**Priority:** HIGHEST

**Tasks:**
- [ ] Update `app/layout.tsx` to fetch `siteSettings` server-side
- [ ] Modify `components/layout/Header.tsx`:
  - Remove `mockNavigation` and `mockSiteData`
  - Accept `siteSettings` as props
  - Use `siteSettings.navigation` and `siteSettings.contactInfo`
- [ ] Modify `components/layout/Footer.tsx`:
  - Accept `siteSettings` as props
  - Use Sanity data for contact info, hours, etc.
- [ ] Remove or deprecate `hooks/useSiteSettings.ts` (client-side hook)
- [ ] Test navigation loads without flash
- [ ] Verify SEO (check page source for pre-rendered content)

**Implementation Pattern:**
```typescript
// app/layout.tsx
import { sanityFetch } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'

export default async function RootLayout({ children }) {
  const siteSettings = await sanityFetch(siteSettingsQuery)
  return (
    <html>
      <body>
        <Header siteSettings={siteSettings} />
        {children}
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}
```

---

### 3. Sanity Content Population
**Status:** ⚠️ Unknown  
**Time:** 1-2 hours

- [ ] Access Sanity Studio (`/studio`)
- [ ] Create `siteSettings` document with:
  - Navigation items
  - Contact information (phone, email, address)
  - Header message
  - Business hours
  - Social media links
- [ ] Test content updates reflect on site
- [ ] Verify all fields are populated correctly

---

### 4. Ecwid E-commerce Integration
**Status:** ⚠️ Partially Implemented  
**Time:** 4-6 hours  
**Priority:** HIGH

**Tasks:**
- [ ] Replace mock products in `app/shop/page.tsx`:
  - Use `getProducts()` from `lib/ecwid.ts`
  - Implement server-side fetching
  - Add loading states
  - Add error handling
- [ ] Update `app/shop/product/[id]/page.tsx`:
  - Fetch product from Ecwid API
  - Display product details
  - Integrate Ecwid cart/checkout
- [ ] Test product browsing, filtering, search
- [ ] Verify cart functionality
- [ ] Test checkout flow
- [ ] Add fallback UI for API failures

**Files to Modify:**
- `app/shop/page.tsx` - Replace `mockProducts` with Ecwid API
- `app/shop/product/[id]/page.tsx` - Integrate Ecwid product details
- `components/ecwid/ProductBrowser.tsx` - Verify implementation

---

## 🟡 IMPORTANT - Should Complete Before Launch

### 5. Error Handling & Fallbacks
**Status:** ❌ Not Implemented  
**Time:** 2-3 hours

- [ ] Add error boundaries for Sanity fetch failures
- [ ] Add fallback UI when Ecwid products fail to load
- [ ] Handle missing environment variables gracefully
- [ ] Add loading states for async data
- [ ] Test error scenarios

---

### 6. Performance Optimization
**Status:** ⚠️ Partially Configured  
**Time:** 2-3 hours

- [ ] Add ISR revalidation for Sanity content (1 hour)
- [ ] Add ISR revalidation for Ecwid products (5 minutes)
- [ ] Verify image optimization is working
- [ ] Test Core Web Vitals (LCP, FID, CLS)
- [ ] Add `loading.tsx` files for better UX

**Example ISR Configuration:**
```typescript
// In page components
export const revalidate = 3600 // 1 hour for Sanity
export const revalidate = 300   // 5 minutes for Ecwid
```

---

### 7. SEO Enhancements
**Status:** ⚠️ Basic SEO implemented  
**Time:** 2-3 hours

- [ ] Generate `sitemap.xml` (Next.js 13+ app router)
- [ ] Add `robots.txt` in `public/` folder
- [ ] Add structured data (JSON-LD) for business info
- [ ] Test with Google Search Console
- [ ] Verify Open Graph images

---

## 🟢 NICE TO HAVE - Can Add Post-Launch

### 8. Analytics Setup
**Status:** ❌ Not Implemented  
**Time:** 1 hour

- [ ] Google Analytics 4
- [ ] Vercel Analytics (if using Vercel)
- [ ] Conversion tracking

---

### 9. Error Monitoring
**Status:** ❌ Not Implemented  
**Time:** 1-2 hours

- [ ] Sentry integration
- [ ] Error tracking setup
- [ ] Alert configuration

---

## 📋 Pre-Launch Testing Checklist

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works (from Sanity)
- [ ] Product browsing works (from Ecwid)
- [ ] Search functionality works
- [ ] Cart/checkout flow works
- [ ] Contact form works (if implemented)
- [ ] Mobile responsive
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Performance
- [ ] Page load times < 3 seconds
- [ ] Core Web Vitals pass
- [ ] Images optimized
- [ ] No console errors

### Content
- [ ] All copy reviewed
- [ ] Contact information verified
- [ ] Business hours accurate
- [ ] Social media links working
- [ ] Images optimized and properly sized

### Configuration
- [ ] Production build successful (`npm run build`)
- [ ] Environment variables set
- [ ] Domain configured
- [ ] SSL certificate active

---

## 🎯 Launch Sequence

### Phase 1: Foundation (Day 1)
1. ✅ Set up environment variables
2. ✅ Implement server-side Sanity integration
3. ✅ Populate Sanity content
4. ✅ Test Sanity integration

### Phase 2: E-commerce (Day 2)
1. ✅ Integrate Ecwid products
2. ✅ Test product browsing
3. ✅ Verify cart/checkout

### Phase 3: Polish (Day 3)
1. ✅ Add error handling
2. ✅ Performance optimization
3. ✅ SEO enhancements
4. ✅ Comprehensive testing

### Phase 4: Launch (Day 4)
1. ✅ Final review
2. ✅ Production deployment
3. ✅ Post-launch monitoring

---

## 📊 Estimated Time to Launch

**Minimum Viable Launch:** 8-12 hours
- Critical fixes: 6-8 hours
- Testing & polish: 2-4 hours

**Full Launch (with all features):** 16-20 hours
- Includes analytics, monitoring, SEO enhancements

---

## 🚨 Current Blockers

1. **Environment Variables** - Must be configured first
2. **Sanity Content** - Need at least one `siteSettings` document
3. **Ecwid Store** - Must have products in store

---

## 💡 Quick Reference

### Architecture Notes

**Current (Development):**
```typescript
// Using mock data
const navigation = mockNavigation
const contactInfo = mockSiteData
```

**Target (Production):**
```typescript
// Server-side Sanity fetch
const siteSettings = await sanityFetch(siteSettingsQuery)
// Pass as props to components
```

### Benefits of Server-Side Approach
- ✅ No navigation flash on page load
- ✅ Better SEO (pre-rendered navigation)
- ✅ Faster perceived performance
- ✅ Content manageable via Sanity CMS
- ✅ Consistent user experience

---

## 📞 Next Steps

1. ✅ Review `LAUNCH-READINESS-ASSESSMENT.md` for full details
2. ⏭️ Set up environment variables
3. ⏭️ Begin server-side Sanity integration
4. ⏭️ Test incrementally as you go

---

*Last updated: $(date)*  
*See `LAUNCH-READINESS-ASSESSMENT.md` for comprehensive analysis*