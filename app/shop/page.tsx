"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { StructuredData } from "@/components/seo/StructuredData"
import { EcwidStore } from "@/components/ecwid/EcwidStore"

export default function ShopPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Cranks Bike Shop",
    "description": "Premium bikes, parts, and accessories. Mountain bikes, road bikes, e-bikes, and cycling gear.",
    "url": "https://v0-cranks.vercel.app/shop",
    "telephone": "+61294173776",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "352A Penshurst Street",
      "addressLocality": "Chatswood",
      "addressRegion": "NSW",
      "postalCode": "2067",
      "addressCountry": "AU"
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
    "priceRange": "$$"
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[140px]">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Browse our complete range of premium bikes, parts, accessories, and cycling gear. 
                Quality products from trusted brands with expert advice.
              </p>
            </div>
          </section>

          {/* Ecwid Store */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <EcwidStore storeId="129297501" />
            </div>
          </section>

          {/* Store Info */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Free Click & Collect</h3>
                  <p className="text-gray-600">Order online and pick up in-store at your convenience</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Advice</h3>
                  <p className="text-gray-600">Our team is here to help you find the perfect bike</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Price Match Guarantee</h3>
                  <p className="text-gray-600">We'll match any competitor's price on identical items</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
