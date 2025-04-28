import { Metadata } from "next";
import { notFound } from "next/navigation";
import { enrichLineItems, retrieveCart } from "@/lib/data/cart";
import { getCustomer } from "@/lib/data/customer";
import Wrapper from "@/components/checkout/payment-wrapper";
import CheckoutForm from "@/components/checkout/_templates/checkout-form";
import CheckoutSummary from "@/components/checkout/_templates/checkout-summary";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Checkout",
};

const fetchCart = async () => {
  const cart = await retrieveCart();
  if (!cart) {
    return notFound();
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(
      cart?.items,
      cart?.region_id as string
    );
    cart.items = enrichedItems;
  }

  return cart;
};

export default async function Checkout(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const cart = await fetchCart();
  const customer = await getCustomer();

  return (
    <Container className="mx-0 grid max-w-full grid-cols-1 gap-y-4 bg-primary large:grid-cols-[1fr_416px] large:gap-x-10 2xl:gap-x-40">
      <Wrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
        <CheckoutSummary cart={cart} searchParams={searchParams} />
      </Wrapper>
    </Container>
  );
}
