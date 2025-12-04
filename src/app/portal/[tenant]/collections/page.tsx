import { collections } from '@/data/collections';
import { CollectionCard } from '@/components/portal/CollectionCard';
import { getProductCatalog } from '@/lib/products/getProductCatalog';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { loadPortalConfig } from '@/lib/portals/loadPortalConfig';
import { notFound } from 'next/navigation';

// Client component wrapper for interactivity if needed, but we can do server side filtering
import CollectionsClient from './CollectionsClient';

interface CollectionsPageProps {
  params: {
    tenant: string;
  };
  searchParams: {
    category?: string;
  };
}

export default async function CollectionsPage({ params, searchParams }: CollectionsPageProps) {
  const { tenant } = params;
  const categoryId = searchParams.category;
  const portal = await loadPortalConfig(tenant);

  if (!portal) {
    notFound();
  }

  const products = await getProductCatalog();

  return (
    <CollectionsClient 
      tenantId={tenant} 
      categoryId={categoryId} 
      products={products} 
      portalLogo={portal.logoUrl}
    />
  );
}
