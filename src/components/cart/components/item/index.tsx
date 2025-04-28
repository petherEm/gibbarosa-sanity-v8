"use client";

import { cn } from "@/lib/util/cn";
import { HttpTypes } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import DeleteButton from "@/components/shared/delete-button";
import { Heading } from "@/components/shared/heading";
import LineItemPrice from "@/components/shared/line-item-price";
import LocalizedClientLink from "@/components/shared/localized-client-link";

import Thumbnail from "@/components/products/thumbnail";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: "full" | "preview";
};

const Item = ({ item, type = "full" }: ItemProps) => {
  const { handle } = item.variant?.product ?? {};

  return (
    <Box className="flex bg-primary small:h-[172px]" data-testid="cart-item">
      <Box>
        <LocalizedClientLink href={`/products/${handle}`}>
          <Thumbnail
            className="h-[92px] max-w-[92px] rounded-none small:h-full small:max-w-[146px]"
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
          />
        </LocalizedClientLink>
      </Box>
      <Box className="flex w-full justify-between p-5">
        <Box className="flex h-full flex-col gap-3 small:justify-between small:gap-0">
          <Box>
            <LocalizedClientLink href={`/products/${handle}`}>
              <Heading as="h3" className="line-clamp-2 text-lg font-medium">
                {item.product_title}
              </Heading>
              <Heading as="h3" className="line-clamp-2 text-lg font-normal">
                {item.product_subtitle}
              </Heading>
            </LocalizedClientLink>
          </Box>
          <Box className="block w-max small:hidden">
            <LineItemPrice item={item} style="tight" />
          </Box>
        </Box>
        <Box
          className={cn("flex flex-col items-end justify-between", {
            "justify-end": type === "preview",
          })}
        >
          {type === "full" && (
            <DeleteButton id={item.id} className="w-12 hover:bg-transparent" />
          )}
          <Box className="hidden small:block">
            <LineItemPrice item={item} style="tight" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Item;
