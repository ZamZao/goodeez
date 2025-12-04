import React from 'react'
import { Product } from '@/lib/utils/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  logoUrl?: string
  onAddToCart?: (product: Product, quantity: number) => void
}

export default function ProductGrid({ products, logoUrl, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          logoUrl={logoUrl}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
