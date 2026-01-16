// Ecwid configuration and utilities
export const ecwidConfig = {
  storeId: process.env.NEXT_PUBLIC_ECWID_STORE_ID!,
  publicToken: process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN!,
  secretToken: process.env.ECWID_SECRET_TOKEN!,
  apiUrl: 'https://app.ecwid.com/api/v3',
}

// Basic fetch wrapper for Ecwid API
export async function ecwidFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${ecwidConfig.apiUrl}/${ecwidConfig.storeId}/${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${ecwidConfig.secretToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!response.ok) {
    throw new Error(`Ecwid API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Product related functions
export interface EcwidProduct {
  id: number
  name: string
  description: string
  price: number
  compareToPrice?: number
  sku: string
  url: string
  quantity: number
  categoryIds: number[]
  defaultDisplayedPrice: number
  defaultDisplayedPriceFormatted: string
  imageUrl?: string
  galleryImages?: Array<{
    id: string
    url: string
    alt: string
  }>
  options?: Array<{
    name: string
    type: string
    choices: Array<{
      text: string
      priceModifier: number
    }>
  }>
}

export interface EcwidCategory {
  id: number
  name: string
  description?: string
  productCount: number
  url: string
  parentId?: number
}

// Fetch products with optional filtering
export async function getProducts(params: {
  limit?: number
  offset?: number
  category?: number
  keyword?: string
  enabled?: boolean
} = {}): Promise<{
  items: EcwidProduct[]
  total: number
  count: number
  offset: number
  limit: number
}> {
  const searchParams = new URLSearchParams({
    limit: (params.limit || 20).toString(),
    offset: (params.offset || 0).toString(),
    ...(params.category && { category: params.category.toString() }),
    ...(params.keyword && { keyword: params.keyword }),
    ...(params.enabled !== undefined && { enabled: params.enabled.toString() }),
  })

  return ecwidFetch(`products?${searchParams}`)
}

// Fetch single product by ID
export async function getProduct(productId: number): Promise<EcwidProduct> {
  return ecwidFetch(`products/${productId}`)
}

// Fetch categories
export async function getCategories(params: {
  parent?: number
  offset?: number
  limit?: number
} = {}): Promise<{
  items: EcwidCategory[]
  total: number
  count: number
  offset: number
  limit: number
}> {
  const searchParams = new URLSearchParams({
    limit: (params.limit || 100).toString(),
    offset: (params.offset || 0).toString(),
    ...(params.parent && { parent: params.parent.toString() }),
  })

  return ecwidFetch(`categories?${searchParams}`)
}

// Get store profile info
export async function getStoreProfile(): Promise<{
  generalInfo: {
    storeId: number
    storeUrl: string
    starterSite: {
      ecwidSubdomain: string
      generatedUrl: string
    }
  }
  account: {
    accountName: string
    accountNickName: string
    accountEmail: string
  }
  settings: {
    storeName: string
    storeDescription: string
    invoiceLogoUrl: string
    emailLogoUrl: string
  }
  company: {
    companyName: string
    email: string
    street: string
    city: string
    countryCode: string
    postalCode: string
    stateOrProvinceCode: string
    phone: string
  }
}> {
  return ecwidFetch('profile')
}

// Format price with currency
export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}