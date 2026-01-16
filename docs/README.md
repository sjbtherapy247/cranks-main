# Cranks Bike Shop Migration Documentation

## Project Overview
Complete migration guide for transforming Cranks Bike Shop from an outdated WordPress/WooCommerce site to a modern Next.js + Ecwid + Sanity CMS solution.

## 📋 Documentation Index

### Core Planning Documents
- **[Migration Plan](./migration-plan.md)** - High-level migration strategy and phases
- **[Technical Specifications](./technical-specifications.md)** - Detailed technical architecture
- **[Implementation Checklist](./implementation-checklist.md)** - Step-by-step task list

### Setup & Configuration
- **[Environment Setup](./environment-setup.md)** - Development environment configuration
- **[Content Strategy](./content-strategy.md)** - Information architecture and SEO planning

### Migration Guides
- **[WooCommerce Migration Guide](./woocommerce-migration-guide.md)** - Detailed product migration process

## 🎯 Project Goals
- Migrate ~4000 products from WooCommerce to Ecwid
- Integrate with existing Lightspeed POS system
- Enable ecommerce functionality (cart, checkout, click & collect)
- Implement modern content management with Sanity CMS
- Maintain SEO value and improve site performance

## 🏗️ Architecture Overview
```
Lightspeed POS ↔ Ecwid eCommerce ↔ Next.js Frontend
                      ↕                  ↕
              Product Sync          Sanity CMS
                                   (Content Management)
```

## 🚀 Quick Start
1. Review the [Migration Plan](./migration-plan.md) for project overview
2. Follow [Environment Setup](./environment-setup.md) for development configuration
3. Execute phases according to [Implementation Checklist](./implementation-checklist.md)

## 📊 Current Status
- ✅ Next.js frontend built with Tailwind + shadcn/ui
- ✅ Comprehensive documentation created
- 🔄 Ready to begin Sanity CMS setup
- ⏳ Awaiting Ecwid store configuration
- ⏳ WooCommerce data export pending

## 🔧 Key Technologies
- **Frontend:** Next.js 15.2.4, React 19, Tailwind CSS
- **CMS:** Sanity.io for content management
- **Ecommerce:** Ecwid integrated with Lightspeed POS
- **Deployment:** Vercel
- **Payments:** ANZ Bank via Ecwid

## 📞 Support & Resources
- Ecwid Documentation: https://developers.ecwid.com/
- Sanity Documentation: https://www.sanity.io/docs
- Next.js Documentation: https://nextjs.org/docs

## 🔄 Migration Phases
1. **Foundation Setup** - Sanity CMS and Ecwid configuration
2. **Content Management** - WordPress content migration to Sanity
3. **Product Migration** - WooCommerce to Ecwid transfer
4. **Ecommerce Features** - Cart, checkout, click & collect
5. **Enhancement** - Future improvements (Supabase, advanced features)

---

*Last updated: 2024 - Ready for implementation*