"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/util/cn";

import { Text } from "@/components/shared/text";

import { Heading } from "@/components/shared/heading";
import PaymentButton from "../payment-button";
import { Box } from "@/components/shared/box";
import { Stepper } from "@/components/shared/stepper";

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("step") === "review";

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <Box className="bg-primary p-5">
      <Box
        className={cn("flex flex-row items-center justify-between", {
          "mb-6": !isOpen,
        })}
      >
        <Heading
          as="h2"
          className={cn("flex flex-row items-center gap-x-4 text-2xl", {
            "pointer-events-none select-none": !isOpen,
          })}
        >
          {!isOpen ? (
            <Stepper state="completed">4</Stepper>
          ) : (
            <Stepper state="focussed">4</Stepper>
          )}
          Review
        </Heading>
      </Box>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text size="md" className="text-basic-primary mt-8">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </Box>
  );
};

export default Review;
