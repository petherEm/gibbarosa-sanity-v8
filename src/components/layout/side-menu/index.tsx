"use client";

import React, { Fragment, useMemo, useState } from "react";
import Image from "next/image";

import {
  ArrowLeftIcon,
  BarsIcon,
  ChevronRightIcon,
  XIcon,
} from "@/components/shared/icons";
import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog";
import Divider from "@/components/shared/divider";
import { Heading } from "@/components/shared/heading";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import { createNavigation } from "@/lib/constants";
import { StoreCollection, StoreProductCategory } from "@medusajs/types";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CollectionsData } from "@/types/strapi";
import RegionSwitcher from "../_templates/nav/region-switcher";

interface CategoryItem {
  name: string;
  handle: string;
}

function getLocalizedText(item: any, countryCode: string) {
  if (!item?.metadata) return item.name;

  const code = countryCode.toUpperCase();
  return item.metadata[code] || item.metadata["EN"] || item.name;
}

const SideMenu = ({
  productCategories,
  collections,
  countryCode, // Add countryCode prop
}: {
  productCategories: StoreProductCategory[];
  collections: StoreCollection[];
  featuredCollections?: CollectionsData;
  countryCode: string; // Add type for countryCode
}) => {
  const [categoryStack, setCategoryStack] = useState<CategoryItem[]>([]);
  const currentCategory = categoryStack[categoryStack.length - 1] || null;
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useMemo(
    () => createNavigation(productCategories, collections),
    [productCategories, collections]
  );

  const handleCategoryClick = (category: CategoryItem) => {
    setCategoryStack([
      ...categoryStack,
      { name: category.name, handle: category.handle },
    ]);
  };

  const handleBack = () => {
    setCategoryStack(categoryStack.slice(0, -1));
  };

  const handleOpenDialogChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setCategoryStack([]);
    }
  };

  const renderCategories = (categories: any[]) => {
    return categories.map((item, index) => {
      const hasChildren =
        item.category_children && item.category_children.length > 0;

      const lastCategoryIndex = categories.findLastIndex(
        (cat) => cat.type === "parent_category"
      );

      const strapiCollection = collections.find(
        (collection) => collection.handle === item.handle
      );

      return item.type === "collection" && strapiCollection ? (
        <LocalizedClientLink
          key={index}
          href={item.handle}
          className="relative mb-2"
          onClick={() => handleOpenDialogChange(false)}
        >
          <Image
            src=""
            alt="alt"
            width={600}
            height={160}
            className="h-[160px] w-full object-cover"
          />
          <Box className="absolute bottom-6 left-6">
            <Heading as="h3" className="text-2xl text-static capitalize">
              {getLocalizedText(strapiCollection, countryCode)}
            </Heading>
          </Box>
        </LocalizedClientLink>
      ) : (
        <Fragment key={index}>
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={
              hasChildren
                ? () =>
                    handleCategoryClick({
                      name: item.name,
                      handle: item.handle,
                    })
                : () => handleOpenDialogChange(false)
            }
            asChild={!hasChildren}
          >
            {hasChildren ? (
              <>
                <span className="flex items-center gap-4 capitalize">
                  {item.icon && item.icon}
                  {getLocalizedText(item, countryCode)}
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </>
            ) : (
              <LocalizedClientLink href={item.handle}>
                <span className="flex items-center gap-4 capitalize">
                  {item.icon && item.icon}
                  {getLocalizedText(item, countryCode)}
                </span>
              </LocalizedClientLink>
            )}
          </Button>
          {index === lastCategoryIndex && (
            <Divider className="my-4 -ml-4 w-[calc(100%+2rem)]" />
          )}
        </Fragment>
      );
    });
  };

  const getActiveCategories = () => {
    let currentCategories = [
      ...(navigation[0]?.category_children || []),
      ...navigation.slice(1),
    ];

    for (const category of categoryStack) {
      const found = currentCategories.find(
        (item) => item.name === category.name
      );
      if (found?.category_children) {
        // @ts-ignore
        currentCategories = found.category_children.map((category) => ({
          ...category,
          icon: null,
        }));
      } else {
        break;
      }
    }
    return currentCategories;
  };

  const shouldRenderButton =
    !currentCategory || currentCategory.name !== "Collections";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="icon"
          withIcon
          className="flex h-auto !p-2 xsmall:!p-3.5 large:hidden"
        >
          <BarsIcon />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="!max-h-full !max-w-full !rounded-none"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center gap-4 !p-4 text-xl text-basic-primary small:text-2xl">
            {currentCategory && (
              <Button variant="tonal" withIcon size="sm" onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            )}
            {currentCategory
              ? getLocalizedText(currentCategory, countryCode)
              : "Menu"}
            <Button
              onClick={() => handleOpenDialogChange(false)}
              variant="icon"
              withIcon
              size="sm"
              className="ml-auto p-2"
            >
              <XIcon />
            </Button>
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Menu modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="overflow-y-auto p-4 small:p-5">
            {/* Region Switcher at the top */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Region & Language</span>
                <RegionSwitcher />
              </div>
            </div>

            <Box className="flex flex-col">
              {shouldRenderButton && (
                <Button
                  variant="tonal"
                  className="mb-4 w-max"
                  size="sm"
                  onClick={() => handleOpenDialogChange(false)}
                  asChild={!!currentCategory}
                >
                  <LocalizedClientLink
                    href={
                      currentCategory ? `${currentCategory.handle}` : `/store`
                    }
                  >
                    Shop all{" "}
                    {currentCategory && currentCategory.name !== "Shop"
                      ? currentCategory.name
                      : ""}
                  </LocalizedClientLink>
                </Button>
              )}
              {renderCategories(getActiveCategories())}
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default SideMenu;
