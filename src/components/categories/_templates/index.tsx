import { Suspense } from "react";
import { notFound } from "next/navigation";

import { storeSortOptions } from "@/lib/constants";
import { getCategoryByHandle } from "@/lib/data/categories";
import { getProductsList, getStoreFilters } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import RefinementList from "@/components/shared/sort";
import { Text } from "@/components/shared/text";
import { ProductCarousel } from "@/components/products/product-carousel";
import { search } from "@/components/search/actions";
import SkeletonProductGrid from "@/components/skeletons/_templates/skeleton-product-grid";
import SkeletonProductsCarousel from "@/components/skeletons/_templates/skeleton-products-carousel";
import ProductFilters from "@/components/store/filters";
import ActiveProductFilters from "@/components/store/filters/active-filters";
import ProductFiltersDrawer from "@/components/store/filters/filters-drawer";
import PaginatedProducts from "@/components/store/_templates/paginated-products";

export const runtime = "edge";

export default async function CategoryTemplate({
  searchParams,
  params,
}: {
  searchParams: Record<string, string>;
  params: { countryCode: string; category: string[] };
}) {
  const { sortBy, page, collection, type, material, price } = searchParams;
  const { countryCode, category } = params;

  const region = await getRegion(countryCode);
  const { product_categories } = await getCategoryByHandle(category);
  const currentCategory = product_categories[product_categories.length - 1];

  if (!currentCategory || !region) notFound();

  const pageNumber = page ? parseInt(page) : 1;
  const filters = await getStoreFilters();

  const { results, count } = await search({
    currency_code: region.currency_code,
    category_id: currentCategory.id,
    order: sortBy,
    page: pageNumber,
    collection: collection?.split(","),
    type: type?.split(","),
    material: material?.split(","),
    price: price?.split(","),
  });

  // TODO: Add logic in future
  const { products: recommendedProducts } = await getProductsList({
    pageParam: 0,
    queryParams: { limit: 9 },
    countryCode: params.countryCode,
  }).then(({ response }) => response);

  return (
    <>
      <Container className="flex flex-col gap-8 !pb-8 !pt-4">
        <Box className="flex flex-col gap-4">
          <Text className="text-md text-secondary">
            {count === 1 ? `${count} product` : `${count} products`}
          </Text>
          <Box className="grid w-full grid-cols-2 items-center justify-between gap-2 small:flex small:flex-wrap">
            <Box className="hidden small:flex">
              <ProductFilters filters={filters} />
            </Box>
            <ProductFiltersDrawer>
              <ProductFilters filters={filters} />
            </ProductFiltersDrawer>
            <RefinementList
              options={storeSortOptions}
              sortBy={sortBy || "relevance"}
            />
          </Box>
          <ActiveProductFilters
            filters={filters}
            currentCategory={currentCategory}
            countryCode={countryCode}
          />
        </Box>
        <Suspense fallback={<SkeletonProductGrid />}>
          {results && results.length > 0 ? (
            <PaginatedProducts
              products={results}
              page={pageNumber}
              total={count}
              countryCode={countryCode}
            />
          ) : (
            <p className="py-10 text-center text-lg text-secondary">
              No products.
            </p>
          )}
        </Suspense>
      </Container>
      {recommendedProducts && (
        <Suspense fallback={<SkeletonProductsCarousel />}>
          <ProductCarousel
            products={recommendedProducts}
            regionId={region.id}
            title="Recommended products"
          />
        </Suspense>
      )}
    </>
  );
}
