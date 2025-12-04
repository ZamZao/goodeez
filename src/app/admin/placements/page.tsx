import { getProductCatalog } from '@/lib/products/getProductCatalog';
import { packs } from '@/data/packs';
import { collections } from '@/data/collections';
import AdminPlacementsClient from './AdminPlacementsClient';

export default async function AdminPlacementsPage() {
  const products = await getProductCatalog();

  return <AdminPlacementsClient products={products} packs={packs} collections={collections} />;
}
