"use client";

import { useCallback, useEffect, useState } from "react";
import { Box } from "@/components/shared/box";
import { Heading } from "@/components/shared/heading";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselWrapperProps {
  children: React.ReactNode;
  productsCount: number;
}

export default function CarouselWrapper({
  children,
  productsCount,
}: CarouselWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    loop: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const isLessThanFourProducts = productsCount < 4;
  const isLessThanThreeProducts = productsCount < 3;
  const isLessThanTwoProducts = productsCount < 2;

  return (
    <>
      <div ref={emblaRef}>{children}</div>
    </>
  );
}
