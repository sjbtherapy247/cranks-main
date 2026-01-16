# Cranks Bike Shop Migration Plan
**From:** WordPress/WooCommerce (8-year-old unsupported theme)  
**To:** Next.js + Ecwid + Sanity CMS  
**Timeline:** Phased approach with room to scale

## Overview
- **Current State:** WordPress/WooCommerce catalog site (no sales)
- **Target State:** Modern Next.js site with ecommerce, click & collect, vouchers
- **Integration:** Lightspeed POS ↔ Ecwid ↔ Next.js Frontend + Sanity CMS
- **Data:** ~4000 products to migrate

## Architecture Decision
```
Lightspeed POS ↔ Ecwid eCommerce ↔ Next.js Frontend
                      ↕                  ↕
              Product Sync          Sanity CMS
                                   (Content Management)
```

## Phase 1: Foundation Setup ✅
- [x] Next.js frontend (already built)
- [ ] Sanity CMS setup
- [ ] Ecwid store setup
- [ ] Development environment

## Phase 2: Content Management
- [ ] Sanity schema design
- [ ] Content migration from WordPress
- [ ] Frontend integration with Sanity

## Phase 3: Product Migration
- [ ] WooCommerce product export
- [ ] Data cleaning & formatting
- [ ] Ecwid import & configuration
- [ ] Lightspeed POS connection

## Phase 4: Ecommerce Features
- [ ] Cart & checkout integration
- [ ] Click & collect setup
- [ ] Simple voucher/gift cards
- [ ] ANZ bank payment integration

## Phase 5: Enhancement (Future)
- [ ] Advanced voucher management (Supabase)
- [ ] Custom admin panel (if needed)
- [ ] Advanced click & collect workflow
- [ ] Analytics & reporting

## Key Requirements
- **Products Only:** No order/customer history migration
- **Real-time Sync:** Lightspeed POS → Ecwid (automatic)
- **Payment:** ANZ bank integration via Ecwid
- **Content Management:** Client needs to manage product descriptions + site content
- **Click & Collect:** 1-2 orders/day expected
- **Vouchers:** Simple gift cards to start

## Image Storage Strategy
1. **Product Images:** Ecwid hosting (simplest, syncs with Lightspeed)
2. **Content Images:** Sanity CDN (hero images, about us, etc.)
3. **Optimization:** Next.js Image component with proper sizing

## Success Criteria
- [ ] All 4000 products migrated successfully
- [ ] Real-time inventory sync working
- [ ] Client can manage content independently
- [ ] Click & collect workflow functional
- [ ] Site performance optimized
- [ ] Mobile-friendly experience