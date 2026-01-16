import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    contactInfo,
    businessHours,
    headerMessage,
    navigation[] {
      title,
      href,
      hasDropdown,
      dropdownItems[] {
        title,
        href
      }
    },
    socialMedia
  }
`

// Store Info (existing)
export const storeInfoQuery = groq`
  *[_type == "storeInfo"][0] {
    name,
    tagline,
    phone,
    email,
    address,
    hours,
    socialMedia
  }
`

// Home Page (existing)
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    heroTitle,
    heroSubtitle,
    heroImage {
      asset->{
        _id,
        url
      },
      alt
    },
    featuredProducts[] {
      name,
      price,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      description
    }
  }
`

// Services (existing)
export const servicesQuery = groq`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    description,
    price,
    duration,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`

// Posts (existing)
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author-> {
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    body,
    author-> {
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`