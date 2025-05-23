import Image from "next/image";

import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { Text } from "@/components/shared/text";
import { HeroBanner } from "@/types/strapi";

export const Banner = ({ data }: { data: HeroBanner }) => {
  const { Image: bannerImage, CTA, Headline, Text: text } = data;

  return (
    <Container>
      <Box className="relative h-[440px] medium:h-[478]">
        <Image
          src={bannerImage.url}
          alt={bannerImage.alternativeText ?? "Banner image"}
          layout="fill"
          objectFit="cover"
          className="object-right-top"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white">
          <Heading className="text-3xl">{Headline}</Heading>

          <Text size="lg" className="mt-2 medium:max-w-[600px]">
            {text}
          </Text>
          <Button className="mt-8" asChild>
            <LocalizedClientLink href={CTA.BtnLink}>
              {CTA.BtnText}
            </LocalizedClientLink>
          </Button>
        </div>
      </Box>
    </Container>
  );
};
