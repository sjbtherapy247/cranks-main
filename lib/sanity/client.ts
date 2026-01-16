import { createClient } from 'next-sanity'

// Validate environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  console.warn('⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity features will not work.')
}

if (!dataset) {
  console.warn('⚠️ NEXT_PUBLIC_SANITY_DATASET is not set. Using "production" as default.')
}

// Only create client if we have required env vars, otherwise create a dummy client
export const client = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : createClient({
      projectId: 'dummy',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })

// For server-side fetching with error handling and caching
export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  options: {
    revalidate?: number
    tags?: string[]
  } = {}
): Promise<T> {
  // Check if environment variables are configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn('⚠️ Sanity environment variables not configured. Returning null.')
    return null as T
  }

  try {
    const { revalidate = 3600, tags = [] } = options

    return await client.fetch<T>(query, params, {
      next: {
        revalidate,
        tags,
      },
      perspective: 'published',
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    // Return null instead of throwing to allow fallback data to be used
    return null as T
  }
}