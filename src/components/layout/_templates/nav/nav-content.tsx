"use client";

import Image from "next/image";
import { useState } from "react";
import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { SearchIcon } from "@/components/shared/icons";
import SideMenu from "@/components/layout/side-menu";
import { SearchDialog } from "@/components/search/search-dialog";
import SearchDropdown from "@/components/search/search-dropdown";
import Navigation from "./navigation";
import RegionSwitcher from "./region-switcher";

interface NavContentProps {
  productCategories: any;
  collections: any;
  featuredCollections: any;
  countryCode: string;
  products: any;
}

export default function NavContent({
  productCategories,
  collections,
  featuredCollections,
  countryCode,
  products,
}: NavContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Box className="flex large:hidden">
        <SideMenu
          productCategories={productCategories}
          collections={collections}
          featuredCollections={featuredCollections}
          countryCode={countryCode}
        />
      </Box>
      <LocalizedClientLink href="/" className="mr-8">
        {/* <h1 className="font-staatliches mr-4 text-3xl small:text-4xl medium:text-4xl large:text-5xl/">
          Gibbarosa
        </h1> */}
        <Image
          src="/gibbarosa-logo.avif"
          alt="Gibbarosa Logo"
          width={150}
          height={100}
        />
      </LocalizedClientLink>
      {!isSearchOpen && (
        <Navigation
          countryCode={countryCode}
          productCategories={productCategories}
          collections={collections}
          featuredCollections={collections}
        />
      )}
      {isSearchOpen && (
        <SearchDropdown
          setIsOpen={setIsSearchOpen}
          recommendedProducts={products}
          isOpen={isSearchOpen}
          countryCode={countryCode}
        />
      )}
      <SearchDialog
        recommendedProducts={products}
        countryCode={countryCode}
        isOpen={isSearchOpen}
        handleOpenDialogChange={setIsSearchOpen}
      />

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden large:block">
          <RegionSwitcher />
        </div>
        {!isSearchOpen && (
          <Button
            variant="icon"
            withIcon
            className="h-auto !p-2 xsmall:!p-3.5"
            onClick={() => setIsSearchOpen(true)}
            data-testid="search-button"
          >
            <SearchIcon />
          </Button>
        )}
      </div>
    </>
  );
}
