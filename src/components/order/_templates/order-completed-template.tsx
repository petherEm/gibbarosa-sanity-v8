import { HttpTypes } from "@medusajs/types";
import { Heading } from "@medusajs/ui";
import { Box } from "@/components/shared/box";
import CartTotals from "@/components/shared/cart-totals";
import { Container } from "@/components/shared/container";
import { Text } from "@/components/shared/text";
import Items from "@/components/order/items";
import OrderDetails from "@/components/order/order-details";
import PaymentDetails from "@/components/order/payment-details";
import ShippingDetails from "@/components/order/shipping-details";

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder & { status: string };
};

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  return (
    <Box className="bg-secondary">
      <Container className="mx-auto py-8">
        <Box
          className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4"
          data-testid="order-complete-container"
        >
          <Box className="flex flex-col items-center gap-2 py-6 text-center">
            <Heading
              level="h1"
              className="text-xl font-normal text-basic-primary small:max-w-md medium:text-2xl"
            >
              Thank you! Your order was placed successfully.
            </Heading>
            <Text size="md" className="text-secondary">
              We have sent the order confirmation details to {order.email}.
            </Text>
          </Box>
          <OrderDetails order={order} />
          <Items items={order.items} />
          <div className="rounded-lg bg-primary p-4">
            <CartTotals totals={order} />
          </div>
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
        </Box>
      </Container>
    </Box>
  );
}
