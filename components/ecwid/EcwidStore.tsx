"use client"

import { useEffect, useRef } from "react"

interface EcwidStoreProps {
  storeId?: string
}

export function EcwidStore({ storeId = "129297501" }: EcwidStoreProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    // Create the HTML content for the iframe
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
  <div id="my-store-${storeId}"></div>
  <script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?${storeId}&data_platform=code" charset="utf-8"><\/script>
  <script type="text/javascript">
    xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-${storeId}");
  <\/script>
</body>
</html>`

    // Write to iframe
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (doc) {
      doc.open()
      doc.write(html)
      doc.close()
    }
  }, [storeId])

  // Handle clicks on links in main page - clear hash before navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      
      if (link && link.href && !link.href.includes("#!")) {
        const url = new URL(link.href, window.location.origin)
        if (url.pathname !== "/shop" && window.location.hash.includes("#!")) {
          history.replaceState(null, "", window.location.pathname)
        }
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      title="Cranks Bike Shop Store"
      className="w-full min-h-[800px] border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  )
}
