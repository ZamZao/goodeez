import { prisma } from '@/lib/prisma'
import { Product } from '@/lib/utils/types'
import { unstable_cache } from 'next/cache'

export const getProductCatalog = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await prisma.product.findMany()
    return products.map(p => ({
      ...p,
      description: p.description || undefined,
      category: p.category || undefined,
      collectionId: p.collectionId || undefined,
      tags: []
    }))
  },
  ['product-catalog'],
  { revalidate: 3600, tags: ['products'] }
)

export const getProductById = unstable_cache(
  async (id: string): Promise<Product | undefined> => {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return undefined
    return {
      ...product,
      description: product.description || undefined,
      category: product.category || undefined,
      collectionId: product.collectionId || undefined,
      tags: []
    }
  },
  ['product-by-id'],
  { revalidate: 3600, tags: ['products'] }
)

export const getProductsByCategory = unstable_cache(
  async (category: string): Promise<Product[]> => {
    const products = await prisma.product.findMany({ where: { category } })
    return products.map(p => ({
      ...p,
      description: p.description || undefined,
      category: p.category || undefined,
      collectionId: p.collectionId || undefined,
      tags: []
    }))
  },
  ['products-by-category'],
  { revalidate: 3600, tags: ['products'] }
)
