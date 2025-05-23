import React from "react";

import { cn } from "@/lib/util/cn";
import { cva } from "cva";

const containerVariants = cva({
  base: "small:px-14 small:py-4 mx-auto box-content px-4 py-4",
  variants: {
    maxWidth: {
      sm: "max-w-[600px]",
      md: "max-w-[900px]",
      lg: "max-w-[1328px]",
      xl: "max-w-[1440px]",
      xxl: "max-w-[1536px]",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    maxWidth: "lg",
  },
});

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "xxl" | "full";
  children: React.ReactNode;
};

export function Container<T extends React.ElementType = "div">({
  as,
  maxWidth,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) {
  const Component = as ?? ("div" as React.ElementType);

  return (
    <Component className={cn(containerVariants({ maxWidth }), className)}>
      {children}
    </Component>
  );
}
