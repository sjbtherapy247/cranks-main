import Image from "next/image"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/seo/StructuredData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
  Send
} from "lucide-react"

export const metadata = {
  title: "Contact Us - Cranks Bikes Chatswood | Get Expert Bike Advice",
  description: "Contact Cranks Bikes in Chatswood. Call 02 9417 3776 for expert bike advice. Open 7 days. 352A Penshurst Street, Chatswood NSW 2067.",
  keywords: ['Cranks Bikes contact', 'bike shop Chatswood phone', 'bike shop Chatswood address', 'bike shop Chatswood hours', 'bike shop Sydney contact'],
  openGraph: {
    title: "Contact Us - Cranks Bikes Chatswood | Get Expert Bike Advice",
    description: "Contact Cranks Bikes in Chatswood. Call 02 9417 3776 for expert bike advice. Open 7 days.",
    url: "https://cranks-bike-shop.vercel.app/contact",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Cranks Bike Shop",
      "telephone": "+61294173776",
      "email": "sales@cranks.com.au",
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
      ]
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[180px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Cranks Bikes
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Get in touch with your local Chatswood bike experts. We're here to help with all your cycling needs!
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-pink-500 hover:bg-gray-100">
              <Phone className="h-4 w-4 mr-2" />
              Call Now: 02 9417 3776
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Quick Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak directly with our bike experts</p>
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    02 9417 3776
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">We'll get back to you ASAP</p>
                  <Button variant="outline">
                    sales@cranks.com.au
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Visit Our Shop</h3>
                  <p className="text-gray-600 mb-4">Come and see us in Chatswood</p>
                  <Button variant="outline">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-pink-500" />
                      Drop us a quick email
                    </CardTitle>
                    <p className="text-gray-600">We'll get back to you as soon as possible</p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Enter your full name"
                          required 
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email *
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your.email@example.com"
                          required 
                        />
                      </div>

                      <div>
                        <label htmlFor="wishlist" className="block text-sm font-medium text-gray-700 mb-2">
                          Wishlist Link
                        </label>
                        <Input 
                          id="wishlist" 
                          type="url" 
                          placeholder="Link to your product wishlist (optional)"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message *
                        </label>
                        <Textarea 
                          id="message" 
                          rows={5}
                          placeholder="Tell us how we can help you with your bike needs..."
                          required 
                        />
                      </div>

                      <Button size="lg" className="w-full bg-pink-500 hover:bg-pink-600">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Store Information */}
              <div className="space-y-6">
                
                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      Store Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-lg">Cranks Bikes</p>
                        <p className="text-gray-600">352A Penshurst Street</p>
                        <p className="text-gray-600">Chatswood, NSW 2067</p>
                        <Badge variant="secondary" className="mt-2">
                          Serving North Shore Sydney for 30+ years
                        </Badge>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="font-medium mb-2">Quick Contact:</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">+61 2 9417 3776</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>sales@cranks.com.au</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Opening Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-pink-500" />
                      Opening Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Monday - Friday</span>
                        <span className="font-semibold">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Saturday</span>
                        <span className="font-semibold">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sunday</span>
                        <span className="font-semibold">9:00 AM - 3:00 PM</span>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          🟢 Open 7 Days a Week!
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">
                          Please see our Google page for bank holiday opening hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Contact Us */}
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Cranks?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">
                          <strong>30+ years experience</strong> serving Chatswood and North Shore
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">
                          <strong>Free 3-month service</strong> with every new bike purchase
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">
                          <strong>Independent local business</strong> with personalized service
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">
                          <strong>Expert advice</strong> on bikes, ebikes, and scooters
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Cycling Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hit that call button and we'll help you find the perfect bike or get your current one running like new!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                <Phone className="h-4 w-4 mr-2" />
                Call Now: 02 9417 3776
              </Button>
              <Button size="lg" variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
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