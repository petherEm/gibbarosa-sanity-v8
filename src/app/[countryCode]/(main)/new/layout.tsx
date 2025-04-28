import { Metadata } from "next";

import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import StoreBreadcrumbs from "@/components/store/_templates/breadcrumbs";

interface StorePageLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "New-In products",
  description: "Explore our latest products.",
};

export default function NewPageLayout({ children }: StorePageLayoutProps) {
  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            New in
          </Heading>
        </Box>
      </Container>
      {children}
    </>
  );
}
