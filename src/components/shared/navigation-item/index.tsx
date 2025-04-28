import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/util/cn";
import { Slot } from "@/lib/util/slot";
import { cva, VariantProps } from "cva";

const NavigationItemVariants = cva({
  base: "hover:text-action-primary-hover transition-all duration-200 ease-in-out whitespace-nowrap px-3",
  variants: {
    variant: {
      primary:
        "text-xs xsmall:text-xs small:text-xs medium:text-xs large:text-sm text-black",
      secondary: "text-md text-black",
    },
    disabled: {
      true: "pointer-events-none text-disabled opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface NavigationItemProps
  extends ComponentProps<"a">,
    VariantProps<typeof NavigationItemVariants> {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}

export function NavigationItem({
  className,
  children,
  asChild,
  disabled,
  variant,
  ...props
}: NavigationItemProps) {
  const Comp = asChild ? Slot : "a";

  const disabledProps = disabled
    ? {
        "aria-disabled": true,
        tabIndex: -1,
      }
    : {};

  return (
    <Comp
      {...props}
      {...disabledProps}
      className={cn(NavigationItemVariants({ variant, disabled }), className)}
    >
      {children}
    </Comp>
  );
}

NavigationItem.displayName = "NavigationItem";
