import { ComposeIcon, TagIcon, TranslateIcon, CalendarIcon, EarthGlobeIcon, NumberIcon, CogIcon, InlineIcon } from "@sanity/icons"
import { DocumentDefinition } from "sanity"

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "pl", title: "Polish" },
  { id: "fr", title: "French" },
]

const productSchema: DocumentDefinition = {
  fields: [
    // Medusa ID field (required for sync)
    {
      name: "medusaId",
      title: "Medusa Product ID",
      type: "string",
      hidden: false,
      readOnly: true,
      group: "settings",
    },
    // Original title field (for backward compatibility)
    {
      name: "title",
      type: "string",
      group: "content",
    },
    // Localized title fields
    {
      name: "localizedTitles",
      title: "Localized Titles",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Title (${lang.title})`,
        type: "string",
      })),
    },
    // Original description field (for backward compatibility)
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      group: "content",
    },
    // Localized full descriptions
    {
      name: "localizedDescriptions",
      title: "Localized Descriptions",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Description (${lang.title})`,
        type: "text",
        rows: 5,
      })),
    },
    // Localized short descriptions
    {
      name: "localizedShortDescriptions",
      title: "Localized Short Descriptions",
      description: "A brief summary of the product (1-2 sentences)",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Short Description (${lang.title})`,
        type: "text",
        rows: 2,
        validation: Rule => Rule.max(200) // Limit to about 200 characters
      })),
    },
    // Material translations
    {
      name: "materials",
      title: "Materials (Sanity Only)",
      description: "This field is managed in Sanity and not pushed to Medusa",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Material (${lang.title})`,
        type: "string",
      })),
    },
    // Color translations
    {
      name: "colors",
      title: "Colors (Sanity Only)",
      description: "This field is managed in Sanity and not pushed to Medusa",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Color (${lang.title})`,
        type: "string",
      })),
    },
    // NEW: Condition translations
    {
      name: "condition",
      title: "Condition (Sanity Only)",
      description: "The condition of the product",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Condition (${lang.title})`,
        type: "string",
      })),
    },
    // NEW: Accessories translations
    {
      name: "accessories",
      title: "Accessories (Sanity Only)",
      description: "What accessories come with the product",
      type: "object",
      group: "localization",
      fields: languages.map(lang => ({
        name: lang.id,
        title: `Accessories (${lang.title})`,
        type: "text",
        rows: 3,
      })),
    },
    // Brand field
    {
      name: "brand",
      title: "Brand (Sanity Only)",
      description: "This field is managed in Sanity and not pushed to Medusa",
      type: "string",
      group: "details",
    },
    // NEW: Creative Director field
    {
      name: "creativeDirector",
      title: "Creative Director (Sanity Only)",
      description: "The creative director responsible for this product",
      type: "string",
      group: "details",
    },
    // Production year field
    {
      name: "productionYear",
      title: "Production Year (Sanity Only)",
      description: "This field is managed in Sanity and not pushed to Medusa", 
      type: "number",
      group: "details",
      validation: Rule => Rule.min(1900).max(new Date().getFullYear()),
    },
    // NEW: Size field
    {
      name: "size",
      title: "Size (Sanity Only)",
      description: "The size of the product",
      type: "string",
      group: "specifications",
    },
    // NEW: Dimensions field
    {
      name: "dimensions",
      title: "Dimensions (Sanity Only)",
      description: "The physical dimensions of the product (L x W x H)",
      type: "string",
      group: "specifications",
    },
    // NEW: Serial Number field
    {
      name: "serialNumber",
      title: "Serial Number (Sanity Only)",
      description: "The product's serial number or unique identifier",
      type: "string",
      group: "specifications",
    },
    // NEW: Estimated Price in EUR
    {
      name: "estimatedPriceEUR",
      title: "Estimated Price (EUR) (Sanity Only)",
      description: "The estimated value of the product in Euros",
      type: "number",
      group: "pricing",
      validation: Rule => Rule.min(0),
    },
    // NEW: Estimated Price in PLN
    {
      name: "estimatedPricePLN",
      title: "Estimated Price (PLN) (Sanity Only)",
      description: "The estimated value of the product in Polish Złoty",
      type: "number",
      group: "pricing",
      validation: Rule => Rule.min(0),
    },
    // Keep the original specs array for compatibility
    {
      group: "specifications",
      name: "specs",
      title: "Specifications",
      of: [
        {
          fields: [
            { name: "lang", title: "Language", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "content",
              rows: 3,
              title: "Content",
              type: "text",
            },
          ],
          name: "spec",
          type: "object",
        },
      ],
      type: "array",
    },
    // Keep the original addons object for compatibility
    {
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "products",
          of: [{ to: [{ type: "product" }], type: "reference" }],
          title: "Addons",
          type: "array",
          validation: (Rule) => Rule.max(3),
        },
      ],
      name: "addons",
      type: "object",
      group: "related",
    },
  ],
  name: "product",
  preview: {
    select: {
      title: "title",
      subtitle: "brand",
      description: "localizedShortDescriptions.en",
      media: "mainImage",
      year: "productionYear",
      director: "creativeDirector",
    },
    prepare({ title, subtitle, description, media, year, director }) {
      let subtitleText = "";
      
      if (subtitle) subtitleText += subtitle;
      if (director) subtitleText += subtitle ? ` • ${director}` : director;
      if (year) subtitleText += (subtitle || director) ? ` • ${year}` : year;
      
      return {
        title: title || "Untitled Product",
        subtitle: subtitleText || description || "",
        media: media || null,
      }
    },
  },
  title: "Product",
  type: "document",
  groups: [
    {
      default: true,
      icon: ComposeIcon,
      name: "content",
      title: "Content",
    },
    {
      icon: TranslateIcon,
      name: "localization",
      title: "Translations",
    },
    {
      icon: TagIcon,
      name: "details",
      title: "Product Details",
    },
    {
      icon: CogIcon,
      name: "specifications",
      title: "Specifications",
    },
    {
      icon: NumberIcon,
      name: "pricing",
      title: "Pricing",
    },
    {
      name: "related",
      title: "Related Products",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
}

export default productSchema