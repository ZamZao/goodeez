import { notFound } from 'next/navigation'
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig'
import { CartProvider } from '@/contexts/CartContext'
import { PortalNavbar } from '@/components/portal/PortalNavbar'
import { PortalFooter } from '@/components/portal/PortalFooter'

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { tenant: string }
}) {
  const portal = await loadPortalConfig(params.tenant)

  if (!portal) {
    notFound()
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-blue-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-blue-950),_var(--tw-color-black))] grain-overlay relative">
        <PortalNavbar tenantId={params.tenant} portalConfig={portal} />
        <main className="flex-grow relative z-20">
          {children}
        </main>
        <PortalFooter />
      </div>
    </CartProvider>
  )
}
