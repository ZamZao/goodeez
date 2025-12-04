import { prisma } from '@/lib/prisma'
import { PortalConfig } from '@/lib/utils/types'
import { revalidateTag } from 'next/cache'

export async function savePortalConfig(slug: string, config: PortalConfig): Promise<void> {
  try {
    // Upsert tenant in database
    await prisma.tenant.upsert({
      where: { slug },
      update: {
        name: config.name,
        logoUrl: config.logoUrl,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
      },
      create: {
        slug,
        name: config.name,
        logoUrl: config.logoUrl,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
      }
    })
    
    // Invalidate cache so the new portal appears immediately
    revalidateTag('tenants')
    revalidateTag('portal-config')
    revalidateTag('all-portal-slugs')
    revalidateTag('all-portals')
    
  } catch (error) {
    console.error(`Failed to save portal config for ${slug}:`, error)
    throw error
  }
}
