"use client";

import React, { createContext } from "react";

// import { isPaypal, isStripe } from "@/lib/constants";
import { HttpTypes } from "@medusajs/types";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";

import StripeWrapper from "./stripe-wrapper";

type WrapperProps = {
  cart: HttpTypes.StoreCart;
  children: React.ReactNode;
};

// export const StripeContext = createContext(false);

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const Wrapper: React.FC<WrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  );

  if (
    isStripe(paymentSession?.provider_id) &&
    paymentSession &&
    stripePromise
  ) {
    return (
      <StripeWrapper
        paymentSession={paymentSession}
        stripeKey={stripeKey}
        stripePromise={stripePromise}
      >
        {children}
      </StripeWrapper>
    );
  }

  // if (
  //   isPaypal(paymentSession?.provider_id) &&
  //   paypalClientId !== undefined &&
  //   cart
  // ) {
  //   return (
  //     <PayPalScriptProvider
  //       options={{
  //         clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
  //         currency: cart?.currency_code.toUpperCase(),
  //         intent: "authorize",
  //         components: "buttons",
  //       }}
  //     >
  //       {children}
  //     </PayPalScriptProvider>
  //   );
  // }

  return children;
};

export default Wrapper;
