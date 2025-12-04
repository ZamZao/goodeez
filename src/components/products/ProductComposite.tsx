import React from 'react';
import Image from 'next/image';
import { Product, LogoPlacement, LogoLayer as LogoLayerType } from '@/lib/utils/types';
import { LogoLayer } from './LogoLayer';

interface ProductCompositeProps {
  product: Product;
  logoUrl: string;
  placement?: LogoPlacement;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
}

export function ProductComposite({ 
  product, 
  logoUrl, 
  placement, 
  width = 1000, 
  height = 1000,
  className = '',
  id
}: ProductCompositeProps) {
  if (!placement) return null;

  const layers: LogoLayerType[] = Array.isArray(placement) 
    ? placement 
    : (placement ? (placement as any).layers || [placement] : []);

  return (
    <div 
      id={id}
      className={`relative bg-white overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image 
        src={product.imageUrl} 
        alt={product.name} 
        fill 
        className="object-contain" 
        unoptimized // Important for html-to-image
      />
      {layers.map((layer, idx) => (
        <LogoLayer
          key={layer.id || idx}
          layer={layer}
          logoUrl={logoUrl}
          containerWidth={width}
          containerHeight={height}
        />
      ))}
    </div>
  );
}
