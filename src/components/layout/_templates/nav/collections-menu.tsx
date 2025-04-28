"use client";

import Image from "next/image";
import { StoreCollection } from "@medusajs/types";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";

export default function CollectionsMenu({
  medusaCollections,
  featuredCollections,
}: {
  featuredCollections?: StoreCollection[];
  medusaCollections: StoreCollection[];
}) {
  console.log("medusaCollections", medusaCollections);
  const newestCollections = medusaCollections.map((i) => i.handle);
  const staticCollections = [
    {
      title: "Our favorites",
      description: "Discover our iconic bags.",
      handle: "new-arrivals",
      imgSrc:
        "https://gibbarosa.fra1.cdn.digitaloceanspaces.com/02_Collection.jpeg",
    },
    {
      title: "Icons: most loved",
      description: "Discover our iconic bags.",
      handle: "most-loved",
      imgSrc:
        "https://gibbarosa.fra1.cdn.digitaloceanspaces.com/04_Collection.jpeg",
    },
    {
      title: "Collector's choice",
      description: "Discover our iconic bags.",
      handle: "collectors-choice",
      imgSrc:
        "https://gibbarosa.fra1.cdn.digitaloceanspaces.com/01_Collection.jpeg",
    },
    {
      title: "Galliano Era",
      description: "Check the latest of the Galliano era.",
      handle: "galliano-era",
      imgSrc:
        "https://gibbarosa.fra1.cdn.digitaloceanspaces.com/03_Collection.jpeg",
    },
  ].map((i) => ({
    ...i,
  }));

  return (
    <Container className="grid grid-cols-4 gap-1 !px-4 lg:!px-8 !pb-6 !pt-4">
      {staticCollections.slice(0, 4).map((i) => (
        <CollectionTile
          key={i.handle}
          title={i.title}
          description={i.description}
          handle={i.handle}
          imgSrc={i.imgSrc}
        />
      ))}
    </Container>
  );
}

const CollectionTile = ({
  title,
  handle,
  imgSrc,
  description,
}: {
  title: string;
  handle: string;
  imgSrc: string;
  description?: string;
}) => {
  return (
    <Box className="group relative max-h-[220px] overflow-hidden rounded-sm">
      {/* Image with hover effect */}
      <Image
        src={imgSrc}
        alt={`${title} collection image`}
        width={400}
        height={220}
        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <Box className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content container */}
      <Box className="absolute left-0 top-0 flex h-full w-full flex-col p-6">
        <Box className="mt-auto flex flex-col gap-1.5">
          <LocalizedClientLink
            href={`/collections/${handle}`}
            className="w-max"
          >
            <Heading
              as="h3"
              className="mt-auto text-xl lg:text-2xl capitalize text-white font-medium"
            >
              {title}
            </Heading>

            {/* {description && (
              <p className="text-sm text-white/90 font-light mt-1 max-w-[90%]">
                {description}
              </p>
            )} */}
          </LocalizedClientLink>
        </Box>
      </Box>
    </Box>
  );
};
