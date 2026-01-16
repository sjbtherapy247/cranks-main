import { ProductBrowser as EcwidProductBrowser } from '@ecwid/nextjs-ecwid-plugin'

interface ProductBrowserProps {
  storeId: string
  categoryId?: number
  defaultProductId?: number
  className?: string
}

export function ProductBrowser({ 
  storeId, 
  categoryId, 
  defaultProductId,
  className = '' 
}: ProductBrowserProps) {
  return (
    <div className={className}>
      <EcwidProductBrowser
        storeId={storeId}
        categoryId={categoryId}
        defaultProductId={defaultProductId}
      />
    </div>
  )
}