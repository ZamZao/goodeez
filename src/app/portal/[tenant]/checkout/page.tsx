import { notFound } from 'next/navigation'
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig'
import Shell from '@/components/layout/Shell'
import CheckoutClientPage from './CheckoutClient'

interface PageProps {
  params: {
    tenant: string
  }
}

export default async function CheckoutPage({ params }: PageProps) {
  const { tenant } = params
  const portal = await loadPortalConfig(tenant)

  if (!portal) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Shell maxWidth="2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Votre Panier</h1>
          <p className="text-gray-600 mt-2">Vérifiez votre commande avant de valider.</p>
        </div>
        <CheckoutClientPage tenant={tenant} />
      </Shell>
    </div>
  )
}
