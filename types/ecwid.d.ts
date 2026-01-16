declare module '@ecwid/nextjs-ecwid-plugin' {
  import { ComponentType } from 'react'

  export interface BuyNowButtonProps {
    storeId: string
    productId: string
    [key: string]: unknown
  }

  export interface ProductBrowserProps {
    storeId: string
    [key: string]: unknown
  }

  export const BuyNowButton: ComponentType<BuyNowButtonProps>
  export const ProductBrowser: ComponentType<ProductBrowserProps>
}

declare module '@ecwid/sdk' {
  export interface EcwidConfig {
    storeId: string
    publicToken?: string
    secretToken?: string
  }

  export interface EcwidClient {
    getProducts: (options?: object) => Promise<unknown>
    getProduct: (id: string) => Promise<unknown>
    getCategories: (options?: object) => Promise<unknown>
    [key: string]: unknown
  }

  export function createClient(config: EcwidConfig): EcwidClient
}
