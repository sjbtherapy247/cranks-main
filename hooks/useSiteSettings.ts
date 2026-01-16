"use client"

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'

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

export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // For now, use fallback data only to avoid Sanity fetch issues
    setIsLoading(true)
    setSiteSettings({
      title: 'Cranks Bike Shop',
      contactInfo: {
        phone: '02 9417 3776',
        email: 'sales@cranks.com.au',
      },
      headerMessage: 'Free service within first 3 months',
      navigation: [
        { title: 'Shop', href: '/shop', hasDropdown: false },
        { title: 'Services', href: '/our-services', hasDropdown: false },
        { title: 'About', href: '/about-us', hasDropdown: false },
        { title: 'Contact', href: '/contact', hasDropdown: false },
      ],
    })
    setIsLoading(false)
  }, [])

  return {
    siteSettings,
    isLoading,
    error,
  }
}