import { BuyNowButton as EcwidBuyNowButton } from '@ecwid/nextjs-ecwid-plugin'

interface BuyNowButtonProps {
  storeId: string
  productId: number
  text?: string
  showPrice?: boolean
  className?: string
}

export function BuyNowButton({ 
  storeId, 
  productId, 
  text = 'Buy Now',
  showPrice = true,
  className = '' 
}: BuyNowButtonProps) {
  return (
    <div className={className}>
      <EcwidBuyNowButton
        storeId={storeId}
        productId={productId.toString()}
        isShowPrice={showPrice}
        text={text}
      />
    </div>
  )
}