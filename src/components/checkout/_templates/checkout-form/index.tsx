import { listCartShippingMethods } from "@/lib/data/fulfillment";
import { listCartPaymentMethods } from "@/lib/data/payment";
import { HttpTypes } from "@medusajs/types";
import Addresses from "@/components/checkout/addresses";
import Payment from "@/components/checkout/payment";
import Shipping from "@/components/checkout/shipping";
import { Box } from "@/components/shared/box";
import Review from "../../review";

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) {
  if (!cart) {
    return null;
  }

  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "");

  if (!shippingMethods || !paymentMethods) {
    return null;
  }

  return (
    <Box className="grid w-full grid-cols-1 gap-y-4">
      <Addresses cart={cart} customer={customer} />
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      <Review cart={cart} />
    </Box>
  );
}
