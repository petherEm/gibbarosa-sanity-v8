import Image from "next/image";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { ArrowRightIcon } from "@/components/shared/icons";

type Dictionary = {
  ourStoryShort: {
    title: string;
    text_1: string;
    text_2: string;
    button: string;
  };
};

interface SubHeroProps {
  dict: Dictionary;
}

const SubHero = ({ dict }: SubHeroProps) => {
  return (
    <Container className="mt-6 small:mt-10 mx-auto px-4 overflow-hidden">
      <div className="flex flex-col gap-8 medium:flex-row medium:gap-x-10 medium:items-start">
        {/* Left Image Container */}
        <div className="medium:w-1/2">
          <div className="relative aspect-[4/5] w-full max-w-[600px]">
            <Image
              src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Sub-hero_1.png"
              alt="hero"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
            />
          </div>
        </div>

        {/* Text Container */}
        <div className="medium:w-1/2">
          <div className="flex flex-col gap-6 medium:gap-8 medium:h-full medium:max-h-[calc(125vh*4/5)] medium:justify-between">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold medium:text-4xl large:text-5xl">
                {dict.ourStoryShort.title}
              </h1>
              <p className="text-base small:w-2/3 font-light medium:text-lg large:text-[18px]">
                {dict.ourStoryShort.text_1}
              </p>
            </div>

            <div className="flex justify-start">
              <div className="relative aspect-[3/4] w-1/2 max-w-[280px]">
                <Image
                  src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/aboutus.png"
                  alt="About us image 1"
                  fill
                  priority
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 289px"
                />
              </div>
              <div className="relative aspect-[3/4] w-1/2 max-w-[280px]">
                <Image
                  src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/aboutus_3.png"
                  alt="About us image 2"
                  fill
                  priority
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 289px"
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base small:w-2/3 font-light medium:text-lg large:text-[18px]">
                {dict.ourStoryShort.text_2}
              </p>
              <Button
                asChild
                variant="ghost"
                className="mt-2 p-0 text-lg transition-colors hover:bg-transparent small:text-[18px] group self-start"
              >
                <LocalizedClientLink
                  href="/about-us"
                  className="!px-0 !py-3 text-left inline-flex items-center"
                >
                  <span className="relative inline-flex items-center">
                    {dict.ourStoryShort.button}
                    <ArrowRightIcon className="ml-1" />
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current transform-gpu transition-all duration-200 group-hover:bottom-[-6px] w-full"></span>
                  </span>
                </LocalizedClientLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SubHero;
