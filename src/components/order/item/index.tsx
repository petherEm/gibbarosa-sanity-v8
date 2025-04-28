import { HttpTypes } from "@medusajs/types";
import { Text } from "@medusajs/ui";
import { Box } from "@/components/shared/box";
import LineItemPrice from "@/components/shared/line-item-price";
import Thumbnail from "@/components/products/thumbnail";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
};

const Item = ({ item }: ItemProps) => {
  return (
    <Box className="flex w-full bg-primary p-4" data-testid="product-row">
      <div className="flex h-[90px] w-[90px]">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>
      <Box className="px-4 medium:flex-grow">
        <Text size="base" className="text-secondary">
          {item.product_subtitle}
        </Text>
        <Text className="font-medium" data-testid="product-name">
          {item.product_title}
        </Text>
        <Text size="base" className="text-secondary">
          From our {item.product_collection} collection
        </Text>

        <LineItemPrice
          item={item}
          style="tight"
          className="mt-3 flex-col items-start gap-0 medium:hidden"
        />
      </Box>
      <Box className="flex items-center justify-center">
        <LineItemPrice
          item={item}
          style="tight"
          className="hidden flex-col items-start gap-0 medium:block"
        />
      </Box>
    </Box>
  );
};

export default Item;
