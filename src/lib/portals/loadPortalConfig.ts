import { prisma } from '@/lib/prisma'
import { PortalConfig } from '@/lib/utils/types'
import { unstable_cache } from 'next/cache'

export const loadPortalConfig = unstable_cache(
  async (slug: string): Promise<PortalConfig | null> => {
    try {
      const tenant = await prisma.tenant.findUnique({ where: { slug } })
      if (!tenant) return null
      
      return {
        slug: tenant.slug,
        name: tenant.name,
        logoUrl: tenant.logoUrl || '',
        primaryColor: tenant.primaryColor || undefined,
        secondaryColor: tenant.secondaryColor || undefined,
        createdAt: tenant.createdAt.toISOString()
      }
    } catch (error) {
      console.error(`Failed to load portal config for ${slug}:`, error)
      return null
    }
  },
  ['portal-config'],
  { revalidate: 3600, tags: ['tenants'] }
)

export const getAllPortalSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const tenants = await prisma.tenant.findMany({
        select: { slug: true }
      })
      return tenants.map(t => t.slug)
    } catch (error) {
      console.error('Failed to get portal slugs:', error)
      return []
    }
  },
  ['all-portal-slugs'],
  { revalidate: 3600, tags: ['tenants'] }
)

export const getAllPortals = unstable_cache(
  async (): Promise<PortalConfig[]> => {
    try {
      const tenants = await prisma.tenant.findMany()
      return tenants.map(tenant => ({
        slug: tenant.slug,
        name: tenant.name,
        logoUrl: tenant.logoUrl || '',
        primaryColor: tenant.primaryColor || undefined,
        secondaryColor: tenant.secondaryColor || undefined,
        createdAt: tenant.createdAt.toISOString()
      }))
    } catch (error) {
      console.error('Failed to get all portals:', error)
      return []
    }
  },
  ['all-portals'],
  { revalidate: 3600, tags: ['tenants'] }
)
