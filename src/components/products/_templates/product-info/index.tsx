import { HttpTypes } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Heading } from "@/components/shared/heading";
import { Text } from "@/components/shared/text";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import React from "react";

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
  sanityContent?: any;
  countryCode: string;
};

// Static translations dictionary
const translations = {
  en: {
    brand: "Brand",
    material: "Material",
    color: "Color",
    size: "Size",
    dimensions: "Dimensions",
    productionYear: "Production Year",
    condition: "Condition",
    creativeDirector: "Creative Director",
    serialNumber: "Serial Number",
    estimatedValue: "Estimated Value",
    accessories: "Accessories",
    description: "Description",
  },
  pl: {
    brand: "Marka",
    material: "Materiał",
    color: "Kolor",
    size: "Rozmiar",
    dimensions: "Wymiary",
    productionYear: "Rok produkcji",
    condition: "Stan",
    creativeDirector: "Dyrektor kreatywny",
    serialNumber: "Numer seryjny",
    estimatedValue: "Szacowana wartość",
    accessories: "Akcesoria",
    description: "Opis",
  },
  fr: {
    brand: "Marque",
    material: "Matériau",
    color: "Couleur",
    size: "Taille",
    dimensions: "Dimensions",
    productionYear: "Année de production",
    condition: "État",
    creativeDirector: "Directeur créatif",
    serialNumber: "Numéro de série",
    estimatedValue: "Valeur estimée",
    accessories: "Accessoires",
    description: "Description",
  },
};

const ProductInfo = ({
  product,
  sanityContent,
  countryCode,
}: ProductInfoProps) => {
  // Get locale from country code
  const locale =
    countryCode.toUpperCase() === "PL"
      ? "pl"
      : countryCode.toUpperCase() === "FR"
        ? "fr"
        : "en";

  // Get translations for the current locale
  const t = translations[locale];

  // Safely extract data with fallbacks
  const sanityData = sanityContent?.data || sanityContent || {};

  // Extract localized data from sanity content with proper field names
  const localizedTitle = sanityData?.localizedTitles?.[locale] || product.title;

  const localizedDescription =
    sanityData?.localizedDescriptions?.[locale] || product.description;

  const localizedShortDescription =
    sanityData?.localizedShortDescriptions?.[locale];

  const localizedMaterial = sanityData?.materials?.[locale];

  const localizedColor = sanityData?.colors?.[locale];

  const brand = sanityData?.brand;
  const productionYear = sanityData?.productionYear;

  // New fields to extract and display
  const condition = sanityData?.condition?.[locale];
  const accessories = sanityData?.accessories?.[locale];
  const creativeDirector = sanityData?.creativeDirector;
  const size = sanityData?.size;
  const dimensions = sanityData?.dimensions;
  const serialNumber = sanityData?.serialNumber;

  // Choose appropriate price based on country code
  const estimatedPrice =
    countryCode.toUpperCase() === "PL"
      ? sanityData?.estimatedPricePLN
      : sanityData?.estimatedPriceEUR;

  const currencySymbol = countryCode.toUpperCase() === "PL" ? "zł" : "€";

  // Create an array of specifications to display with translated labels
  const specifications = [
    { label: t.brand, value: brand },
    { label: t.material, value: localizedMaterial },
    { label: t.color, value: localizedColor },
    { label: t.size, value: size },
    { label: t.dimensions, value: dimensions },
    { label: t.productionYear, value: productionYear },
    { label: t.condition, value: condition },
    { label: t.creativeDirector, value: creativeDirector },
    { label: t.serialNumber, value: serialNumber },
    {
      label: t.estimatedValue,
      value: estimatedPrice ? `${estimatedPrice} ${currencySymbol}` : null,
    },
  ].filter((spec) => spec.value); // Only include specs with values

  return (
    <Box className="flex flex-col gap-y-4">
      {/* Collection and title */}
      <Box className="flex flex-col gap-y-1" id="product-info">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="w-max text-md text-secondary"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          as="h2"
          className="text-2xl text-basic-primary small:text-3xl"
          data-testid="product-title"
        >
          {localizedTitle}
        </Heading>
      </Box>

      {/* Short description */}
      {localizedShortDescription && (
        <Text className="mt-2 text-ui-fg-base font-medium">
          {localizedShortDescription}
        </Text>
      )}

      {/* Product details section */}
      <Box className="flex flex-col gap-y-4 mt-4">
        {/* Long description */}
        {localizedDescription && (
          <Box>
            <Text className="text-ui-fg-subtle text-sm">
              {localizedDescription}
            </Text>
          </Box>
        )}
      </Box>

      {/* Product Specifications Section - Table-like layout */}
      {specifications.length > 0 && (
        <Box className="border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-y-3">
            {specifications.map((spec, index) => (
              <React.Fragment key={index}>
                <Text className="font-medium text-sm text-ui-fg-subtle">
                  {spec.label}
                </Text>
                <Text className="text-sm">{spec.value}</Text>
              </React.Fragment>
            ))}
          </div>
        </Box>
      )}

      {/* Accessories Section */}
      {accessories && (
        <Box className="mt-4 border-t pt-4">
          <Text className="font-medium mb-1">{t.accessories}</Text>
          <Text className="text-ui-fg-subtle">{accessories}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ProductInfo;
