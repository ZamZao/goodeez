import { notFound } from 'next/navigation'
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig'
import { getProductCatalog } from '@/lib/products/getProductCatalog'
import TenantPortalClient from './TenantPortalClient'

interface PageProps {
  params: {
    tenant: string
  }
}

export default async function TenantPortalPage({ params }: PageProps) {
  const { tenant } = params
  const portal = await loadPortalConfig(tenant)

  if (!portal) {
    notFound()
  }

  const products = await getProductCatalog()

  return <TenantPortalClient portal={portal} products={products} />
}
