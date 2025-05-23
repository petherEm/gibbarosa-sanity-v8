import { cache } from 'react'

import { sdk } from '@/lib/config'

// Shipping actions
export const listCartShippingMethods = cache(async function (cartId: string) {
  return sdk.store.fulfillment
    .listCartOptions({ cart_id: cartId }, { next: { tags: ['shipping'] } })
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null
    })
})
