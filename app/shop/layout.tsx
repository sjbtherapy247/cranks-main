import type { Metadata } from 'next'

// Ecwid store ID - used for preloading
const ECWID_STORE_ID = '129297501'

export const metadata: Metadata = {
  title: 'Shop - Premium Bikes & Cycling Gear | Cranks Bike Shop Chatswood',
  description: 'Shop premium bikes, road bikes, mountain bikes, e-bikes, and cycling accessories at Cranks Bike Shop in Chatswood. Expert advice and quality products.',
  keywords: ['bike shop Chatswood', 'buy bikes online', 'mountain bikes', 'road bikes', 'e-bikes', 'cycling accessories', 'bike parts', 'bike shop Sydney'],
  openGraph: {
    title: 'Shop - Premium Bikes & Cycling Gear | Cranks Bike Shop',
    description: 'Shop premium bikes, road bikes, mountain bikes, e-bikes, and cycling accessories at Cranks Bike Shop.',
    url: 'https://cranks-bike-shop.vercel.app/shop',
    type: 'website',
  },
  alternates: {
    canonical: '/shop',
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Preconnect to Ecwid domains for faster loading */}
      <link rel="preconnect" href="https://app.ecwid.com" />
      <link rel="preconnect" href="https://images.ecwid.com" />
      <link rel="preconnect" href="https://d3fi9i0jj23cau.cloudfront.net" />
      <link rel="dns-prefetch" href="https://app.ecwid.com" />
      
      {/* Preload the main Ecwid script */}
      <link 
        rel="preload" 
        href={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`}
        as="script"
      />
      
      {children}
    </>
  )
}
