import type { Metadata } from 'next'

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
  return children
}
