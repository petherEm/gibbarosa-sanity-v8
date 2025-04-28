import { Metadata } from "next";

import { Box } from "@/components/shared/box";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { FAQAccordion } from "@/components/content/faq-accordion";
import SidebarBookmarks from "@/components/content/sidebar-bookmarks";
import StoreBreadcrumbs from "@/components/store/_templates/breadcrumbs";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find quick answers to common questions about our products/services.",
};

export default async function FAQPage() {
  const {
    data: { FAQSection },
  } = await getFAQ();

  const bookmarks = FAQSection.map((section) => {
    return {
      id: section.Bookmark,
      label: section.Title,
    };
  });

  return (
    <Container className="min-h-screen max-w-full bg-secondary !p-0">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Frequently asked questions" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          Frequently asked questions
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            <SidebarBookmarks data={bookmarks} />
          </Box>

          <Box className="col-span-12 space-y-10 medium:col-span-8 medium:col-start-5">
            {FAQSection.map((section, id) => (
              <FAQAccordion key={id} data={section} />
            ))}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
