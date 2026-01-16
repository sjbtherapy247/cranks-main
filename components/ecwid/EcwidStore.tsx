"use client"

import { useEffect, useState, useRef } from "react"

interface EcwidStoreProps {
  storeId?: string
}

declare global {
  interface Window {
    xProductBrowser?: (...args: string[]) => void
    Ecwid?: unknown
    ec?: unknown
    ecwid_script_defer?: boolean
    ecwid_dynamic_widgets?: boolean
  }
}

export function EcwidStore({ storeId = "129297501" }: EcwidStoreProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    // Prevent double initialization (React Strict Mode)
    if (initializedRef.current) return
    
    const containerId = "my-store-" + storeId

    const initProductBrowser = () => {
      // Make sure container exists in DOM
      const container = document.getElementById(containerId)
      if (!container) {
        console.error("Ecwid container not found:", containerId)
        return false
      }

      if (typeof window.xProductBrowser === "function") {
        try {
          initializedRef.current = true
          // Call with exact same format as Ecwid's embed code
          window.xProductBrowser(
            "categoriesPerRow=3",
            "views=grid(20,3) list(60) table(60)",
            "categoryView=grid",
            "searchView=list",
            "id=" + containerId
          )
          setIsLoading(false)
          return true
        } catch (err) {
          console.error("Ecwid init error:", err)
          initializedRef.current = false
          return false
        }
      }
      return false
    }

    // Set Ecwid config flags
    window.ecwid_script_defer = true
    window.ecwid_dynamic_widgets = true

    // Check if already loaded
    if (typeof window.xProductBrowser === "function") {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        initProductBrowser()
      })
      return
    }

    // Check if script exists
    if (document.getElementById("ecwid-script")) {
      // Poll until ready
      const poll = setInterval(() => {
        if (typeof window.xProductBrowser === "function") {
          clearInterval(poll)
          initProductBrowser()
        }
      }, 100)
      setTimeout(() => clearInterval(poll), 15000)
      return
    }

    // Create script
    const script = document.createElement("script")
    script.id = "ecwid-script"
    script.src = "https://app.ecwid.com/script.js?" + storeId + "&data_platform=code"
    script.async = true
    script.charset = "utf-8"

    script.onload = () => {
      // Wait for xProductBrowser to be defined
      const poll = setInterval(() => {
        if (typeof window.xProductBrowser === "function") {
          clearInterval(poll)
          // Extra delay to let Ecwid fully initialize
          setTimeout(initProductBrowser, 100)
        }
      }, 50)
      setTimeout(() => {
        clearInterval(poll)
        if (!initializedRef.current) {
          setError("Store failed to load")
          setIsLoading(false)
        }
      }, 10000)
    }

    script.onerror = () => {
      setError("Failed to load store script")
      setIsLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      // Don't cleanup - Ecwid manages its own state
    }
  }, [storeId])

  return (
    <div className="min-h-[500px] relative">
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
      
      {/* Ecwid container */}
      <div 
        ref={containerRef}
        id={"my-store-" + storeId} 
        className="min-h-[500px]"
      />
    </div>
  )
}
