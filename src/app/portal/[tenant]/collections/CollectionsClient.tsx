'use client';

import { collections } from '@/data/collections';
import { CollectionCard } from '@/components/portal/CollectionCard';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/lib/utils/types';
import { useCart } from '@/contexts/CartContext';

interface CollectionsClientProps {
  tenantId: string;
  categoryId?: string;
  products: Product[];
  portalLogo?: string;
}

export default function CollectionsClient({ tenantId, categoryId, products, portalLogo }: CollectionsClientProps) {
  const { addToCart } = useCart();

  if (categoryId) {
    const collection = collections.find(c => c.id === categoryId);
    
    if (!collection) {
      return <div className="p-12 text-center">Collection not found</div>;
    }

    // Filter products based on collection productIds
    const collectionProducts = products.filter(p => 
      collection.productIds.includes(p.id)
    );

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href={`/portal/${tenantId}/collections`} className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour aux collections
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{collection.name}</h1>
          <p className="text-gray-300">{collection.description}</p>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {collectionProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                logoUrl={portalLogo}
                onAddToCart={addToCart}
                tenantId={tenantId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-400">Aucun produit dans cette collection pour le moment.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Nos Collections</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Explorez nos gammes de produits par catégorie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} tenantId={tenantId} />
        ))}
      </div>
    </div>
  );
}
