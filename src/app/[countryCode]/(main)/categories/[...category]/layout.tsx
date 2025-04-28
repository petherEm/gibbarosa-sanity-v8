import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryByHandle, listCategories } from "@/lib/data/categories";
import { listRegions } from "@/lib/data/regions";
import { StoreProductCategory, StoreRegion } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import StoreBreadcrumbs from "@/components/store/_templates/breadcrumbs";

interface CategoryPageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string[]; countryCode: string }>;
}

// This way it won't try to generate static paths during build if API is not available
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const product_categories = await listCategories();

    if (!product_categories) {
      console.warn("No product categories found, skipping static generation");
      return [];
    }

    const regions = await listRegions();

    if (!regions || regions.length === 0) {
      console.warn("No regions found, skipping static generation");
      return [];
    }

    const countryCodes = regions
      .map((r) => r.countries?.map((c) => c.iso_2))
      .flat()
      .filter(Boolean);

    const categoryHandles = product_categories.map(
      (category) => category.handle
    );

    // Limit the number of generated static params
    const maxParams = 20; // Adjust this number based on your needs
    let count = 0;

    const staticParams = [];
    for (const countryCode of countryCodes) {
      for (const handle of categoryHandles) {
        if (count >= maxParams) break;

        staticParams.push({
          countryCode,
          category: [handle],
        });

        count++;
      }
      if (count >= maxParams) break;
    }

    console.log(
      `Generated static params for ${staticParams.length} category pages`
    );
    return staticParams;
  } catch (error) {
    console.error("Error generating static params for category pages:", error);
    // Return an empty array to avoid build failures
    return [];
  }
}

export async function generateMetadata(
  props: CategoryPageLayoutProps
): Promise<Metadata> {
  try {
    const params = await props.params;

    // Skip metadata generation during build if we can't connect to API
    if (
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_MEDUSA_API_URL
    ) {
      return {
        title: "Product Category | Gibbarosa Preowned Luxury",
        description: "Browse our product categories",
      };
    }

    const { product_categories } = await getCategoryByHandle(params.category);

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ");

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`;

    return {
      title: `${title} | Gibbarosa Preowned Luxury`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Category | Gibbarosa Preowned Luxury",
      description: "Browse our product categories",
    };
  }
}

export default async function CategoryPageLayout(
  props: CategoryPageLayoutProps
) {
  try {
    const params = await props.params;
    const { category } = params;
    const { children } = props;
    const { product_categories } = await getCategoryByHandle(category);
    const currentCategory = product_categories[product_categories.length - 1];

    return (
      <>
        <Container className="flex flex-col gap-8 !py-8">
          <Box className="flex flex-col gap-4">
            <StoreBreadcrumbs breadcrumb={currentCategory.name} />
            <Heading
              as="h1"
              className="text-4xl text-basic-primary small:text-5xl"
            >
              {currentCategory.name}
            </Heading>
          </Box>
        </Container>
        {children}
      </>
    );
  } catch (error) {
    console.error("Error rendering category page layout:", error);
    notFound();
  }
}
