"use client";

import React from "react";

import { HttpTypes } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { ArrowLeftIcon } from "@/components/shared/icons";
import Items from "@/components/order/items";
import OrderDetails from "@/components/order/order-details";
import OrderSummary from "@/components/order/order-summary";
import ShippingDetails from "@/components/order/shipping-details";

import PaymentDetails from "../payment-details";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder & { status: string };
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <Box className="flex flex-col justify-center gap-6 small:gap-8">
      <Button variant="tonal" size="sm" asChild className="w-max">
        <LocalizedClientLink
          href="/account/orders"
          data-testid="back-to-overview-button"
        >
          <ArrowLeftIcon />
          Order history
        </LocalizedClientLink>
      </Button>
      <Heading as="h2" className="text-2xl small:text-3xl">
        Order #{order.display_id}
      </Heading>
      <Box
        className="flex h-full w-full flex-col gap-4"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} />
        <Items items={order.items} />
        <OrderSummary order={order} />
        <ShippingDetails order={order} />
        <PaymentDetails order={order} />
      </Box>
    </Box>
  );
};

export default OrderDetailsTemplate;
