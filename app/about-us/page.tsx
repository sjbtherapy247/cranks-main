import Image from "next/image"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/seo/StructuredData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  Users,
  Wrench
} from "lucide-react"

export const metadata = {
  title: "About Us - Cranks Bikes Chatswood | 30+ Years Experience",
  description: "Learn about Cranks Bikes, your trusted independent bike shop in Chatswood. Serving Sydney's North Shore for over 30 years with expert advice and quality service.",
  keywords: ['bike shop Chatswood', 'bicycle store Sydney', 'local bike shop', 'independent bike shop', 'Cranks Bikes', 'North Shore bike shop'],
  openGraph: {
    title: "About Us - Cranks Bikes Chatswood | 30+ Years Experience",
    description: "Learn about Cranks Bikes, your trusted independent bike shop in Chatswood. Serving Sydney's North Shore for over 30 years.",
    url: "https://cranks-bike-shop.vercel.app/about-us",
    type: "website",
  },
  alternates: {
    canonical: "/about-us",
  },
}

export default function AboutUsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Cranks Bike Shop",
      "description": "Your trusted local bike shop in Chatswood for premium bikes, expert service, and cycling gear. Serving North Shore Sydney for over 30 years.",
      "foundingDate": "1990",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "352A Penshurst Street",
        "addressLocality": "Chatswood",
        "addressRegion": "NSW",
        "postalCode": "2067",
        "addressCountry": "AU"
      },
      "telephone": "+61294173776",
      "email": "sales@cranks.com.au"
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[140px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Over 30 Years Experience
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Cranks Bikes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your local independent bike, e-bike and scooter shop in Chatswood, serving Sydney's North Shore for over three decades
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Our Story */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  Cranks is your local <strong>independent</strong> bike and scooter shop located in <strong>Chatswood</strong> on Sydney's North Shore.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  We provide you with <strong>friendly sales, service</strong> and <strong>advice</strong> about all things to do with bikes, ebikes and scooters.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  We offer a <strong>free service within the first 3 months</strong> of your new bike or scooter purchase.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our stock sells out really fast, so please call us to check availability. If it's not in the shop, it will probably be just a few days away.
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Hit that call button and we'll help you on your cycling journey!</strong>
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-pink-500" />
                    <h3 className="text-xl font-bold">30+ Years Experience</h3>
                  </div>
                  <p className="text-gray-600">
                    Serving Chatswood and North Shore area of Sydney for over 30 years. 
                    Our experience means expert advice you can trust.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-8 w-8 text-pink-500" />
                    <h3 className="text-xl font-bold">Independent & Local</h3>
                  </div>
                  <p className="text-gray-600">
                    As an independent local business, we provide personalized service 
                    and support our community with passion and care.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wrench className="h-8 w-8 text-pink-500" />
                    <h3 className="text-xl font-bold">Free 3-Month Service</h3>
                  </div>
                  <p className="text-gray-600">
                    Every new bike or scooter purchase includes a complimentary service 
                    within the first 3 months. Your satisfaction is guaranteed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-8 w-8 text-pink-500" />
                    <h3 className="text-xl font-bold">Expert Advice</h3>
                  </div>
                  <p className="text-gray-600">
                    Our knowledgeable team provides friendly advice on bikes, ebikes, 
                    scooters, and all your cycling needs.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Shop</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Location & Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-pink-500 mt-1" />
                      <div>
                        <p className="font-medium">352A Penshurst Street</p>
                        <p className="text-gray-600">Chatswood, NSW 2067</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-pink-500" />
                      <div>
                        <p className="font-medium">+61 2 9417 3776</p>
                        <p className="text-sm text-gray-600">Call us for expert advice</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-pink-500" />
                      <div>
                        <p className="font-medium">sales@cranks.com.au</p>
                        <p className="text-sm text-gray-600">Get back to you ASAP</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9am - 5pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">9am - 4pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">9am - 3pm</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Open 7 days a week!
                    </p>
                    <p className="text-xs text-gray-500">
                      Please see our Google page for bank holiday opening hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: 02 9417 3776
                </Button>
              </div>
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