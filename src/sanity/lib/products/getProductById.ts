import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductById = async (id: string) => {
    const PRODUCT_QUERY = defineQuery(`
      *[_type == "product" && _id == $id][0] {
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
        const product = await sanityFetch({
            query: PRODUCT_QUERY,
            params: { id }
        });
        return product || null;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}`, error);
        return null;
    }
}