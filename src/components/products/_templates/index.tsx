import { Suspense } from "react";
import { getProductsListByCollectionId } from "@/lib/data/products";
import { HttpTypes } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import ImageGallery from "@/components/products/image-gallery";
import ProductTabs from "@/components/products/product-tabs";
import ProductInfo from "@/components/products/_templates/product-info";
import ProductActions from "@/components/products/product-actions";
import SkeletonProductsCarousel from "@/components/skeletons/_templates/skeleton-products-carousel";

import { ProductCarousel } from "@/components/products/product-carousel";
import ProductBreadcrumbs from "./breadcrumbs";
import ProductActionsWrapper from "./product-actions-wrapper";

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  sanityContent?: any; // Make sure this type matches your Sanity data structure
  region: HttpTypes.StoreRegion;
  countryCode: string;
  cartItems?: HttpTypes.StoreCartLineItem[];
};

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  sanityContent,
  region,
  cartItems,
  countryCode,
}: ProductTemplateProps) => {
  const { response: productsList } = await getProductsListByCollectionId({
    collectionId: product.collection_id as string,
    countryCode,
    excludeProductId: product.id,
  });
  return (
    <>
      <Container
        className="relative flex flex-col gap-y-6 !py-8 small:gap-y-12"
        data-testid="product-container"
      >
        <ProductBreadcrumbs product={product} countryCode={countryCode} />
        <Box className="relative flex flex-col gap-y-6 large:flex-row large:items-start large:gap-x-16 xl:gap-x-[120px]">
          <Box className="relative block w-full">
            <ImageGallery
              title={product.title}
              images={product?.images || []}
            />
          </Box>
          <Box className="flex w-full flex-col gap-y-6 py-8 large:sticky large:top-24 large:max-w-[440px] large:py-0">
            {/* Pass the sanityContent to ProductInfo */}
            <ProductInfo
              product={product}
              sanityContent={sanityContent}
              countryCode={countryCode}
            />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  cartItems={cartItems!}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper
                id={product.id}
                region={region}
                cartItems={cartItems}
              />
            </Suspense>
            <ProductTabs product={product} />
          </Box>
        </Box>
      </Container>
      {productsList.products.length > 0 && (
        <Suspense fallback={<SkeletonProductsCarousel />}>
          <ProductCarousel
            products={productsList.products}
            regionId={region.id}
            title="You may also love"
          />
        </Suspense>
      )}
    </>
  );
};

export default ProductTemplate;
