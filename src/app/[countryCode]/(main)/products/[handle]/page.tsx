import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductTemplate from "@/components/products/_templates";
import { retrieveCart } from "@/lib/data/cart";
import { getProductByHandle, getProductsList } from "@/lib/data/products";
import { getRegion, listRegions } from "@/lib/data/regions";
import { getProductByMedusaId } from "@/sanity/lib/products/getProductByMedusaId";

type Props = {
  params: { countryCode: string; handle: string };
};

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  );

  if (!countryCodes) {
    return null;
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode });
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  );

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat();

  return staticParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;
  const region = await getRegion(params.countryCode);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle(handle, region.id);

  if (!product) {
    notFound();
  }

  // Fetch Sanity content
  let sanityProduct = null;
  try {
    sanityProduct = await getProductByMedusaId(product.id);
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
  }

  // Convert country code to lowercase locale for Sanity fields
  const locale =
    params.countryCode.toUpperCase() === "PL"
      ? "pl"
      : params.countryCode.toUpperCase() === "FR"
        ? "fr"
        : "en";

  // Get localized title and description with fallbacks
  const localizedTitle =
    sanityProduct?.localizedTitles?.[locale] || product.title;

  const description =
    sanityProduct?.localizedShortDescriptions?.[locale] ||
    sanityProduct?.localizedDescriptions?.[locale] ||
    product.description ||
    product.title;

  return {
    title: `${localizedTitle} | Gibbarosa`,
    description,
    openGraph: {
      title: `${localizedTitle} | Gibbarosa`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode);

  if (!region) {
    notFound();
  }

  // Get product from Medusa
  const pricedProduct = await getProductByHandle(params.handle, region.id);

  if (!pricedProduct) {
    notFound();
  }

  // Fetch Sanity content
  let sanityProduct = null;
  try {
    sanityProduct = await getProductByMedusaId(pricedProduct.id);
    console.log("Sanity product data:", sanityProduct);
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
  }

  const cart = await retrieveCart();

  return (
    <ProductTemplate
      product={pricedProduct}
      sanityContent={sanityProduct}
      region={region}
      cartItems={cart?.items}
      countryCode={params.countryCode}
    />
  );
}
