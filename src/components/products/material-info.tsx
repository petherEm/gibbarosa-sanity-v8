import React from "react";
import { Box } from "@/components/shared/box";
import { Text } from "@/components/shared/text";

type MaterialInfoProps = {
  material: string;
  className?: string;
};

export const MaterialInfo = ({ material, className }: MaterialInfoProps) => {
  if (!material) return null;

  return (
    <Box className={className}>
      <Text className="text-sm font-medium">Material:</Text>
      <Text className="text-sm">{material}</Text>
    </Box>
  );
};
