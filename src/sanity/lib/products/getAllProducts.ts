import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
      *[_type == "product"] | order(title asc) {
        _id,
        _type,
        title,
        medusaId,
        localizedTitle {
          EN,
          PL,
          FR
        },
        shortDescription {
          EN,
          PL,
          FR
        },
        condition {
          value,
          EN {
            label,
            description
          },
          PL {
            label,
            description
          },
          FR {
            label,
            description
          }
        },
        color {
          colorCode,
          EN,
          PL,
          FR
        },
        material {
          EN,
          PL,
          FR
        },
        accessories {
          EN,
          PL,
          FR
        },
        specs[] {
          _key,
          lang,
          title,
          content
        },
        addons {
          title,
          products[]-> {
            _id,
            title,
            medusaId
          }
        }
      }
    `);
    
    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });
        return products || [];
    } catch (error) {
        console.error("Error fetching all products", error);
        return [];
    }
}
