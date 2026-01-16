"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/seo/StructuredData"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Star, ShoppingCart } from "lucide-react"

// Mock product data
const mockProducts = [
  {
    id: "trek-fuel-ex-9.7",
    name: "Trek Fuel EX 9.7",
    category: "Mountain Bikes",
    price: 4999,
    originalPrice: 5499,
    image: "/mountain-bikes.png",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "Full suspension mountain bike with 130mm travel",
    inStock: true,
  },
  {
    id: "specialized-roubaix-sport",
    name: "Specialized Roubaix Sport",
    category: "Road Bikes",
    price: 2799,
    image: "/road-bikes.png",
    rating: 4.6,
    reviews: 89,
    description: "Endurance road bike with Future Shock technology",
    inStock: true,
  },
  {
    id: "giant-trance-x-29",
    name: "Giant Trance X 29",
    category: "Mountain Bikes",
    price: 3299,
    image: "/mountain-bikes.png",
    rating: 4.7,
    reviews: 156,
    description: "Versatile trail bike with Maestro suspension",
    inStock: true,
  },
  {
    id: "cannondale-synapse-carbon",
    name: "Cannondale Synapse Carbon",
    category: "Road Bikes",
    price: 3799,
    image: "/road-bikes.png",
    rating: 4.9,
    reviews: 67,
    badge: "New",
    description: "Lightweight carbon endurance road bike",
    inStock: true,
  },
  {
    id: "trek-powerfly-5",
    name: "Trek Powerfly 5",
    category: "E-Bikes",
    price: 4299,
    image: "/placeholder-jez9w.png",
    rating: 4.5,
    reviews: 43,
    description: "Electric mountain bike with Bosch Performance motor",
    inStock: true,
  },
  {
    id: "specialized-turbo-vado",
    name: "Specialized Turbo Vado 4.0",
    category: "E-Bikes",
    price: 3499,
    image: "/placeholder-jez9w.png",
    rating: 4.7,
    reviews: 78,
    description: "Urban e-bike for commuting and recreation",
    inStock: false,
  },
  {
    id: "shimano-ultegra-groupset",
    name: "Shimano Ultegra Di2 Groupset",
    category: "Accessories",
    price: 2299,
    image: "/assorted-bike-accessories.png",
    rating: 4.9,
    reviews: 234,
    badge: "Pro Choice",
    description: "Electronic shifting groupset for road bikes",
    inStock: true,
  },
  {
    id: "giro-aether-helmet",
    name: "Giro Aether MIPS Helmet",
    category: "Accessories",
    price: 299,
    image: "/assorted-bike-accessories.png",
    rating: 4.8,
    reviews: 167,
    description: "Premium road cycling helmet with MIPS technology",
    inStock: true,
  },
  {
    id: "pearl-izumi-bib-shorts",
    name: "Pearl Izumi Pro Bib Shorts",
    category: "Accessories",
    price: 189,
    image: "/assorted-bike-accessories.png",
    rating: 4.6,
    reviews: 92,
    description: "High-performance cycling bib shorts",
    inStock: true,
  },
]

const categories = ["All", "Mountain Bikes", "Road Bikes", "E-Bikes", "Accessories"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Cranks Bike Shop",
    "description": "Premium bikes, expert service, and cycling gear in Chatswood",
    "url": "https://cranks-bike-shop.vercel.app/shop",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "352A Penshurst Street",
      "addressLocality": "Chatswood",
      "addressRegion": "NSW",
      "postalCode": "2067",
      "addressCountry": "AU"
    },
    "telephone": "+61294173776",
    "priceRange": "$$",
    "department": [
      {
        "@type": "Store",
        "name": "Mountain Bikes"
      },
      {
        "@type": "Store",
        "name": "Road Bikes"
      },
      {
        "@type": "Store",
        "name": "E-Bikes"
      },
      {
        "@type": "Store",
        "name": "Accessories"
      }
    ]
  }

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return a.badge === "New" ? -1 : 1
        default:
          return 0
      }
    })

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[140px]">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Shop Premium Bikes</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our curated collection of mountain bikes, road bikes, e-bikes, and accessories
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4 items-center">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={`/shop/product/${product.id}`}>
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.badge && (
                          <Badge variant={product.badge === "Best Seller" ? "default" : product.badge === "New" ? "destructive" : "secondary"}>
                            {product.badge}
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge variant="destructive">
                            Save ${product.originalPrice - product.price}
                          </Badge>
                        )}
                      </div>

                      {/* Quick Add Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="rounded-full w-10 h-10 p-0">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                          <Link href={`/shop/product/${product.id}`}>
                            <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price and Add to Cart */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          disabled={!product.inStock}
                          className="min-w-0"
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
        <Footer />
      </div>
    </>
  )
}