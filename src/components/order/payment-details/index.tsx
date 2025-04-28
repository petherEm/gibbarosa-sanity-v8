import { HttpTypes } from "@medusajs/types";
import { Text } from "@medusajs/ui";
import { Box } from "@/components/shared/box";
import { StripeIcon } from "@/components/shared/icons";

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  // const payment = order.payment_collections?.[0].payments?.[0];

  return (
    <Box className="bg-primary p-2">
      <Box className="p-4">
        <Text size="large">Delivery method</Text>
        <Text size="base" className="text-secondary">
          {order.shipping_methods?.[0]?.name ?? "No shipping method"}
        </Text>
      </Box>

      <Box className="p-4">
        <Text size="large">Payment method</Text>
        <Text size="base" className="text-secondary">
          {/* {payment.provider_id} */}
          <StripeIcon />
        </Text>
      </Box>
    </Box>
  );
};

export default PaymentDetails;
