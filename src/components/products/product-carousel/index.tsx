import { StoreProduct } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import LocalizedClientLink from "@/components/shared/localized-client-link";

import ProductTile from "../product-tile";
import CarouselWrapper from "./carousel-wrapper";
import { getProductPrice } from "@/lib/util/get-product-price";
import { ArrowRightIcon } from "@/components/shared/icons";

interface ViewAllProps {
  link: string;
  text?: string;
}

interface ProductCarouselProps {
  products: StoreProduct[];
  regionId: string;
  title: string;
  viewAll?: ViewAllProps;
}

export function ProductCarousel({
  products,
  regionId,
  title,
  viewAll,
}: ProductCarouselProps) {
  const displayProducts = products.slice(0, 4);
  return (
    <Container className="small:mb-20">
      <Box className="flex flex-col gap-8">
        <Box className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold medium:text-4xl large:text-5xl">
            {title}
          </h2>
          {viewAll && (
            <Button
              asChild
              variant="ghost"
              className="p-0 text-lg transition-colors hover:bg-transparent small:text-[18px] group"
            >
              <LocalizedClientLink
                href={viewAll.link}
                className="px-8 py-4 inline-flex items-center"
              >
                <span className="relative inline-flex items-center">
                  {viewAll.text || "View all"}
                  <ArrowRightIcon className="ml-1" />
                  <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current transform-gpu transition-all duration-200 group-hover:bottom-[-6px] w-full"></span>
                </span>
              </LocalizedClientLink>
            </Button>
          )}
        </Box>
        <CarouselWrapper productsCount={displayProducts.length}>
          <Box className="grid grid-cols-2 gap-x-2 small:gap-x-4 gap-y-8 small:grid-cols-2 medium:grid-cols-2 large:grid-cols-4">
            {displayProducts.map((item, index) => (
              <Box key={index} className="w-full">
                <ProductTile product={item} regionId={regionId} />
              </Box>
            ))}
          </Box>
        </CarouselWrapper>
      </Box>
    </Container>
  );
}
