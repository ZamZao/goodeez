import React from 'react';
import Image from 'next/image';
import { LogoLayer as LogoLayerType } from '@/lib/utils/types';
import { getCssMatrix3d } from '@/lib/utils/matrix';

interface LogoLayerProps {
  layer: LogoLayerType;
  logoUrl: string;
  containerWidth: number;
  containerHeight: number;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export function LogoLayer({ 
  layer, 
  logoUrl, 
  containerWidth, 
  containerHeight, 
  zIndex = 10,
  className = '',
  style: additionalStyle = {},
  onMouseDown
}: LogoLayerProps) {
  const isPerspective = !!layer.corners;
  
  let style: React.CSSProperties = {
    position: 'absolute',
    zIndex,
    mixBlendMode: layer.blendMode || 'multiply',
    opacity: layer.opacity !== undefined ? layer.opacity : 0.9,
    ...additionalStyle
  };

  if (isPerspective && layer.corners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = layer.corners;
    style = {
      ...style,
      left: '0%',
      top: '0%',
      width: '100%',
      height: '100%',
      transformOrigin: '0 0',
      transform: getCssMatrix3d(
        [topLeft, topRight, bottomRight, bottomLeft],
        containerWidth,
        containerHeight
      )
    };
  } else {
    style = {
      ...style,
      left: `${layer.centerXPct}%`,
      top: `${layer.centerYPct}%`,
      width: `${layer.widthPct}%`,
      transform: `translate(-50%, -50%) rotate(${layer.rotateDeg || 0}deg) ${
        layer.warp?.type === 'perspective' ? 'perspective(500px) rotateY(10deg)' : 
        layer.warp?.type === 'cylindrical' ? 'perspective(500px) rotateY(5deg)' : ''
      }`,
      aspectRatio: '1/1'
    };
  }

  return (
    <div 
      className={className}
      style={style}
      onMouseDown={onMouseDown}
    >
      <div className="relative w-full h-full">
        <Image
          src={logoUrl}
          alt="Logo"
          fill
          className="object-contain pointer-events-none"
          unoptimized // Important for html-to-image
        />
      </div>
    </div>
  );
}
