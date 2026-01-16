# Environment Setup Guide

## Required Accounts & Services

### 1. Sanity
- [ ] Create account at sanity.io
- [ ] Create new project: "cranks-bike-shop"
- [ ] Note project ID and dataset name
- [ ] Generate API tokens

### 2. Ecwid
- [ ] Create account at ecwid.com
- [ ] Choose appropriate plan (based on 4000 products)
- [ ] Note store ID
- [ ] Generate API tokens

### 3. Environment Variables
```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

NEXT_PUBLIC_ECWID_STORE_ID=your_store_id
ECWID_API_TOKEN=your_api_token

# Optional for future
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Installation Commands

```bash
# Sanity dependencies
npm install @sanity/client next-sanity @portabletext/react

# Ecwid dependencies  
npm install @ecwid/api-client

# Additional utilities
npm install date-fns

# Future Supabase (if needed)
npm install @supabase/supabase-js
```

## Sanity Studio Setup

```bash
# Create sanity directory
mkdir sanity
cd sanity

# Initialize Sanity studio
npm create sanity@latest
```

## Development Workflow

1. **Content Management:** Use Sanity Studio for content
2. **Product Management:** Use Ecwid admin for products
3. **Frontend Development:** Next.js with API integrations
4. **Testing:** Local development with production APIs

## Project Structure
```
cranks-bike-shop/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities and configurations
│   ├── sanity.ts          # Sanity client config
│   └── ecwid.ts           # Ecwid API config
├── sanity/                # Sanity studio
│   ├── schemas/           # Content schemas
│   └── sanity.config.ts   # Studio configuration
├── docs/                  # Project documentation
└── public/                # Static assets
```

## Local Development Setup

### 1. Clone and Install
```bash
git clone [repository-url]
cd cranks-bike-shop
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env.local
# Fill in your API keys and project IDs
```

### 3. Run Development Servers
```bash
# Next.js frontend
npm run dev

# Sanity Studio (in separate terminal)
cd sanity
npm run dev
```

### 4. Initial Data Setup
- Create initial content in Sanity Studio
- Configure Ecwid store settings
- Test API connections

## Deployment Configuration

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Sanity Studio Deployment
```bash
cd sanity
npm run build
npm run deploy
```

## Monitoring & Analytics

### Essential Integrations
- [ ] Google Analytics 4
- [ ] Vercel Analytics
- [ ] Ecwid Analytics
- [ ] Search Console

### Performance Monitoring
- [ ] Core Web Vitals tracking
- [ ] API response time monitoring
- [ ] Error logging (Sentry optional)