import Image from "next/image";
import { Button } from "@/components/shared/button";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { Container } from "@/components/shared/container";
import { ArrowRightIcon } from "@/components/shared/icons";

type Dictionary = {
  hero: {
    title: string;
    subtitle: string;
    button: string;
  };
};

interface HeroProps {
  dict: Dictionary;
}

const Hero = ({ dict }: HeroProps) => {
  return (
    <section className="relative w-full overflow-x-hidden">
      <div className="flex flex-col large:flex-row">
        {/* Image - Now first on mobile by default */}
        <div className="relative h-[60vh] w-full overflow-hidden min-h-[40vh] small:w-full medium:h-[50vh] medium:w-full large:order-2 large:h-[580px] large:w-1/2 large:translate-x-0">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/hero_1.png"
            alt="Luxury second-hand fashion hero image"
            fill
            priority
            quality={100}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Text content - Second on mobile by default */}
        <Container className="w-full large:w-1/2">
          <div className="flex w-full items-start px-4 pt-12 min-h-[40vh] p-2 medium:min-h-[50vh] medium:w-full medium:p-4 large:order-1 large:px-8 large:pt-20">
            <div className="flex flex-col items-start gap-6 py-8 small:gap-6 medium:gap-4 large:gap-6">
              <h1 className="large:w-2/3 text-4xl font-semibold small:text-4xl medium:text-5xl large:text-5xl xl:text-[54px]">
                {dict.hero.title}
              </h1>
              <p className="large:w-2/3 text-base font-light small:text-lg medium:text-[18px] large:text-[18px]">
                {dict.hero.subtitle}
              </p>
              <Button
                asChild
                variant="ghost"
                className="p-0 text-lg transition-colors hover:bg-transparent small:text-[18px] group"
              >
                <LocalizedClientLink
                  href="/shop"
                  className="!px-0 !py-3 text-left inline-flex items-center"
                >
                  <span className="relative inline-flex items-center">
                    {dict.hero.button}
                    <ArrowRightIcon className="ml-1" />
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current transform-gpu transition-all duration-200 group-hover:bottom-[-6px] w-full"></span>
                  </span>
                </LocalizedClientLink>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
