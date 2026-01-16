import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/seo/StructuredData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wrench,
  ShoppingCart,
  Phone,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Settings,
  Truck,
  MessageCircle,
  Sparkles,
  Zap,
  Cog,
  Bike
} from "lucide-react"

export const metadata = {
  title: "Our Services - Cranks Bikes Chatswood | Expert Bike Repairs & Sales",
  description: "Professional bike services in Chatswood: expert repairs, bike sales, free 3-month service, stock ordering. 30+ years experience. Call 02 9417 3776.",
  keywords: ['bike repair Chatswood', 'bike service Chatswood', 'bike maintenance', 'bike shop services', 'bike repair Sydney', 'bike service North Shore'],
  openGraph: {
    title: "Our Services - Cranks Bikes Chatswood | Expert Bike Repairs & Sales",
    description: "Professional bike services in Chatswood: expert repairs, bike sales, free 3-month service. 30+ years experience.",
    url: "https://cranks-bike-shop.vercel.app/our-services",
    type: "website",
  },
  alternates: {
    canonical: "/our-services",
  },
}

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bike Repair and Maintenance",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cranks Bike Shop",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "352A Penshurst Street",
        "addressLocality": "Chatswood",
        "addressRegion": "NSW",
        "postalCode": "2067",
        "addressCountry": "AU"
      },
      "telephone": "+61294173776"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chatswood, NSW"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bike Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Service",
            "description": "Clean bike, check and adjust brakes, cables, gears, and minor wheel truing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Service",
            "description": "Complete bike service including strip and degrease"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electronic Gear Service",
            "description": "Firmware upgrades and diagnostics for electronic shifting systems"
          }
        }
      ]
    }
  }

  const services = [
    {
      icon: Wrench,
      title: "BASIC SERVICE",
      pricing: "FROM $95 to $145",
      features: [
        "Clean bike (price depends on state of bike)",
        "Check over and adjust/replace brakes, cables (parts extra)",
        "Check and adjust/replace bottom bracket, headset (parts extra)",
        "Advise any major expenses (eg tyres, worn parts)",
        "Lubricate chain, cables, derailleurs",
        "Straighten derailleurs, hangers as necessary",
        "Adjust gears",
        "Minor wheel truing"
      ],
      highlight: false
    },
    {
      icon: Sparkles,
      title: "CLEAN & DEGREASE",
      pricing: "from $220",
      features: [
        "As for Basic service, plus:",
        "Strip and degrease of the following:",
        "Drive train",
        "Derailleurs",
        "Brakes",
        "Full lubrication of all required areas."
      ],
      highlight: false
    },
    {
      icon: Settings,
      title: "FULL SERVICE",
      pricing: "from $280 to $350",
      features: [
        "As for",
        "Basic Service",
        "Clean and degrease",
        "But also including the following:",
        "Complete strip and degrease bottom bracket & head set",
        "Brake fluid change (if required)"
      ],
      highlight: false
    },
    {
      icon: Zap,
      title: "ELECTRONIC GEAR SERVICE",
      pricing: "",
      features: [
        "Upgrade firmware – $35",
        "Diagnose problems (includes upgrading firmware) – $65",
        "Full check and adjust (includes upgrade and diagnose) – $85"
      ],
      highlight: false
    },
    {
      icon: Cog,
      title: "MECHANICAL GEARS",
      pricing: "from $50",
      features: [
        "Check and lubricate cables – replace as necessary",
        "Straighten hanger and derailleurs as necessary",
        "Lubricate derailleurs",
        "Adjust gears"
      ],
      highlight: false
    },
    {
      icon: Bike,
      title: "CHILD BIKE SERVICE",
      pricing: "$50",
      subtitle: "Child bike has no gears",
      features: [
        "Clean bike",
        "Check and adjust brakes, chain",
        "Lubricate chain, cables"
      ],
      highlight: false
    }
  ]

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[170px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CRANKS SERVICES
            </h1>
            <p className="text-lg md:text-xl mb-4 text-white/90">
              Our services range from the following services, to the complete bespoke bike build
            </p>
            <p className="text-base md:text-lg text-white/90">
              Please call us, call in or email us below to discuss your budget, requirements and any special needs you have for your new or existing bike.
            </p>
            <p className="text-base md:text-lg mt-4 text-white/90">
              We're more than happy to help and discuss all your maintenance and new bike, scooter and e-bike options
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-pink-100">
                        <service.icon className="h-8 w-8 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </CardTitle>
                        {service.pricing && (
                          <Badge variant="outline" className="text-sm font-semibold">
                            {service.pricing}
                          </Badge>
                        )}
                        {service.subtitle && (
                          <p className="text-sm text-gray-600 mt-2 italic">{service.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Service Your Bike?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get expert service from Chatswood's most experienced bike shop. Call us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100">
                <Phone className="h-4 w-4 mr-2" />
                Call: 02 9417 3776
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/90">
                <strong>Open 7 Days:</strong> Mon-Fri 9am-5pm • Sat 9am-4pm • Sun 9am-3pm
              </p>
              <p className="text-white/90">
                352A Penshurst Street, Chatswood NSW 2067
              </p>
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