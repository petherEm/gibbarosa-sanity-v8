import React from "react";

import { CreditCard } from "@medusajs/icons";
import { StoreCollection, StoreProductCategory } from "@medusajs/types";
import {
  BancontactIcon,
  BlikIcon,
  IdealIcon,
  PayPalIcon,
  Przelewy24Icon,
  StripeIcon,
} from "@/components/shared/icons";

// Product filters
export const FILTER_KEYS = {
  ORDER_BY_KEY: "sort_by",
  PRICE_KEY: "price",
  MATERIAL_KEY: "material",
  TYPE_KEY: "type",
  COLLECTION_KEY: "collection",
};

export const PRODUCT_LIST_PATHNAMES = {
  CATEGORY: "/categories",
  COLLECTION: "/collections",
  EXPLORE: "/store",
  SEARCH: "/results",
} as const;

export const blogSortOptions = [
  {
    value: "desc",
    label: "Newest",
  },
  {
    value: "asc",
    label: "Oldest",
  },
];

export const storeSortOptions = [
  {
    value: "relevance",
    label: "Relevance",
  },
  {
    value: "created_at",
    label: "New in",
  },
  {
    value: "price_asc",
    label: "Price: Low-High",
  },
  {
    value: "price_desc",
    label: "Price: High-Low",
  },
];
/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  card: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  ideal: {
    title: "iDeal",
    icon: <CreditCard />,
  },
  bancontact: {
    title: "Bancontact",
    icon: <CreditCard />,
  },
  paypal: {
    title: "PayPal",
    icon: <CreditCard />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_");
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal");
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];

export const passwordRequirements = [
  "At least 8 characters",
  "One lowercase letter",
  "One uppercase letter",
  "One number or symbol",
];

export const createNavigation = (
  productCategories: StoreProductCategory[],
  collections?: StoreCollection[]
) => [
  {
    name: "New In",
    handle: "/new",
    metadata: {
      EN: "New In",
      FR: "Nouveautés",
      PL: "Nowości",
    },
    category_children: null,
  },
  {
    name: "Shop",
    handle: "/shop",
    metadata: {
      EN: "Shop",
      FR: "Boutique",
      PL: "Sklep",
    },
    category_children: productCategories
      .filter((category) => !category.parent_category)
      .map((category) => ({
        name: category.name,
        type: "parent_category",
        handle: `/categories/${category.handle}`,
        metadata: category.metadata,
        category_children: category.category_children.map((subCategory) => ({
          name: subCategory.name,
          handle: `/categories/${subCategory.handle}`,
          metadata: subCategory.metadata,
          icon: null,
          category_children: null,
        })),
      })),
  },
  {
    name: "Collections",
    handle: "/shop",
    metadata: {
      EN: "Collections",
      FR: "Collections",
      PL: "Kolekcje",
    },
    category_children: !collections
      ? null
      : collections.map((collection) => ({
          name: collection.title,
          type: "collection",
          handle: `/collections/${collection.handle}`,
          handle_id: collection.handle,
          metadata: collection.metadata,
          category_children: null,
        })),
  },
  {
    name: "About Us",
    handle: "/about-us",
    metadata: {
      EN: "About Us",
      FR: "À Propos",
      PL: "O Nas",
    },
    category_children: null,
  },
  {
    name: "Brands",
    handle: "/brands",
    metadata: {
      EN: "Brands",
      FR: "Marques",
      PL: "Marki",
    },
    category_children: null,
  },
];

export const createFooterNavigation = (
  productCategories: StoreProductCategory[]
) => {
  return {
    navigation: [
      {
        header: "Categories",
        headerMetadata: {
          EN: "Categories",
          FR: "Catégories",
          PL: "Kategorie",
        },
        links: [
          ...productCategories
            .filter((category) => !category.parent_category)
            .slice(0, 5)
            .map((category) => ({
              title: category.name,
              href: `/categories/${category.handle}`,
              metadata: category.metadata,
            })),
        ],
      },
      {
        header: "Orders",
        headerMetadata: {
          EN: "Orders",
          FR: "Commandes",
          PL: "Zamówienia",
        },
        links: [
          {
            title: "Orders and delivery",
            href: "/terms-and-conditions",
            metadata: {
              EN: "Orders and delivery",
              FR: "Commandes et livraison",
              PL: "Zamówienia i dostawa",
            },
          },
          {
            title: "Returns and refunds",
            href: "/terms-and-conditions",
            metadata: {
              EN: "Returns and refunds",
              FR: "Retours et remboursements",
              PL: "Zwroty i refundacje",
            },
          },
          {
            title: "Payment and pricing",
            href: "/terms-and-conditions",
            metadata: {
              EN: "Payment and pricing",
              FR: "Paiement et tarification",
              PL: "Płatności i ceny",
            },
          },
        ],
      },
      {
        header: "About",
        headerMetadata: {
          EN: "About",
          FR: "À propos",
          PL: "O nas",
        },
        links: [
          {
            title: "About us",
            href: "/about-us",
            metadata: {
              EN: "About us",
              FR: "À propos de nous",
              PL: "O nas",
            },
          },
          {
            title: "Blog",
            href: "/blog",
            metadata: {
              EN: "Blog",
              FR: "Blog",
              PL: "Blog",
            },
          },
          {
            title: "Careers",
            href: "#",
            metadata: {
              EN: "Careers",
              FR: "Carrières",
              PL: "Kariera",
            },
          },
        ],
      },
      {
        header: "Need help?",
        headerMetadata: {
          EN: "Need help?",
          FR: "Besoin d'aide?",
          PL: "Potrzebujesz pomocy?",
        },
        links: [
          {
            title: "FAQs",
            href: "/faq",
            metadata: {
              EN: "FAQs",
              FR: "FAQs",
              PL: "FAQ",
            },
          },
          {
            title: "Support center",
            href: "#",
            metadata: {
              EN: "Support center",
              FR: "Centre d'aide",
              PL: "Centrum pomocy",
            },
          },
          {
            title: "Contact us",
            href: "#",
            metadata: {
              EN: "Contact us",
              FR: "Contactez-nous",
              PL: "Kontakt",
            },
          },
        ],
      },
    ],
    contact: {
      header: "Let's stay in touch",
      headerMetadata: {
        EN: "Let's stay in touch",
        FR: "Restons en contact",
        PL: "Bądźmy w kontakcie",
      },
      text: "Keep up to date with the latest product launches and news. Find out more about our brands and get special promo codes.",
      textMetadata: {
        EN: "Keep up to date with the latest product launches and news. Find out more about our brands and get special promo codes.",
        FR: "Tenez-vous au courant des derniers lancements de produits et des actualités. En savoir plus sur nos marques et obtenir des codes promo spéciaux.",
        PL: "Bądź na bieżąco z najnowszymi premierami produktów i wiadomościami. Dowiedz się więcej o naszych markach i otrzymaj specjalne kody promocyjne.",
      },
    },
    other: [
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        metadata: {
          EN: "Privacy Policy",
          FR: "Politique de confidentialité",
          PL: "Polityka prywatności",
        },
      },
      {
        title: "Terms & Conditions",
        href: "/terms-and-conditions",
        metadata: {
          EN: "Terms & Conditions",
          FR: "Termes et conditions",
          PL: "Regulamin",
        },
      },
    ],
  };
};

export const checkoutFooterNavigation = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
];

export const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);
