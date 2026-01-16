"use client"

import { useEffect } from "react"
import Script from "next/script"

interface EcwidStoreProps {
  storeId?: string
}

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void
    Ecwid: {
      OnAPILoaded: {
        add: (callback: () => void) => void
      }
      OnPageLoaded: {
        add: (callback: (page: { type: string }) => void) => void
      }
    }
  }
}

export function EcwidStore({ storeId = "129297501" }: EcwidStoreProps) {
  useEffect(() => {
    // Initialize the product browser after script loads
    if (typeof window !== "undefined" && window.xProductBrowser) {
      window.xProductBrowser(
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        `id=my-store-${storeId}`
      )
    }
  }, [storeId])

  return (
    <>
      {/* Ecwid Store Container */}
      <div id={`my-store-${storeId}`} className="min-h-[600px]"></div>
      
      {/* Ecwid Script */}
      <Script
        src={`https://app.business.shop/script.js?${storeId}&data_platform=code&data_date=2026-01-16`}
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.xProductBrowser) {
            window.xProductBrowser(
              "categoriesPerRow=3",
              "views=grid(20,3) list(60) table(60)",
              "categoryView=grid",
              "searchView=list",
              `id=my-store-${storeId}`
            )
          }
        }}
      />
    </>
  )
}
