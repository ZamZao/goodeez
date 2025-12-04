'use client';

import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/utils/types';
import { useCart } from '@/contexts/CartContext';

interface CatalogueClientProps {
  products: Product[];
  portalLogo?: string;
  tenantId: string;
}

export default function CatalogueClient({ products, portalLogo, tenantId }: CatalogueClientProps) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl text-white font-bold mb-4">Catalogue Complet</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Découvrez l'ensemble de nos produits personnalisables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            logoUrl={portalLogo}
            onAddToCart={addToCart}
            tenantId={tenantId}
          />
        ))}
      </div>
    </div>
  );
}
