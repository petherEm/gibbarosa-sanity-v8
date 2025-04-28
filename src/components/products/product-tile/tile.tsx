"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/shared/badge";
import { Box } from "@/components/shared/box";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { Text } from "@/components/shared/text";
import type { StoreProduct } from "@medusajs/types";

import { ProductActions } from "./action";
import { LoadingImage } from "./loading-image";
import ProductPrice from "./price";

export function ProductTileClient({
  regionId,
  product,
  cheapestPrice,
}: {
  regionId: string;
  product: StoreProduct;
  cheapestPrice: {
    calculated_price_number: any;
    calculated_price: string;
    original_price_number: any;
    original_price: string;
    currency_code: any;
    price_type: any;
    percentage_diff: string;
  };
}) {
  const isNew = useMemo(() => {
    const createdAt = new Date(product.created_at!);
    const currentDate = new Date();
    const differenceInDays =
      (currentDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);

    return differenceInDays <= 100;
  }, [product.created_at]);

  // Get primary image
  const primaryImage = product.thumbnail || "";

  // Select secondary image with correct handling for array of objects
  const secondaryImage = useMemo(() => {
    if (
      !product.images ||
      !Array.isArray(product.images) ||
      product.images.length < 2
    ) {
      return primaryImage;
    }

    // Find image with rank 1 (second image), or use the second image in the array
    const rankedImage = product.images.find(
      (img) => img && typeof img === "object" && img.rank === 1
    );

    if (rankedImage && rankedImage.url) {
      return rankedImage.url;
    } else if (product.images[1] && product.images[1].url) {
      return product.images[1].url;
    }

    return primaryImage;
  }, [product.images, primaryImage]);

  // Check if we have a valid secondary image different from primary
  const hasSecondaryImage = secondaryImage && secondaryImage !== primaryImage;

  return (
    <Box className="group flex flex-col">
      <Box className="relative aspect-[3/4] w-full overflow-hidden">
        {/* Badge moved outside the image container to keep it always visible */}
        {isNew && (
          <Box className="absolute left-3 top-3 z-20 small:left-5 small:top-5">
            <Badge label="New" variant="basic" />
          </Box>
        )}

        <LocalizedClientLink href={`/products/${product.handle}`}>
          <div className="relative h-full w-full">
            {/* Primary Image */}
            <div
              className={`absolute inset-0 z-10 transition-all duration-500 ease-in-out ${hasSecondaryImage ? "group-hover:opacity-0" : ""}`}
            >
              <LoadingImage
                src={primaryImage}
                alt={product.title}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Secondary Image (shown on hover) */}
            {hasSecondaryImage && (
              <div className="absolute inset-0 z-0">
                <LoadingImage
                  src={secondaryImage}
                  alt={`${product.title} - secondary view`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </LocalizedClientLink>
        <ProductActions product={product} regionId={regionId} />
      </Box>
      <ProductInfo product={product} cheapestPrice={cheapestPrice} />
    </Box>
  );
}

function ProductInfo({
  product,
  cheapestPrice,
}: {
  product: StoreProduct;
  cheapestPrice: {
    calculated_price_number: number;
    calculated_price: string;
    original_price_number: number;
    original_price: string;
    currency_code: string;
    price_type: string;
    percentage_diff: string;
  };
}) {
  return (
    <Box className="flex flex-col items-start gap-2 p-2 text-left small:gap-4 small:px-0 small:py-3">
      <div className="flex w-full flex-col items-start gap-1 small:gap-2">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="w-full"
        >
          <Text
            title={product.subtitle || "Brand name"}
            as="span"
            className="line-clamp-1 text-left text-xs font-bold small:text-sm capitalize"
          >
            {product.subtitle}
          </Text>
          <Text
            title={product.title}
            as="span"
            className="line-clamp-1 text-left text-sm font-medium capitalize small:line-clamp-2 small:text-lg"
          >
            {product.title}
          </Text>
        </LocalizedClientLink>
        <ProductPrice
          calculatedPrice={cheapestPrice.calculated_price}
          salePrice={cheapestPrice.original_price}
        />
      </div>
    </Box>
  );
}
