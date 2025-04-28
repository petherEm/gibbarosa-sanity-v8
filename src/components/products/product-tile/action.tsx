"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { addToCartCheapestVariant } from "@/lib/data/cart";
import { useCartStore } from "@/lib/store/useCartStore";
import { cn } from "@/lib/util/cn";
import { Button } from "@/components/shared/button";
import { toast } from "@/components/shared/toast";
import { BagIcon, Spinner } from "@/components/shared/icons";
import { StoreProduct } from "@medusajs/types";

export function ProductActions({
  product,
  regionId,
}: {
  product: StoreProduct;
  regionId: string;
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { openCartDropdown } = useCartStore();
  const countryCode = useParams().countryCode as string;

  const { handle: productHandle } = product;

  const isOutOfStock = product?.variants?.every(
    (variant) => variant.inventory_quantity === 0
  );
  console.log("RegionID from ProductActions", regionId);

  const handleAddToCart = async () => {
    if (!product.id || isOutOfStock) return null;

    setIsAddingToCart(true);

    try {
      const result = await addToCartCheapestVariant({
        regionId,
        productHandle,
        countryCode,
      });

      if (result.success) {
        setTimeout(() => {
          openCartDropdown();

          toast("success", result.message || "Product added to cart");
        }, 1000);
      } else {
        toast("error", result.error || "An unexpected error occurred");
      }
    } catch (error) {
      toast("error", "An unexpected error occurred");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Button
      withIcon
      disabled={isAddingToCart || isOutOfStock}
      className={cn(
        "cursor-pointer absolute z-50 bottom-3 right-3 opacity-0 bg-black text-white transition-opacity duration-300 group-hover:opacity-100 small:bottom-5 small:right-5",
        { "pointer-events-none !px-4": isAddingToCart }
      )}
      onClick={handleAddToCart}
    >
      {isAddingToCart ? <Spinner /> : <BagIcon />}
    </Button>
  );
}
