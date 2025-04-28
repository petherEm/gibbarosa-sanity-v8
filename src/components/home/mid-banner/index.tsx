import Image from "next/image";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { ArrowRightIcon } from "@/components/shared/icons";

type Dictionary = {
  midBanner: {
    title: string;
    subtitle: string;
    button: string;
  };
};

type MidBannerProps = {
  dict: Dictionary;
};

const MidBanner = ({ dict }: MidBannerProps) => {
  return (
    <Container className="mt-6 small:mt-10 mx-auto px-4 overflow-hidden">
      <div className="flex flex-col gap-8 medium:flex-row medium:gap-x-10 medium:items-center">
        <div className="order-2 medium:order-1 medium:w-1/2">
          <div className="flex flex-col medium:justify-center">
            <h1 className="text-3xl font-semibold medium:text-4xl large:text-5xl">
              {dict.midBanner.title}
            </h1>
            <p className="mt-4 text-base small:w-2/3 font-light medium:text-lg large:text-[18px]">
              {dict.midBanner.subtitle}
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
                  {dict.midBanner.button}
                  <ArrowRightIcon className="ml-1" />
                  <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current transform-gpu transition-all duration-200 group-hover:bottom-[-6px] w-full"></span>
                </span>
              </LocalizedClientLink>
            </Button>
          </div>
        </div>

        <div className="order-1 medium:order-2 medium:w-1/2">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/laying_lady_2.png"
              alt="hero"
              fill
              priority
              quality={100}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MidBanner;
