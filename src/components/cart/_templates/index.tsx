import React from "react";

import { HttpTypes } from "@medusajs/types";
import { Container } from "@/components/shared/container";

import EmptyCartMessage from "../components/empty-cart-message";
import ItemsTemplate from "./items";
import Summary from "./summary";

type Dictionary = {
  cart: {
    empty: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
};

interface CartTemplateProps {
  cart: HttpTypes.StoreCart | null;
  dict: Dictionary;
}

const CartTemplate = ({ cart, dict }: CartTemplateProps) => {
  return (
    <Container className="flex items-center justify-center">
      {cart?.items?.length ? (
        <div className="flex w-full flex-col gap-6 large:flex-row large:justify-between large:gap-0">
          <div className="flex max-w-[765px] shrink grow flex-col gap-4 large:mr-12">
            <ItemsTemplate items={cart?.items} />
          </div>
          <div className="relative">
            <div className="sticky top-24 flex flex-col gap-y-8">
              {cart && cart.region && <Summary cart={cart as any} />}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <EmptyCartMessage dict={dict} />
        </div>
      )}
    </Container>
  );
};

export default CartTemplate;
