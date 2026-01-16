import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cranks Bike Shop - Premium Bikes, Expert Service & Cycling Gear',
  description: 'Your trusted local bike shop for premium bikes, expert repairs, and cycling gear. Mountain bikes, road bikes, e-bikes, parts, and accessories. Professional service and bike fitting.',
  keywords: ['bike shop', 'bicycle', 'mountain bike', 'road bike', 'e-bike', 'cycling gear', 'bike repair', 'bike service'],
  authors: [{ name: 'Cranks Bike Shop' }],
  creator: 'Cranks Bike Shop',
  publisher: 'Cranks Bike Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cranks-bike-shop.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cranks Bike Shop - Premium Bikes & Expert Service',
    description: 'Your trusted local bike shop for premium bikes, expert repairs, and cycling gear.',
    url: 'https://cranks-bike-shop.vercel.app',
    siteName: 'Cranks Bike Shop',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cranks Bike Shop - Premium Bikes & Expert Service',
    description: 'Your trusted local bike shop for premium bikes, expert repairs, and cycling gear.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
