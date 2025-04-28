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
  try {
    const countryCodes = await listRegions().then(
      (regions) =>
        regions
          ?.map((r) => r.countries?.map((c) => c.iso_2))
          .flat()
          .filter(Boolean) as string[]
    );

    if (!countryCodes || countryCodes.length === 0) {
      console.warn("No country codes found, skipping static generation");
      return [];
    }

    // Limit the number of products to fetch to avoid timeout during build
    const productsPromises = countryCodes.map(async (countryCode) => {
      try {
        const result = await getProductsList({
          countryCode,
          limit: 20, // Limit products per country to avoid timeouts
        });
        return result;
      } catch (error) {
        console.error(`Failed to fetch products for ${countryCode}:`, error);
        return { response: { products: [] } };
      }
    });

    const productsResponses = await Promise.all(productsPromises);
    const products = productsResponses
      .map(({ response }) => response.products || [])
      .flat();

    if (products.length === 0) {
      console.warn("No products found, skipping static generation");
      return [];
    }

    // Generate a limited number of static params to avoid build timeout
    const staticParams = [];
    for (const countryCode of countryCodes) {
      for (const product of products) {
        if (product.handle) {
          staticParams.push({
            countryCode,
            handle: product.handle,
          });

          // Limit total number of static pages to generate
          if (staticParams.length >= 100) {
            console.warn("Limiting static generation to 100 products total");
            break;
          }
        }
      }
      if (staticParams.length >= 100) break;
    }

    console.log(
      `Generated static params for ${staticParams.length} product pages`
    );
    return staticParams;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return an empty array instead of null to avoid build failures
    return [];
  }
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
