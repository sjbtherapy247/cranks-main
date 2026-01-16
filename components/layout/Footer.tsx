import Link from "next/link"
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react"
import { SiteSettings, fallbackSiteSettings } from "@/lib/types/siteSettings"

interface FooterProps {
  siteSettings?: SiteSettings
}

export function Footer({ siteSettings = fallbackSiteSettings }: FooterProps) {
  const contactInfo = siteSettings.contactInfo || fallbackSiteSettings.contactInfo!
  const businessHours = siteSettings.businessHours || fallbackSiteSettings.businessHours!
  const socialMedia = siteSettings.socialMedia || fallbackSiteSettings.socialMedia!
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold">Cranks</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm lg:text-base">
              Your trusted local bike shop in Chatswood for premium bikes, expert service, and cycling gear. 
              Serving North Shore Sydney for 30+ years.
            </p>
            <div className="flex gap-4">
              {socialMedia?.facebook && (
                <Link href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                </Link>
              )}
              {socialMedia?.instagram && (
                <Link href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                </Link>
              )}
              {socialMedia?.twitter && (
                <Link href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                </Link>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Shop</h3>
            <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
              <li>
                <Link href="/bikes" className="hover:text-white transition-colors">
                  Bikes
                </Link>
              </li>
              <li>
                <Link href="/parts" className="hover:text-white transition-colors">
                  Parts
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/clothing" className="hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
              <li>
                <Link href="/our-services" className="hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/our-services#repairs" className="hover:text-white transition-colors">
                  Bike Repairs
                </Link>
              </li>
              <li>
                <Link href="/our-services#free-service" className="hover:text-white transition-colors">
                  Free 3-Month Service
                </Link>
              </li>
              <li>
                <Link href="/our-services#consultation" className="hover:text-white transition-colors">
                  Expert Advice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm lg:text-base">
              {contactInfo?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div className="whitespace-pre-line">{contactInfo.address}</div>
                </li>
              )}
              {contactInfo?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <Link 
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </Link>
                </li>
              )}
              {contactInfo?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <Link 
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </Link>
                </li>
              )}
            </ul>

            {/* Quick Links */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Quick Links</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Opening Hours - Mobile optimized */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3 text-lg">Opening Hours</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="space-y-1">
                  {businessHours?.weekdays && (
                    <div className="flex justify-between">
                      <span>Mon - Fri</span>
                      <span className="font-medium text-white">{businessHours.weekdays.replace('Mon-Fri: ', '')}</span>
                    </div>
                  )}
                  {businessHours?.saturday && (
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-white">{businessHours.saturday.replace('Sat: ', '')}</span>
                    </div>
                  )}
                  {businessHours?.sunday && (
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-white">{businessHours.sunday.replace('Sun: ', '')}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Open 7 days a week! See our Google page for bank holiday hours.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg">Why Choose Cranks?</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 30+ years serving North Shore</li>
                <li>• Free 3-month service guarantee</li>
                <li>• Independent local business</li>
                <li>• Expert advice & friendly service</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Cranks Bike Shop. All rights reserved. | 
            <span className="mx-2">ABN: [TO BE ADDED]</span> | 
            <Link href="/privacy" className="hover:text-white transition-colors mx-1">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}