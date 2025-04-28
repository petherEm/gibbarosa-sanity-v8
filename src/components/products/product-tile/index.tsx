import { getProductByHandle } from "@/lib/data/products";
import { getProductPrice } from "@/lib/util/get-product-price";
import { StoreProduct } from "@medusajs/types";

import { ProductTileClient } from "./tile";

export default async function ProductTile({
  product,
  regionId,
}: {
  product: StoreProduct;
  regionId: string;
}) {
  const expandedProduct = await getProductByHandle(product.handle, regionId);
  const { cheapestPrice } = getProductPrice({
    product: expandedProduct,
  });

  console.log("expandedProduct !!!__!!!", expandedProduct);
  return (
    <ProductTileClient
      regionId={regionId}
      product={expandedProduct}
      cheapestPrice={cheapestPrice!}
    />
  );
}
