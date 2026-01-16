"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { SiteSettings, fallbackSiteSettings } from "@/lib/types/siteSettings"

interface HeaderProps {
  siteSettings?: SiteSettings
}

export function Header({ siteSettings = fallbackSiteSettings }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Use Sanity data with fallback
  const contactInfo = siteSettings.contactInfo || fallbackSiteSettings.contactInfo!
  const navigation = siteSettings.navigation || fallbackSiteSettings.navigation!
  const headerMessage = siteSettings.headerMessage || fallbackSiteSettings.headerMessage!
  const socialMedia = siteSettings.socialMedia || fallbackSiteSettings.socialMedia!

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Always show header at top of page
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300 ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-gray-900 text-white text-xs py-1.5 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              {contactInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <Link href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hidden sm:inline hover:underline">
                    {contactInfo.phone}
                  </Link>
                  <Link href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="sm:hidden hover:underline">
                    {contactInfo.phone.replace(' ', '')}
                  </Link>
                </div>
              )}
              {contactInfo?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  <Link href={`mailto:${contactInfo.email}`} className="hidden md:inline hover:underline">
                    {contactInfo.email}
                  </Link>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              {headerMessage && <span className="text-gray-300">{headerMessage}</span>}
              <div className="flex gap-2">
                {socialMedia?.facebook && (
                  <Link href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                  </Link>
                )}
                {socialMedia?.instagram && (
                  <Link href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                  </Link>
                )}
                {socialMedia?.twitter && (
                  <Link href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Top Bar - Hidden on tablet and mobile */}
      <div className="bg-blue-600 text-white text-sm py-1.5 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/contact" className="hover:text-blue-200 transition-colors">
                Contact Us
              </Link>
              <Link href="/price-match" className="hover:text-blue-200 transition-colors">
                Price Match
              </Link>
              <Link href="/click-collect" className="hover:text-blue-200 transition-colors">
                Click & Collect
              </Link>
              <Link href="/shipping" className="hover:text-blue-200 transition-colors">
                Shipping
              </Link>
              <Link href="/gift-cards" className="hover:text-blue-200 transition-colors">
                Gift Card
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/account" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                <User className="h-4 w-4" />
                <span>My Account</span>
              </Link>
              <span className="text-blue-200">Login or Register</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 sm:py-3">
          {/* Desktop & Tablet Layout (768px+) */}
          <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo - Left aligned */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/cranks-logo.png"
                alt="Cranks Bike Shop - since 1980"
                width={120}
                height={40}
                priority
                className="h-auto w-auto max-h-[40px] lg:max-h-[45px]"
              />
            </Link>

            {/* Search Bar - Desktop only */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 py-2 text-base border-2 border-gray-300 focus:border-pink-500"
                />
                <Button 
                  size="default"
                  className="absolute right-0 top-0 h-full px-5 rounded-l-none bg-pink-500 hover:bg-pink-600"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <Button variant="ghost" size="lg" className="hidden lg:flex relative">
                <Heart className="h-7 w-7" />
              </Button>

              <Button variant="ghost" size="lg" className="relative">
                <ShoppingCart className="h-7 w-7" />
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs">
                  0
                </Badge>
              </Button>

              <Button variant="ghost" size="lg" className="lg:hidden">
                <User className="h-7 w-7" />
              </Button>

              {/* Tablet/Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="lg:hidden"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto p-0">
                  <SheetHeader className="bg-blue-600 text-white p-4 m-0">
                    <SheetTitle className="text-white text-left">Menu</SheetTitle>
                  </SheetHeader>
                  
                  {/* Main Navigation */}
                  <div className="py-0">
                    {navigation.map((item, index) => (
                      <div key={index} className="border-b border-gray-200">
                        <Link 
                          href={item.href} 
                          className={`flex items-center justify-between py-4 px-6 text-base font-normal hover:bg-gray-50 transition-colors ${
                            item.isSpecial ? 'text-red-600 font-semibold' : ''
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{item.title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Section - Customer Login & Wish Lists */}
                  <div className="mt-0 pt-0 border-t-8 border-gray-200">
                    <Link 
                      href="/login" 
                      className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-base">Customer Login</span>
                    </Link>
                    <Link 
                      href="/wishlist" 
                      className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span className="text-base">Wish Lists</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Layout (<768px) - Centered Logo */}
          <div className="md:hidden flex items-center justify-between">
            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto p-0">
                <SheetHeader className="bg-blue-600 text-white p-4 m-0">
                  <SheetTitle className="text-white text-left">Menu</SheetTitle>
                </SheetHeader>
                
                {/* Main Navigation */}
                <div className="py-0">
                  {navigation.map((item, index) => (
                    <div key={index} className="border-b border-gray-200">
                      <Link 
                        href={item.href} 
                        className="flex items-center justify-between py-4 px-6 text-base font-normal hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.title}</span>
                        {item.hasDropdown && <ChevronRight className="h-5 w-5 text-gray-400" />}
                      </Link>
                    </div>
                  ))}
                  
                  {/* Special Links (Red text) */}
                  <div className="border-b border-gray-200">
                    <Link 
                      href="/new-in" 
                      className="flex items-center justify-between py-4 px-6 text-base font-normal text-red-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      New In
                    </Link>
                  </div>
                  <div className="border-b border-gray-200">
                    <Link 
                      href="/sale" 
                      className="flex items-center justify-between py-4 px-6 text-base font-normal text-red-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sale
                    </Link>
                  </div>
                </div>

                {/* Bottom Section - Customer Login & Wish Lists */}
                <div className="mt-0 pt-0 border-t-8 border-gray-200">
                  <Link 
                    href="/login" 
                    className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-base">Customer Login</span>
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                    <span className="text-base">Wish Lists</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Centered Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/cranks-logo.png"
                alt="Cranks Bike Shop - since 1980"
                width={100}
                height={33}
                priority
                className="h-auto w-auto max-h-[40px]"
              />
            </Link>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -top-1 -right-1 bg-pink-500 text-white min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs">
                  0
                </Badge>
              </Button>
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 py-2 border-2 border-gray-300 focus:border-pink-500"
                />
                <Button 
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 rounded-l-none bg-pink-500 hover:bg-pink-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation - Desktop only */}
      <div className="bg-white border-b hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-6 py-2">
            {navigation.map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className={`font-medium transition-colors px-3 py-2 inline-block ${
                  item.isSpecial 
                    ? 'text-red-600 hover:text-red-700 font-bold' 
                    : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
