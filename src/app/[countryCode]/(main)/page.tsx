import { Suspense } from "react";
import { Metadata } from "next";
import { getCollectionsList } from "@/lib/data/collections";
import { getProductsList } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
// import { ExploreBlog } from "@/components/home/components/explore-blog";
import Hero from "@/components/home/hero";
import { ProductCarousel } from "@/components/products/product-carousel";
import SkeletonProductsCarousel from "@/components/skeletons/_templates/skeleton-products-carousel";
import SubHero from "@/components/home/sub-hero";
import MidBanner from "@/components/home/mid-banner";
import InstaFeed from "@/components/home/insta-feed";
import NewsletterBanner from "@/components/home/newsletter-banner";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Gibbarosa v8 | Preowned Luxury",
  description: "Gibbarosa - Preowned Luxury",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;

  const { countryCode } = params;

  // Remove the type constraint since getDictionary now handles the fallback
  const dict = await getDictionary(countryCode);

  const [{ collections: collectionsList }, { products }] = await Promise.all([
    getCollectionsList(),
    getProductsList({
      pageParam: 1,
      queryParams: { limit: 9 },
      countryCode: countryCode,
    }).then(({ response }) => response),
  ]);

  const region = await getRegion(countryCode);

  if (!products || !collectionsList || !region) {
    return null;
  }

  // MOVE IT POTENTIALLY TO LIB AS A FILTERED PRODUCT FETCHING

  // Find the "New" collection
  const newCollection = collectionsList.find(
    (collection) => collection.title === "New" || collection.handle === "new"
  );

  // Filter products belonging to the "New" collection
  const newCollectionProducts =
    products.filter(
      (product) => product.collection?.id === newCollection?.id
    ) || [];

  return (
    <>
      <Hero dict={dict} />

      <Suspense fallback={<SkeletonProductsCarousel />}>
        <ProductCarousel
          products={products}
          regionId={region.id}
          title={dict.productCarousel.title}
          viewAll={{
            link: "/shop",
            text: dict.productCarousel.button,
          }}
        />
      </Suspense>
      <SubHero dict={dict} />
      <MidBanner dict={dict} />
      <ProductCarousel
        products={products}
        regionId={region.id}
        title={dict.productCarousel.title}
        viewAll={{
          link: "/shop",
          text: dict.productCarousel.button,
        }}
      />
      <NewsletterBanner dict={dict} />

      <InstaFeed />
    </>
  );
}
