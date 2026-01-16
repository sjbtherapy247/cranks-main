import { createClient } from '@sanity/client'
import { cache } from 'react'

// Create the Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// Cached function to fetch data from Sanity
export const sanityFetch = cache(async <T>(query: string, params?: any): Promise<T> => {
  try {
    return await client.fetch<T>(query, params, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
})

// Helper to get image URL from Sanity asset
export function urlFor(source: any) {
  if (!source) return ''
  
  return client
    .config()
    .url
    ?.replace(/\/v\d+/, '')
    + '/images/' 
    + source.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')
}

// GROQ queries
export const homePageQuery = `
  *[_type == "homePage"][0]{
    title,
    heroTitle,
    heroSubtitle,
    heroImage,
    aboutPreview,
    featuredServices[]->{
      title,
      description,
      icon,
      price
    }
  }
`

export const servicesQuery = `
  *[_type == "service"] | order(order asc){
    _id,
    title,
    slug,
    description,
    price,
    duration,
    bookingRequired,
    icon
  }
`

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    author,
    categories[]->{
      title,
      slug
    }
  }
`

export const storeInfoQuery = `
  *[_type == "storeInfo"][0]{
    name,
    address,
    phone,
    email,
    hours,
    socialMedia
  }
`