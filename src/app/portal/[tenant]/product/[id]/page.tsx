import { notFound } from 'next/navigation';
import { getProductCatalog } from '@/lib/products/getProductCatalog';
import { packs } from '@/data/packs';
import ProductDetailsClient from './ProductDetailsClient';
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig';

interface ProductPageProps {
  params: {
    tenant: string;
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { tenant, id } = params;
  const portal = await loadPortalConfig(tenant);

  if (!portal) {
    notFound();
  }

  // Check if it's a pack
  if (id.startsWith('pack-')) {
    const packId = id.replace('pack-', '');
    const pack = packs.find(p => p.id === packId);
    
    if (pack) {
      return <ProductDetailsClient item={pack} type="pack" tenantId={tenant} logoUrl={portal.logoUrl} />;
    }
  }

  // Check if it's a product
  const products = await getProductCatalog();
  const product = products.find(p => p.id === id);

  if (product) {
    return <ProductDetailsClient item={product} type="product" tenantId={tenant} logoUrl={portal.logoUrl} />;
  }

  notFound();
}
