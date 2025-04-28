import { Metadata } from "next";
import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import StoreBreadcrumbs from "@/components/store/_templates/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how we collect, use, and protect your personal information when you interact with our website, products and services.",
};

export default async function PrivacyPolicyPage() {
  return (
    <Container className="min-h-screen max-w-full bg-secondary !p-0">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Privacy Policy" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          Privacy Policy
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            Privacy Policy
          </Box>
          <Box className="col-span-12 -mt-6 space-y-10 small:-mt-12 medium:col-span-8 medium:col-start-5">
            Work in progress...
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
