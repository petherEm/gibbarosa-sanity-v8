import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { createFooterNavigation } from "@/lib/constants";
import { getCategoriesList } from "@/lib/data/categories";
import { cn } from "@/lib/util/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { NavigationItem } from "@/components/shared/navigation-item";
import { Text } from "@/components/shared/text";
import {
  ChevronDownIcon,
  FacebookIcon,
  LinkedinIcon,
  XLogoIcon,
} from "@/components/shared/icons";

function SocialMedia({ className }: { className?: string }) {
  return (
    <Box className={cn("flex gap-4", className)}>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/10 text-black transition-all hover:bg-black/20">
        <LocalizedClientLink href="#">
          <LinkedinIcon className="h-5 w-5" />
        </LocalizedClientLink>
      </div>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/10 text-black transition-all hover:bg-black/20">
        <LocalizedClientLink href="#">
          <FacebookIcon className="h-5 w-5" />
        </LocalizedClientLink>
      </div>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/10 text-black transition-all hover:bg-black/20">
        <LocalizedClientLink href="#">
          <XLogoIcon className="h-5 w-5" />
        </LocalizedClientLink>
      </div>
    </Box>
  );
}

function getLocalizedText(
  item: any,
  countryCode: string,
  field: string = "metadata"
) {
  if (!item?.[field]) return item.title || item.header;

  const code = countryCode.toUpperCase();
  // If the requested language doesn't exist, fall back to English
  const text =
    item[field][code] || item[field]["EN"] || item.title || item.header;

  // Capitalize first letter only, not the entire string
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default async function Footer({ countryCode }: { countryCode: string }) {
  // Fetch dictionary based on country code
  const dict = await getDictionary(countryCode);
  const { product_categories } = await getCategoriesList();
  const footerNavigation = createFooterNavigation(product_categories);

  return (
    <Container
      as="footer"
      maxWidth="xxl"
      className="mx-0 max-w-full border-t border-basic-primary bg-[#FF6943] px-0 py-0 small:px-0 small:py-0"
    >
      <Container className="flex flex-col gap-8 py-10 text-black small:py-16 small:gap-16">
        <Box className="flex flex-col gap-10 small:gap-14 large:flex-row large:gap-16 xl:gap-20">
          {/* Left Column - Brand Information - 1/3 width */}
          <Box className="flex flex-col gap-6 justify-between large:w-1/3">
            <LocalizedClientLink
              href="#"
              className="w-max cursor-pointer text-black"
            >
              <Image
                src="/gibbarosa-logo.avif"
                alt="Gibbarosa Logo"
                width={150}
                height={100}
              />
            </LocalizedClientLink>
            <p className="font-light medium:text-lg large:text-[18px] mt-2 mb-4">
              {dict.footer.tagline}
            </p>
            <p className="text-sm w-full small:w-11/12 font-light text-black/80 leading-relaxed">
              {dict.footer.disclaimer}
            </p>
            <SocialMedia className="hidden mt-4 large:flex" />
          </Box>

          {/* Desktop Navigation Sections - 2/3 width */}
          <Box className="hidden shrink grow gap-8 grid-cols-3 small:grid large:w-2/3 xl:gap-10">
            {footerNavigation.navigation.map((item, id) => {
              return (
                <Box
                  key={`footerSection-${id}`}
                  className="flex flex-col gap-4"
                >
                  <Heading className="mb-1 text-lg font-medium" as="h3">
                    {getLocalizedText(item, countryCode, "headerMetadata")}
                  </Heading>
                  <Box className="flex flex-col gap-3">
                    {item.links.map((link, linkId) => {
                      return (
                        <NavigationItem
                          href={`/${countryCode}${link.href}`}
                          key={`${id}-navigationItem-${linkId}`}
                          variant="secondary"
                          className="w-max hover:text-black/70 font-light transition-colors"
                        >
                          {getLocalizedText(link, countryCode)}
                        </NavigationItem>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Mobile Accordion */}
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-2 small:hidden"
          >
            {footerNavigation.navigation.map((item, id) => {
              return (
                <AccordionItem
                  value={`item-${id}`}
                  key={id}
                  className="border-t border-black/10 py-2"
                >
                  <AccordionTrigger className="py-3 transition-all [&[data-state=open]>#chevronDownSvg]:rotate-180">
                    <Heading
                      className="text-md font-medium text-black small:text-lg"
                      as="h3"
                    >
                      {getLocalizedText(item, countryCode, "headerMetadata")}
                    </Heading>
                    <div
                      id="chevronDownSvg"
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-static duration-200 ease-in-out"
                    >
                      <ChevronDownIcon />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-3 py-2 pl-2">
                    {item.links.map((link, linkId) => {
                      return (
                        <NavigationItem
                          href={link.href}
                          key={`${id}-navigationItem-${linkId}`}
                          variant="secondary"
                          className="font-light hover:text-black/70"
                        >
                          {getLocalizedText(link, countryCode)}
                        </NavigationItem>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Mobile Social Media */}
          <SocialMedia className="flex mt-4 small:mt-6 large:hidden" />
        </Box>

        <Divider
          alignment="horizontal"
          variant="secondary"
          className="bg-black/10 mt-2 small:mt-4"
        />

        {/* Bottom Section */}
        <Box className="flex flex-col gap-6 small:flex-row small:items-center small:justify-between">
          <Box className="flex flex-wrap gap-6 gap-y-2">
            <Text size="sm" className="text-black/80 font-light">
              {dict.footer.copyright.replace(
                "{year}",
                new Date().getFullYear().toString()
              )}
            </Text>
            <Box className="flex flex-wrap gap-6">
              {footerNavigation.other.map((link, id) => (
                <NavigationItem
                  key={`other-${id}`}
                  variant="secondary"
                  className="text-sm font-light text-black/80 hover:text-black transition-colors"
                  href={link.href}
                >
                  {getLocalizedText(link, countryCode)}
                </NavigationItem>
              ))}
            </Box>
          </Box>

          <Text size="sm" className="text-center font-light text-black/80">
            {dict.footer.credit}
          </Text>
        </Box>
      </Container>
    </Container>
  );
}
