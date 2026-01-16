"use client"

import { useEffect, useState } from "react"

interface EcwidStoreProps {
  storeId?: string
}

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void
    Ecwid: unknown
    ec: unknown
  }
}

export function EcwidStore({ storeId = "129297501" }: EcwidStoreProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if script already loaded
    if (document.getElementById("ecwid-script")) {
      // Script exists, try to reinitialize
      if (window.xProductBrowser) {
        try {
          window.xProductBrowser(
            "categoriesPerRow=3",
            "views=grid(20,3) list(60) table(60)",
            "categoryView=grid",
            "searchView=list",
            "id=my-store-" + storeId
          )
          setIsLoading(false)
        } catch (err) {
          console.error("Ecwid reinit error:", err)
        }
      }
      return
    }

    // Create and inject script manually (more control than next/script)
    const script = document.createElement("script")
    script.id = "ecwid-script"
    script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code`
    script.async = true
    script.charset = "utf-8"

    script.onload = () => {
      // Wait a bit for Ecwid to fully initialize
      setTimeout(() => {
        if (window.xProductBrowser) {
          try {
            window.xProductBrowser(
              "categoriesPerRow=3",
              "views=grid(20,3) list(60) table(60)",
              "categoryView=grid",
              "searchView=list",
              "id=my-store-" + storeId
            )
            setIsLoading(false)
          } catch (err) {
            console.error("Ecwid init error:", err)
            setError("Failed to initialize store")
          }
        } else {
          setError("Store script failed to load properly")
        }
      }, 500)
    }

    script.onerror = () => {
      setError("Failed to load store")
      setIsLoading(false)
    }

    document.body.appendChild(script)

    // Cleanup
    return () => {
      // Don't remove script on unmount to avoid reload issues
    }
  }, [storeId])

  return (
    <div className="min-h-[600px]">
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading store...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Ecwid will inject content here */}
      <div id={`my-store-${storeId}`}></div>
    </div>
  )
}
