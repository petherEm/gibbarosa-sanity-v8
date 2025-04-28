import { Box } from "@/components/shared/box";
import CartButton from "@/components/layout/cart-button";
import ProfileButton from "@/components/layout/profile-button";

export default function NavActions({ countryCode }: { countryCode: string }) {
  return (
    <Box className="flex items-center !py-4">
      <ProfileButton />
      <CartButton countryCode={countryCode} />
    </Box>
  );
}
