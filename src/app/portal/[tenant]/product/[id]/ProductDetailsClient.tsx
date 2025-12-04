'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Pack, LogoLayer } from '@/lib/utils/types';
import { Product } from '@/lib/utils/types';
import { products } from '@/data/products';
import { logoPlacements } from '@/data/logoPlacements';
import { Check, Minus, Plus } from 'lucide-react';
import { getCssMatrix3d } from '@/lib/utils/matrix';
import { useDimensions } from '@/hooks/useDimensions';

interface ProductDetailsClientProps {
  item: Product | Pack;
  type: 'product' | 'pack';
  tenantId: string;
  logoUrl?: string;
}

export default function ProductDetailsClient({ item, type, tenantId, logoUrl }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { ref, dimensions } = useDimensions();

  const handleAddToCart = () => {
    const productToAdd: Product = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl || '',
      category: type === 'pack' ? 'Pack' : (item as Product).category || 'General',
      slug: item.slug
    };
    
    addToCart(productToAdd, quantity);
  };

  const isPack = type === 'pack';
  const packItem = item as Pack;

  const rawPlacement = !isPack ? logoPlacements[item.id] : undefined;
  let layers: LogoLayer[] = [];
  let generatedImage: string | undefined = undefined;

  // If tenantId is provided, try to use the tenant-specific generated image
  if (tenantId) {
    if (isPack) {
      generatedImage = `/portals/${tenantId}/products/packs/${item.id}.png`;
    } else {
      generatedImage = `/portals/${tenantId}/products/catalog/${item.id}.png`;
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
       layers = [rawPlacement as any];
    }
  }

  const renderLogo = () => {
    if (!logoUrl || isPack) return null;

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
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            );
          })}
        </>
      );
    }

    // Fallback
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-10">
        <div className="relative w-32 h-32 opacity-30">
          <Image
            src={logoUrl}
            alt="Company logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div ref={ref} className="relative aspect-square bg-white/5 rounded-2xl overflow-hidden isolate border border-white/10">
          {generatedImage ? (
            <Image
              src={generatedImage}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <>
              <Image
                src={item.imageUrl || ''}
                alt={item.name}
                fill
                className="object-cover"
              />
              {renderLogo()}
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <Badge className="mb-4 bg-white/10 text-blue-200 hover:bg-white/20 border-none">
              {isPack ? 'Pack Tout-en-un' : 'Personnalisation incluse'}
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-4">{item.name}</h1>
            <p className="text-xl text-gray-300 mb-6">{item.description}</p>
            <div className="text-3xl font-bold text-blue-200 mb-8">
              {item.price.toFixed(2)} €
            </div>
          </div>

          {isPack && (
            <div className="mb-8 bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-white mb-4">Ce pack contient :</h3>
              <ul className="space-y-3">
                {packItem.items.map((subItem, idx) => {
                  const product = products.find(p => p.id === subItem.productId);
                  return (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3" />
                      {subItem.quantity}x {product ? product.name : subItem.productId}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-auto border-t border-white/10 pt-8">
            <div className="flex items-center gap-6 mb-6">
              <span className="font-medium text-gray-300">Quantité :</span>
              <div className="flex items-center border border-white/20 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full md:w-auto px-12 bg-blue-600 hover:bg-blue-500 text-white border-none"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

