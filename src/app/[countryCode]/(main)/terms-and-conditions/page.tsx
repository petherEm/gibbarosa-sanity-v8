import { Metadata } from "next";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import StoreBreadcrumbs from "@/components/store/_templates/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms governing the use of our website, products and services, including user responsibilities, legal rights, and policies.",
};

export default async function TermsAndConditionsPage() {
  return (
    <Container className="min-h-screen max-w-full bg-secondary !p-0">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Terms & Conditions" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          Terms & Conditions
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            Terms & Conditions
          </Box>
          <Box className="col-span-12 space-y-10 medium:col-span-8 medium:col-start-5">
            Work in progress...
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
