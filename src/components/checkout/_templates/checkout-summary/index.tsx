"use client";

import ItemsPreviewTemplate from "@/components/cart/_templates/preview";
import DiscountCode from "@/components/checkout/discount-code";
import PaymentButton from "@/components/checkout/payment-button";
import { Box } from "@/components/shared/box";
import CartTotals from "@/components/shared/cart-totals";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { Text } from "@/components/shared/text";

const CheckoutSummary = ({
  cart,
  searchParams,
}: {
  cart: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Box className="relative">
      <Box className="sticky top-8 flex flex-col gap-y-4">
        <ItemsPreviewTemplate items={cart?.items} />
        <DiscountCode cart={cart} />
        <Box className="flex flex-col gap-5 bg-primary p-5">
          <CartTotals totals={cart} />
          {searchParams.step === "payment" && (
            <Box className="flex flex-col gap-5">
              <PaymentButton cart={cart} data-testid="submit-order-button" />
              <Box className="flex w-full">
                <Text className="text-center text-sm text-secondary">
                  By clicking the Place order button, you confirm that you have
                  read, understand and accept our{" "}
                  <LocalizedClientLink href="#" className="underline">
                    Terms of Use
                  </LocalizedClientLink>
                  ,{" "}
                  <LocalizedClientLink href="#" className="underline">
                    Terms of Sale
                  </LocalizedClientLink>{" "}
                  and{" "}
                  <LocalizedClientLink href="#" className="underline">
                    Returns Policy
                  </LocalizedClientLink>
                  .
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutSummary;
