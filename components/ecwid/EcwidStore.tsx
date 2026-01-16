"use client"

import { useEffect, useState, useCallback } from "react"

interface EcwidStoreProps {
  storeId?: string
}

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void
    Ecwid: unknown
    ec: unknown
    ecwid_script_defer: boolean
    ecwid_dynamic_widgets: boolean
  }
}

export function EcwidStore({ storeId = "129297501" }: EcwidStoreProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const initProductBrowser = useCallback(() => {
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
        return true
      } catch (err) {
        console.error("Ecwid init error:", err)
        return false
      }
    }
    return false
  }, [storeId])

  useEffect(() => {
    // Set Ecwid config flags
    window.ecwid_script_defer = true
    window.ecwid_dynamic_widgets = true

    // Check if script already loaded and ready
    if (window.xProductBrowser) {
      initProductBrowser()
      return
    }

    // Check if script tag exists but still loading
    const existingScript = document.getElementById("ecwid-script")
    if (existingScript) {
      // Poll for xProductBrowser to be available
      const checkReady = setInterval(() => {
        if (window.xProductBrowser) {
          clearInterval(checkReady)
          initProductBrowser()
        }
      }, 50)
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkReady)
        if (!window.xProductBrowser) {
          setError("Store took too long to load")
          setIsLoading(false)
        }
      }, 10000)
      return
    }

    // Inject script - use high priority
    const script = document.createElement("script")
    script.id = "ecwid-script"
    script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code`
    script.async = true
    script.charset = "utf-8"
    // @ts-expect-error - fetchpriority is valid but not in types
    script.fetchpriority = "high"

    script.onload = () => {
      // Poll for xProductBrowser (faster than fixed delay)
      const checkReady = setInterval(() => {
        if (window.xProductBrowser) {
          clearInterval(checkReady)
          initProductBrowser()
        }
      }, 20) // Check every 20ms
      
      // Fallback timeout
      setTimeout(() => {
        clearInterval(checkReady)
        if (!window.xProductBrowser) {
          setError("Store failed to initialize")
          setIsLoading(false)
        }
      }, 5000)
    }

    script.onerror = () => {
      setError("Failed to load store")
      setIsLoading(false)
    }

    // Insert at top of body for priority
    document.body.insertBefore(script, document.body.firstChild)
  }, [storeId, initProductBrowser])

  return (
    <div className="min-h-[500px] relative">
      {/* Loading overlay - positioned absolute so it doesn't shift layout */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm">Loading products...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Ecwid container - always rendered so script can find it */}
      <div id={`my-store-${storeId}`} className="min-h-[500px]"></div>
    </div>
  )
}
