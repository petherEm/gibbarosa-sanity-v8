import { client } from '../client'

export async function getProductByMedusaId(id: string) {
  if (!id) {
    return null
  }

  try {
    const product = await client.fetch(
      `*[_type == "product" && medusaId == $id][0]{
        _id,
        title,
        medusaId,
        brand,
        productionYear,
        description,
        creativeDirector,
        size,
        dimensions,
        serialNumber,
        estimatedPriceEUR,
        estimatedPricePLN,
        "localizedTitles": localizedTitles,
        "localizedDescriptions": localizedDescriptions,
        "localizedShortDescriptions": localizedShortDescriptions,
        "materials": materials,
        "colors": colors,
        "condition": condition,
        "accessories": accessories,
        "specs": specs
      }`,
      { id }
    )

    return product
  } catch (error) {
    console.error('Error fetching product by Medusa ID:', error)
    return null
  }
}