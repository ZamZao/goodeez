import { getProductCatalog } from '@/lib/products/getProductCatalog';
import ProductCard from '@/components/products/ProductCard';
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig';
import { notFound } from 'next/navigation';
import CatalogueClient from './CatalogueClient';

interface CataloguePageProps {
  params: {
    tenant: string;
  };
}

export default async function CataloguePage({ params }: CataloguePageProps) {
  const { tenant } = params;
  const portal = await loadPortalConfig(tenant);

  if (!portal) {
    notFound();
  }

  const products = await getProductCatalog();

  return <CatalogueClient products={products} portalLogo={portal.logoUrl} tenantId={tenant} />;
}
