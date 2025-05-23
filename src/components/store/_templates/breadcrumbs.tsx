import React from "react";

import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator,
  BreadcrumbsStatic,
} from "@/components/shared/breadcrumbs";
import { ArrowLeftIcon } from "@/components/shared/icons";

export default function StoreBreadcrumbs({
  breadcrumb,
}: {
  breadcrumb?: string;
}) {
  return (
    <>
      <Breadcrumbs className="text-basic-primary">
        <BreadcrumbsList className="hidden small:flex">
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home Page</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsStatic>{breadcrumb ?? "Store"}</BreadcrumbsStatic>
          </BreadcrumbsItem>
        </BreadcrumbsList>
        <BreadcrumbsList className="flex small:hidden">
          <BreadcrumbsItem>
            <BreadcrumbsLink
              href="/"
              className="flex items-center gap-2 text-md"
            >
              <ArrowLeftIcon className="h-[18px] w-[18px]" />
              Back to Home Page
            </BreadcrumbsLink>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </>
  );
}
