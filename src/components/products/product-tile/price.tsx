import { Box } from "@/components/shared/box";
import { Text } from "@/components/shared/text";

export default function ProductPrice({
  calculatedPrice,
  salePrice,
}: {
  calculatedPrice: string;
  salePrice: string;
}) {
  if (!calculatedPrice) {
    return null;
  }

  return (
    <Box className="flex items-center justify-center gap-2">
      {salePrice !== calculatedPrice && (
        <Text size="md" className="text-secondary line-through">
          {salePrice}
        </Text>
      )}
      <Text className="font-semibold" size="md">
        {calculatedPrice}
      </Text>
    </Box>
  );
}
