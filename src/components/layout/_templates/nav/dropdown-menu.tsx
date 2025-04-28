import React from "react";
import { cn } from "@/lib/util/cn";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { NavigationItem } from "@/components/shared/navigation-item";

interface CategoryItem {
  name: string;
  handle: string;
  category_children?: CategoryItem[];
}

interface DropdownMenuProps {
  item: CategoryItem;
  activeItem: {
    name: string;
    handle: string;
  };
  children: React.ReactNode;
  customContent?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  activeItem,
  children,
  customContent,
  isOpen,
  onOpenChange,
}) => {
  const renderSubcategories = (categories: CategoryItem[]) => (
    <Container className="flex flex-col gap-6 !px-14 !pb-8 !pt-5">
      <div className="grid grid-cols-4 gap-8">
        {/* Products Column */}
        <div className="flex flex-col gap-2">
          <Heading className="mb-2 font-medium text-lg" as="h3">
            Products
          </Heading>

          {/* Shop All Link */}
          <NavigationItem
            href={`${activeItem?.handle ?? "/"}`}
            className="w-max py-1.5 text-md !duration-150 hover:text-action-primary capitalize"
            onClick={() => onOpenChange(false)}
          >
            Shop all{" "}
            {activeItem?.name === "Shop" || activeItem?.name === "Collections"
              ? ""
              : activeItem?.name}
          </NavigationItem>

          {/* Category Links */}
          {categories.map((subItem, index) => (
            <React.Fragment key={index}>
              <NavigationItem
                href={subItem.handle}
                className="w-max py-1.5 text-md !duration-150 hover:text-action-primary capitalize"
              >
                {subItem.name}
              </NavigationItem>

              {/* Subcategory Links - Indented */}
              {subItem.category_children && (
                <div className="flex flex-col pl-4">
                  {subItem.category_children.map((childItem, childIndex) => (
                    <NavigationItem
                      key={childIndex}
                      href={childItem.handle}
                      className="py-1.5 text-sm text-secondary hover:text-action-primary"
                    >
                      {childItem.name}
                    </NavigationItem>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Empty columns to maintain grid structure */}
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
      </div>
    </Container>
  );

  return (
    <div
      className="flex"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      {children}
      {item.category_children && (
        <Box
          className={cn(
            "absolute left-0 top-full z-50 w-full translate-y-0 bg-primary shadow-lg transition-all duration-300",
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none invisible opacity-0"
          )}
        >
          {customContent ?? renderSubcategories(item.category_children)}
        </Box>
      )}
    </div>
  );
};

export default DropdownMenu;
