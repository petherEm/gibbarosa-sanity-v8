"use client";

import { paymentInfoMap } from "@/lib/constants";
import { initiatePaymentSession } from "@/lib/data/cart";
import { CheckCircleSolid, CreditCard } from "@medusajs/icons";
import { Container, Text } from "@medusajs/ui";
import { Button } from "@/components/shared/button";
import { Heading } from "@/components/shared/heading";
import ErrorMessage from "@/components/checkout/error-message";
import { StripeContext } from "@/components/checkout/payment-wrapper/stripe-wrapper";
import Divider from "@/components/shared/divider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box } from "@/components/shared/box";
import { cn } from "@/lib/util/cn";
import { Stepper } from "@/components/shared/stepper";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeComplete, setStripeComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const stripeReady = useContext(StripeContext);

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );
  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const stripe = stripeReady ? useStripe() : null;
  const elements = stripeReady ? useElements() : null;

  const handlePaymentElementChange = async (
    event: StripePaymentElementChangeEvent
  ) => {
    if (event.value.type) {
      setSelectedPaymentMethod(event.value.type);
    }
    setStripeComplete(event.complete);

    if (event.complete) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!stripe || !elements) {
        setError("Payment processing not ready. Please try again.");
        return;
      }

      await elements.submit().catch((err) => {
        console.error(err);
        setError(err.message || "An error occurred with the payment");
        return;
      });

      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initStripe = async () => {
    try {
      await initiatePaymentSession(cart, {
        provider_id: "pp_stripe_stripe",
      });
    } catch (err) {
      console.error("Failed to initialize Stripe session:", err);
      setError("Failed to initialize payment. Please try again.");
    }
  };

  useEffect(() => {
    if (!activeSession && isOpen) {
      initStripe();
    }
  }, [cart, isOpen, activeSession]);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <Box className="bg-primary p-5">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          as="h2"
          className={cn("flex flex-row items-center gap-x-4 text-2xl", {
            "pointer-events-none select-none": !isOpen && !paymentReady,
          })}
        >
          {!isOpen && !paymentReady ? (
            <Stepper>3</Stepper>
          ) : isOpen && !paymentReady ? (
            <Stepper state="focussed" />
          ) : (
            <Stepper state="completed">3</Stepper>
          )}
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <Button
              variant="tonal"
              size="sm"
              onClick={handleEdit}
              data-testid="edit-payment-button"
            >
              Edit
            </Button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard &&
            availablePaymentMethods?.length &&
            stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <PaymentElement
                  onChange={handlePaymentElementChange}
                  options={{
                    layout: "accordion",
                  }}
                />
              </div>
            )}
          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              !stripeComplete ||
              !stripe ||
              !elements ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            Continue to review
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession && selectedPaymentMethod ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment method
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment details
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>Another step will appear</Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </Box>
  );
};

export default Payment;
