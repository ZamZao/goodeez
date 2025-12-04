'use client'

import React from 'react'
import { PortalConfig, Product } from '@/lib/utils/types'
import { PortalHero } from '@/components/portal/PortalHero'
import { PackCard } from '@/components/portal/PackCard'
import { CollectionCard } from '@/components/portal/CollectionCard'
import ProductCard from '@/components/products/ProductCard'
import { packs } from '@/data/packs'
import { collections } from '@/data/collections'
import { useCart } from '@/contexts/CartContext'

interface TenantPortalClientProps {
  portal: PortalConfig
  products: Product[]
}

export default function TenantPortalClient({ portal, products }: TenantPortalClientProps) {
  const { addToCart } = useCart()
  
  // Featured Packs (first 3)
  const featuredPacks = packs.slice(0, 3);
  
  // Featured Products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <PortalHero tenantId={portal.slug} companyName={portal.name} />
      
      {/* Packs Shortcuts */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Nos Packs Vedettes</h2>
            <p className="mt-2 text-gray-300">Des ensembles soigneusement sélectionnés pour chaque occasion.</p>
          </div>
          <a href={`/portal/${portal.slug}/packs`} className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Voir tous les packs 
            <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPacks.map(pack => (
            <PackCard key={pack.id} pack={pack} tenantId={portal.slug} />
          ))}
        </div>
      </section>

      {/* Collections Shortcuts */}
      <section className="py-24 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Collections</h2>
              <p className="mt-2 text-gray-300">Explorez nos produits par catégorie.</p>
            </div>
            <a href={`/portal/${portal.slug}/collections`} className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Toutes les collections
              <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} tenantId={portal.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers (Products) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Meilleures Ventes</h2>
          <p className="mt-2 text-gray-300">Les favoris de vos équipes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              logoUrl={portal.logoUrl}
              onAddToCart={addToCart}
              tenantId={portal.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
