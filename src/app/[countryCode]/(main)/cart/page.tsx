import { Suspense } from "react";
import { Metadata } from "next";
import { enrichLineItems, retrieveCart } from "@/lib/data/cart";
import { getProductsList } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
import CartTemplate from "@/components/cart/_templates";
import { Container } from "@/components/shared/container";
import { ProductCarousel } from "@/components/products/product-carousel";
import SkeletonProductsCarousel from "@/components/skeletons/_templates/skeleton-products-carousel";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
};

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (!cart) {
    return null;
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

export default async function Cart(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;
  const cart = await fetchCart();
  const dict = await getDictionary(countryCode);

  const [region, { products }] = await Promise.all([
    getRegion(countryCode),
    getProductsList({
      pageParam: 0,
      queryParams: {
        limit: 9,
      },
      countryCode,
    }).then(({ response }) => response),
  ]);

  return (
    <Container className="max-w-full bg-primary !p-0">
      <CartTemplate cart={cart} dict={dict} />
      <Suspense fallback={<SkeletonProductsCarousel />}>
        <ProductCarousel
          products={products}
          title={dict.productCarousel.relatedProducts}
          regionId={region!.id}
        />
      </Suspense>
    </Container>
  );
}
