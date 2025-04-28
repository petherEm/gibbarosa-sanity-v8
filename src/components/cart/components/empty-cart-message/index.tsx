import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { Text } from "@/components/shared/text";
import { BagIcon } from "@/components/shared/icons";

type Dictionary = {
  cart: {
    empty: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
};

interface EmptyCartMessageProps {
  dict: Dictionary;
}

const EmptyCartMessage = ({ dict }: EmptyCartMessageProps) => {
  return (
    <Box className="flex flex-col items-center gap-6 text-basic-primary">
      <BagIcon className="h-14 w-14" />
      <Box className="flex flex-col items-center gap-2">
        <Heading as="h2" className="text-xl small:text-2xl">
          {dict.cart.empty.title}
        </Heading>
        <Text size="md" className="text-secondary">
          {dict.cart.empty.subtitle}
        </Text>
      </Box>
      <Button asChild>
        <LocalizedClientLink href="/">
          {dict.cart.empty.button}
        </LocalizedClientLink>
      </Button>
    </Box>
  );
};

export default EmptyCartMessage;
