import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/seo/StructuredData"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Shield,
  Wrench,
  MapPin,
} from "lucide-react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cranks Bike Shop - Premium Bikes, Expert Service & Cycling Gear | Chatswood',
  description: 'Your trusted local bike shop in Chatswood for premium bikes, expert repairs, and cycling gear. Mountain bikes, road bikes, e-bikes, parts, and accessories. Serving North Shore Sydney for 30+ years.',
  keywords: ['bike shop Chatswood', 'bicycle store Sydney', 'mountain bike', 'road bike', 'e-bike', 'cycling gear', 'bike repair Chatswood', 'bike service', 'local bike shop', 'North Shore bike shop'],
  openGraph: {
    title: 'Cranks Bike Shop - Premium Bikes & Expert Service | Chatswood',
    description: 'Your trusted local bike shop in Chatswood for premium bikes, expert repairs, and cycling gear. Serving North Shore Sydney for 30+ years.',
    url: 'https://cranks-bike-shop.vercel.app',
    siteName: 'Cranks Bike Shop',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://cranks-bike-shop.vercel.app/cranks-logo.png',
        width: 1200,
        height: 630,
        alt: 'Cranks Bike Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cranks Bike Shop - Premium Bikes & Expert Service',
    description: 'Your trusted local bike shop in Chatswood for premium bikes, expert repairs, and cycling gear.',
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cranks Bike Shop",
    "image": "https://cranks-bike-shop.vercel.app/cranks-logo.png",
    "@id": "https://cranks-bike-shop.vercel.app",
    "url": "https://cranks-bike-shop.vercel.app",
    "telephone": "+61294173776",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "352A Penshurst Street",
      "addressLocality": "Chatswood",
      "addressRegion": "NSW",
      "postalCode": "2067",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.7965,
      "longitude": 151.1804
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/cranksbikes",
      "https://instagram.com/cranksbikes",
      "https://twitter.com/cranksbikes"
    ],
    "description": "Your trusted local bike shop in Chatswood for premium bikes, expert service, and cycling gear. Serving North Shore Sydney for 30+ years.",
    "areaServed": {
      "@type": "City",
      "name": "Chatswood, NSW"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bikes and Cycling Equipment",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Mountain Bikes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Road Bikes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "E-Bikes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bike Repair and Service"
          }
        }
      ]
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        {/* Main content with proper top spacing */}
        <main className="pt-[140px]">

      {/* Hero Slider */}
      <section className="relative">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Slider container - for now showing first image, can be enhanced with carousel logic */}
          <div className="relative w-full h-full">
            <Image src="/hero-slider-1.png" alt="Mountain biking adventure" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Slider navigation dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button className="w-3 h-3 rounded-full bg-white/80 hover:bg-white transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/80 transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/80 transition-colors"></button>
          </div>
        </div>
      </section>

      {/* Ride Your Adventure Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Ride Your
                <span className="text-pink-500 block">Adventure</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover premium bikes, expert service, and everything you need for your cycling journey. From mountain
                trails to city streets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                  Shop Bikes
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent"
                >
                  Book Service
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/mountain-bike-rider-on-trail.png"
                alt="Mountain bike rider"
                width={600}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Click & Collect</h3>
              <p className="text-gray-600">Order online and collect in-store at your convenience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">Professional bike maintenance and repair services</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty</h3>
              <p className="text-gray-600">Comprehensive warranty on all bikes and components</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/shop?category=Mountain%20Bikes">
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/mountain-bikes.png"
                    alt="Mountain Bikes"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-pink-600 transition-colors">Mountain Bikes</h3>
                  <p className="text-gray-600 text-sm">Conquer any trail</p>
                </div>
              </CardContent>
            </Card>
            </Link>

            <Link href="/shop?category=Road%20Bikes">
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/road-bikes.png"
                    alt="Road Bikes"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-pink-600 transition-colors">Road Bikes</h3>
                  <p className="text-gray-600 text-sm">Speed and performance</p>
                </div>
              </CardContent>
            </Card>
            </Link>

            <Link href="/shop?category=E-Bikes">
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder-jez9w.png"
                    alt="E-Bikes"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-pink-600 transition-colors">E-Bikes</h3>
                  <p className="text-gray-600 text-sm">Electric assistance</p>
                </div>
              </CardContent>
            </Card>
            </Link>

            <Link href="/shop?category=Accessories">
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/assorted-bike-accessories.png"
                    alt="Accessories"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-pink-600 transition-colors">Accessories</h3>
                  <p className="text-gray-600 text-sm">Gear up your ride</p>
                </div>
              </CardContent>
            </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src="/classic-red-bicycle.png"
                      alt={`Featured Bike ${i}`}
                      width={300}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 left-2 bg-pink-500">Featured</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Trek Mountain Bike</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(24)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-pink-500">$1,299</span>
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Local Bike Experts</h2>
              <p className="text-gray-600 mb-6">
                For over 15 years, Cranks has been serving the cycling community with premium bikes, expert repairs, and
                personalized service. Whether you're a weekend warrior or daily commuter, we have the perfect bike and
                gear for your needs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Expert bike fitting and consultation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Professional repair and maintenance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Wide selection of premium brands</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Local cycling community support</span>
                </li>
              </ul>
              <Button className="bg-pink-500 hover:bg-pink-600">Learn More About Us</Button>
            </div>
            <div className="relative">
              <Image
                src="/bike-shop-interior.png"
                alt="Cranks bike shop interior"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new arrivals, exclusive deals, and cycling tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="bg-white text-gray-900 border-0" />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">Subscribe</Button>
          </div>
        </div>
      </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
