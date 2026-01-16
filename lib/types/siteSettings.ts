// SiteSettings type definition for Sanity CMS
export interface SiteSettings {
  title?: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
  businessHours?: {
    weekdays?: string
    saturday?: string
    sunday?: string
  }
  headerMessage?: string
  navigation?: Array<{
    title: string
    href: string
    hasDropdown?: boolean
    isSpecial?: boolean
    dropdownItems?: Array<{
      title: string
      href: string
    }>
  }>
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

// Fallback data for when Sanity fetch fails
export const fallbackSiteSettings: SiteSettings = {
  title: 'Cranks Bike Shop',
  contactInfo: {
    phone: '02 9417 3776',
    email: 'sales@cranks.com.au',
    address: '352A Penshurst Street, Chatswood, NSW 2067',
  },
  businessHours: {
    weekdays: 'Mon - Fri: 9am - 5pm',
    saturday: 'Saturday: 9am - 4pm',
    sunday: 'Sunday: 9am - 3pm',
  },
  headerMessage: 'Free service within first 3 months',
  navigation: [
    { title: 'Home', href: '/', hasDropdown: false },
    { title: 'Shop', href: '/shop', hasDropdown: false },
    { title: 'All Bikes', href: '/shop?category=All%20Bikes', hasDropdown: false },
    { title: 'E-Bikes', href: '/shop?category=E-Bikes', hasDropdown: false },
    { title: 'Parts', href: '/shop?category=Parts', hasDropdown: false },
    { title: 'Sale', href: '/shop?category=Sale', hasDropdown: false, isSpecial: true },
    { title: 'Services', href: '/our-services/', hasDropdown: false },
  ],
  socialMedia: {
    facebook: 'https://facebook.com/cranksbikes',
    instagram: 'https://instagram.com/cranksbikes',
    twitter: 'https://twitter.com/cranksbikes',
  },
}
