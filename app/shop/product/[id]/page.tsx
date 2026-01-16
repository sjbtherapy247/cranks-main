import { notFound } from "next/navigation"
import ProductDetailClient from "./ProductDetailClient"

// Mock product data (in real app, this would come from API/CMS)
const mockProduct = {
  id: "trek-fuel-ex-9.7",
  name: "Trek Fuel EX 9.7",
  category: "Mountain Bikes",
  brand: "Trek",
  price: 4999,
  originalPrice: 5499,
  images: [
    "/mountain-bikes.png",
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
  ],
  rating: 4.8,
  reviews: 124,
  badge: "Best Seller",
  shortDescription: "Full suspension mountain bike with 130mm travel",
  description: "The Trek Fuel EX 9.7 delivers trail-taming capability in a package that's built to cover serious ground. Whether you're climbing technical singletrack or descending with speed, this bike gives you the confidence to push your limits.",
  inStock: true,
  stockCount: 8,
  sku: "TREK-FEX97-2024",
  specifications: {
    "Frame": "Alpha Platinum Aluminum, Straight Shot down tube, Control Freak internal routing, Knock Block steerer tube, 130mm travel",
    "Fork": "RockShox Pike Select RC, DebonAir spring, Motion Control RC damper, 42mm offset, Boost110, 15mm Maxle Stealth, 140mm travel",
    "Rear Shock": "RockShox Deluxe Select, DebonAir spring, 205x60mm",
    "Drivetrain": "SRAM GX Eagle, 12-speed",
    "Wheels": "Bontrager Line Comp 30, Tubeless Ready",
    "Tires": "Bontrager XR4 Comp, 29x2.40\", Tubeless Ready",
    "Brakes": "SRAM G2 R hydraulic disc, 180/160mm rotors",
    "Weight": "14.5 kg (32 lbs)",
    "Sizes": "S, M, L, XL",
  },
  features: [
    "130mm rear / 140mm front suspension",
    "SRAM GX Eagle 12-speed drivetrain",
    "Tubeless Ready wheels and tires",
    "Internal cable routing",
    "Boost spacing for added stiffness",
    "Lifetime frame warranty",
  ],
  relatedProducts: [
    {
      id: "giant-trance-x-29",
      name: "Giant Trance X 29",
      price: 3299,
      image: "/mountain-bikes.png",
    },
    {
      id: "specialized-stumpjumper",
      name: "Specialized Stumpjumper",
      price: 3799,
      image: "/mountain-bikes.png",
    },
  ],
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  
  // In real app, fetch product data based on id
  // For now, we return the mock product for any id
  const product = mockProduct

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
