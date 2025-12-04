'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product, LogoPlacement, LogoLayer } from '@/lib/utils/types'
import { logoPlacements } from '@/data/logoPlacements'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { getCssMatrix3d } from '@/lib/utils/matrix'
import { useDimensions } from '@/hooks/useDimensions'

interface ProductCardProps {
  product: Product
  logoUrl?: string
  href?: string
  onAddToCart?: (product: Product, quantity: number) => void
  tenantId?: string
}

export default function ProductCard({ product, logoUrl, href, onAddToCart, tenantId }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { ref, dimensions } = useDimensions()
  
  // Handle both legacy (single object) and new (array) formats
  const rawPlacement = logoPlacements[product.id];
  
  let layers: LogoLayer[] = [];
  let generatedImage: string | undefined = undefined;

  // If tenantId is provided, try to use the tenant-specific generated image
  if (tenantId) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      generatedImage = `${supabaseUrl}/storage/v1/object/public/portals/${tenantId}/products/catalog/${product.id}.png`;
    } else {
      // Fallback for local dev if env var is missing (though it should be there)
      generatedImage = `/portals/${tenantId}/products/catalog/${product.id}.png`;
    }
  }

  if (rawPlacement) {
    if (Array.isArray(rawPlacement)) {
      layers = rawPlacement;
    } else if ('layers' in rawPlacement) {
      layers = rawPlacement.layers;
      // Only use the global generated image if we don't have a tenant-specific one
      if (!generatedImage) {
        generatedImage = rawPlacement.generatedImage;
      }
    } else {
       // Legacy single object fallback
       layers = [rawPlacement as any];
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    if (val > 0) setQuantity(val)
  }

  const renderLogo = () => {
    if (!logoUrl) return null

    if (layers.length > 0) {
      return (
        <>
          {layers.map((layer, idx) => {
            const { centerXPct, centerYPct, widthPct, rotateDeg, warp, blendMode, opacity, corners } = layer;
            
            let style: React.CSSProperties = {
              position: 'absolute',
              zIndex: 10,
              pointerEvents: 'none',
            };

            if (corners) {
              const { topLeft, topRight, bottomRight, bottomLeft } = corners;
              style = {
                ...style,
                left: '0%',
                top: '0%',
                width: '100%',
                height: '100%',
                transformOrigin: '0 0',
                transform: getCssMatrix3d(
                  [topLeft, topRight, bottomRight, bottomLeft],
                  dimensions.width,
                  dimensions.height
                )
              };
            } else {
              style = {
                ...style,
                left: `${centerXPct}%`,
                top: `${centerYPct}%`,
                width: `${widthPct}%`,
                transform: `translate(-50%, -50%) rotate(${rotateDeg || 0}deg) ${
                  warp?.type === 'perspective' ? 'perspective(500px) rotateY(10deg)' : 
                  warp?.type === 'cylindrical' ? 'perspective(500px) rotateY(5deg)' : ''
                }`,
                aspectRatio: '1/1'
              };
            }

            return (
              <div key={layer.id || idx} style={{
                ...style,
                mixBlendMode: blendMode || 'multiply',
                opacity: opacity !== undefined ? opacity : 0.9,
              }}>
                <div className="relative w-full h-full">
                   <Image
                    src={logoUrl}
                    alt="Company logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100px, 200px"
                  />
                </div>
              </div>
            );
          })}
        </>
      );
    }

    // Fallback for products without config
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-10">
        <div className="relative w-24 h-24 opacity-30">
          <Image
            src={logoUrl}
            alt="Company logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 border border-white/10 hover:border-white/20">
      <div ref={ref} className="relative aspect-square bg-white/5 rounded-t-2xl overflow-hidden isolate">
        {href ? (
          <Link href={href} className="block w-full h-full relative">
            {generatedImage ? (
              <Image
                src={generatedImage}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                {renderLogo()}
              </>
            )}
          </Link>
        ) : (
          <>
            {generatedImage ? (
              <Image
                src={generatedImage}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                {renderLogo()}
              </>
            )}
          </>
        )}
        
        {/* Quick Add Overlay (Desktop) */}
        {onAddToCart && (
          <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex gap-2">
             <button 
               onClick={() => onAddToCart(product, 1)}
               className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors border border-white/10"
               title="Ajouter au panier"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             </button>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <Badge variant="default" className="mb-2 bg-white/10 text-gray-300 hover:bg-white/20 border-0">{product.category}</Badge>
          {href ? (
            <Link href={href} className="block group-hover:text-blue-400 transition-colors">
              <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
            </Link>
          ) : (
            <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
          )}
        </div>
        
        <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <span className="text-xl font-bold text-blue-200">
            ${product.price.toFixed(2)}
          </span>
          
          {/* Mobile Add to Cart or Quantity Selector */}
          {onAddToCart && (
            <div className="flex items-center gap-2 sm:hidden">
               <Button size="sm" onClick={() => onAddToCart(product, 1)} className="bg-blue-600 hover:bg-blue-500 text-white border-none">
                Ajouter
              </Button>
            </div>
          )}
          
          {/* Desktop Quantity Selector (Visible if needed, but simplified for clean look) */}
          {onAddToCart && (
             <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Kept simple for now, relying on the quick add button above */}
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
