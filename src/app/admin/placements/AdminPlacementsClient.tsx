'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { toPng } from 'html-to-image';
import { Product, Pack, Collection, LogoPlacement, LogoLayer, Point, PortalConfig } from '@/lib/utils/types';
import Button from '@/components/ui/Button';
import { LogoLayer as LogoLayerComponent } from '@/components/products/LogoLayer';
import { getCssMatrix3d } from '@/lib/utils/matrix';
import { useDimensions } from '@/hooks/useDimensions';

interface AdminPlacementsClientProps {
  products: Product[];
  packs: Pack[];
  collections: Collection[];
}

export default function AdminPlacementsClient({ products, packs, collections }: AdminPlacementsClientProps) {
  const [placements, setPlacements] = useState<Record<string, LogoPlacement>>({});
  const [viewMode, setViewMode] = useState<'products' | 'packs' | 'collections'>('products');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [filterMissing, setFilterMissing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tenants, setTenants] = useState<PortalConfig[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string>('demo');
  
  // Editor state
  const { ref: containerRef, dimensions, node: containerNode } = useDimensions();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [draggingPoint, setDraggingPoint] = useState<'center' | 'tl' | 'tr' | 'br' | 'bl' | null>(null);

  useEffect(() => {
    // Fetch tenants
    fetch('/api/admin/tenants')
      .then(res => res.json())
      .then((data: PortalConfig[]) => {
        setTenants(data);
        if (data.length > 0) {
          const demo = data.find(t => t.slug === 'demo');
          setSelectedTenant(demo ? demo.slug : data[0].slug);
        }
      });

    fetch('/api/admin/placements')
      .then(res => res.json())
      .then(data => {
        // Migration: Convert old single object to array if necessary
        const migrated: Record<string, LogoPlacement> = {};
        Object.entries(data).forEach(([key, val]) => {
          if (Array.isArray(val)) {
            migrated[key] = val as LogoPlacement;
          } else if (val && typeof val === 'object' && 'layers' in val) {
            migrated[key] = val as LogoPlacement;
          } else {
            // Legacy migration
            migrated[key] = [val as any] as LogoPlacement;
          }
        });
        setPlacements(migrated);
      });
  }, []);

  const currentItems = viewMode === 'products' ? products : (viewMode === 'packs' ? packs : collections);

  const filteredItems = currentItems.filter(p => {
    if (filterMissing) {
      const placement = placements[p.id];
      if (!placement) return true;
      
      if (Array.isArray(placement)) {
        return placement.length === 0;
      } else {
        return placement.layers.length === 0;
      }
    }
    return true;
  });

  const selectedProduct = currentItems.find(p => p.id === selectedProductId) as (Product | Pack | Collection) | undefined;
  const currentTenant = tenants.find(t => t.slug === selectedTenant);
  
  // Get current layers or empty array
  const placement = selectedProductId ? placements[selectedProductId] : undefined;
  const currentLayers = placement 
    ? (Array.isArray(placement) ? placement : placement.layers) 
    : [];
  
  // Get selected layer or create default if adding new
  const currentLayer = currentLayers[selectedLayerIndex];

  const handleSave = async () => {
    if (!selectedProductId) return;
    setSaving(true);
    setIsGenerating(true);

    try {
      let generatedUrl = undefined;

      // 1. Capture the image
      if (previewContainerRef.current) {
        const dataUrl = await toPng(previewContainerRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          quality: 0.95,
          backgroundColor: '#ffffff',
          filter: (node) => {
            return !node.classList?.contains('drag-handle-ui');
          }
        });

        // 2. Upload
        const res = await fetch('/api/admin/generate-assets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: dataUrl,
            tenantId: selectedTenant,
            productId: selectedProductId,
            type: viewMode === 'packs' ? 'pack' : (viewMode === 'collections' ? 'collection' : 'product')
          })
        });

        if (res.ok) {
          const data = await res.json();
          generatedUrl = data.url;
        }
      }

      // 3. Update Placement Data
      const newPlacement: LogoPlacement = {
        layers: currentLayers,
        generatedImage: generatedUrl
      };

      const updatedPlacements = {
        ...placements,
        [selectedProductId]: newPlacement
      };

      setPlacements(updatedPlacements);

      await fetch('/api/admin/placements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlacements),
      });
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSaving(false);
      setIsGenerating(false);
    }
  };

  const addLayer = () => {
    if (!selectedProductId) return;
    const newLayer: LogoLayer = {
      id: Date.now().toString(),
      centerXPct: 50,
      centerYPct: 50,
      widthPct: 20,
      rotateDeg: 0,
      warp: { type: 'none' },
      blendMode: 'multiply',
      opacity: 0.9
    };
    
    const newLayers = [...currentLayers, newLayer];
    setPlacements(prev => ({ ...prev, [selectedProductId]: newLayers }));
    setSelectedLayerIndex(newLayers.length - 1);
  };

  const removeLayer = (index: number) => {
    if (!selectedProductId) return;
    const newLayers = currentLayers.filter((_, i) => i !== index);
    setPlacements(prev => ({ ...prev, [selectedProductId]: newLayers }));
    if (selectedLayerIndex >= newLayers.length) {
      setSelectedLayerIndex(Math.max(0, newLayers.length - 1));
    }
  };

  const updateLayer = (updates: Partial<LogoLayer>) => {
    if (!selectedProductId || !currentLayer) return;
    
    const newLayers = [...currentLayers];
    newLayers[selectedLayerIndex] = { ...currentLayer, ...updates };
    
    setPlacements(prev => ({
      ...prev,
      [selectedProductId]: newLayers
    }));
  };

  const enablePerspective = () => {
    if (!currentLayer) return;
    // Initialize corners based on current position/size
    const cx = currentLayer.centerXPct;
    const cy = currentLayer.centerYPct;
    const w = currentLayer.widthPct;
    const h = w; // Square aspect ratio assumption for init
    
    updateLayer({
      corners: {
        topLeft: { x: cx - w/2, y: cy - h/2 },
        topRight: { x: cx + w/2, y: cy - h/2 },
        bottomRight: { x: cx + w/2, y: cy + h/2 },
        bottomLeft: { x: cx - w/2, y: cy + h/2 }
      }
    });
  };

  const disablePerspective = () => {
    updateLayer({ corners: undefined });
  };

  const handleMouseDown = (e: React.MouseEvent, point: 'center' | 'tl' | 'tr' | 'br' | 'bl') => {
    e.stopPropagation();
    setDraggingPoint(point);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingPoint || !containerNode || !selectedProductId || !currentLayer) return;

    const rect = containerNode.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    if (draggingPoint === 'center') {
      updateLayer({ centerXPct: xPct, centerYPct: yPct });
    } else if (currentLayer.corners) {
      const newCorners = { ...currentLayer.corners };
      if (draggingPoint === 'tl') newCorners.topLeft = { x: xPct, y: yPct };
      if (draggingPoint === 'tr') newCorners.topRight = { x: xPct, y: yPct };
      if (draggingPoint === 'br') newCorners.bottomRight = { x: xPct, y: yPct };
      if (draggingPoint === 'bl') newCorners.bottomLeft = { x: xPct, y: yPct };
      updateLayer({ corners: newCorners });
    }
  };

  const handleMouseUp = () => {
    setDraggingPoint(null);
  };

  const renderLayer = (layer: LogoLayer, index: number, isSelected: boolean) => {
    const isPerspective = !!layer.corners;
    
    return (
      <React.Fragment key={layer.id}>
        <LogoLayerComponent
          layer={layer}
          logoUrl={currentTenant?.logoUrl || ''}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
          zIndex={isSelected ? 20 : 10}
          onMouseDown={(e) => isSelected && !isPerspective && handleMouseDown(e, 'center')}
          style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
        />

        {isSelected && <div className="absolute inset-0 border border-blue-500 opacity-50 pointer-events-none" style={{ zIndex: 21 }} />}

        {/* Render Handles for Perspective Mode */}
        {isSelected && isPerspective && layer.corners && (
          <>
            {[
              { key: 'tl', pt: layer.corners.topLeft },
              { key: 'tr', pt: layer.corners.topRight },
              { key: 'br', pt: layer.corners.bottomRight },
              { key: 'bl', pt: layer.corners.bottomLeft }
            ].map(({ key, pt }) => (
              <div
                key={key}
                className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white cursor-move z-30 hover:scale-125 transition-transform"
                style={{
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseDown={(e) => handleMouseDown(e, key as any)}
              />
            ))}
          </>
        )}
      </React.Fragment>
    );
  };

  const getLayerCount = (pid: string) => {
    const p = placements[pid];
    if (!p) return 0;
    return Array.isArray(p) ? p.length : p.layers.length;
  };

  return (
    <div className="flex h-screen bg-gray-100" onMouseUp={handleMouseUp}>
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold mb-4 text-gray-900">Logo Placements</h1>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenant / Brand</label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            >
              {tenants.map(t => (
                <option key={t.slug} value={t.slug}>{t.name} ({t.slug})</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
            <div className="flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => { setViewMode('products'); setSelectedProductId(null); }}
                className={`px-4 py-2 text-sm font-medium border rounded-l-lg flex-1 ${
                  viewMode === 'products' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => { setViewMode('packs'); setSelectedProductId(null); }}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r flex-1 ${
                  viewMode === 'packs' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Packs
              </button>
              <button
                type="button"
                onClick={() => { setViewMode('collections'); setSelectedProductId(null); }}
                className={`px-4 py-2 text-sm font-medium border rounded-r-lg flex-1 ${
                  viewMode === 'collections' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Collections
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="filterMissing"
              checked={filterMissing}
              onChange={(e) => setFilterMissing(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="filterMissing" className="text-gray-900 font-medium">Show missing only</label>
          </div>
          <Button onClick={handleSave} disabled={saving || isGenerating} className="w-full">
            {isGenerating ? 'Generating...' : (saving ? 'Saving...' : 'Save & Generate')}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedProductId(item.id);
                setSelectedLayerIndex(0);
              }}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                selectedProductId === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-xs mt-1 flex justify-between items-center">
                <span className="text-gray-500">
                  {'category' in item ? (item.category || 'Uncategorized') : ('items' in item ? 'Pack Bundle' : 'Collection')}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                  getLayerCount(item.id) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {getLayerCount(item.id)} Layers
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center">
        {selectedProduct ? (
          <div className="w-full max-w-6xl flex gap-8">
            {/* Canvas Column */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">{selectedProduct.name}</h2>
              <div 
                ref={previewContainerRef}
                className="relative w-full aspect-square bg-white shadow-lg border border-gray-200 select-none overflow-hidden"
              >
                <div 
                  ref={containerRef}
                  className="absolute inset-0 w-full h-full"
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={selectedProduct.imageUrl || ''}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain pointer-events-none"
                    unoptimized
                  />
                  {currentLayers.map((layer, idx) => renderLayer(layer, idx, idx === selectedLayerIndex))}
                </div>
              </div>
            </div>

            {/* Controls Column */}
            <div className="w-80 flex flex-col gap-6">
              {/* Layer List */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Layers</h3>
                  <Button size="sm" onClick={addLayer}>+ Add</Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {currentLayers.map((layer, idx) => (
                    <div 
                      key={layer.id}
                      onClick={() => setSelectedLayerIndex(idx)}
                      className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                        idx === selectedLayerIndex ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <span className="text-sm font-medium">Layer {idx + 1}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeLayer(idx); }}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {currentLayers.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-4">No layers yet</div>
                  )}
                </div>
              </div>

              {/* Layer Settings */}
              {currentLayer && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold mb-4 text-gray-900">Layer {selectedLayerIndex + 1} Settings</h3>
                  
                  <div className="space-y-4">
                    {/* Mode Toggle */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">4-Point Warp</span>
                      <button
                        onClick={() => currentLayer.corners ? disablePerspective() : enablePerspective()}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          currentLayer.corners ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          currentLayer.corners ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {/* Size Control - Always visible now */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        {currentLayer.corners ? 'Scale (%)' : 'Size (%)'}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={currentLayer.widthPct}
                        onChange={(e) => {
                          const newWidth = Number(e.target.value);
                          if (currentLayer.corners) {
                            // Scale corners relative to centroid
                            const oldWidth = currentLayer.widthPct;
                            const scale = newWidth / oldWidth;
                            
                            const { topLeft, topRight, bottomRight, bottomLeft } = currentLayer.corners;
                            const cx = (topLeft.x + topRight.x + bottomRight.x + bottomLeft.x) / 4;
                            const cy = (topLeft.y + topRight.y + bottomRight.y + bottomLeft.y) / 4;
                            
                            const scalePoint = (p: Point) => ({
                              x: cx + (p.x - cx) * scale,
                              y: cy + (p.y - cy) * scale
                            });
                            
                            updateLayer({
                              widthPct: newWidth,
                              corners: {
                                topLeft: scalePoint(topLeft),
                                topRight: scalePoint(topRight),
                                bottomRight: scalePoint(bottomRight),
                                bottomLeft: scalePoint(bottomLeft)
                              }
                            });
                          } else {
                            updateLayer({ widthPct: newWidth });
                          }
                        }}
                        className="w-full"
                      />
                    </div>

                    {!currentLayer.corners && (
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Rotation</label>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={currentLayer.rotateDeg || 0}
                          onChange={(e) => updateLayer({ rotateDeg: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Blend Mode</label>
                      <select
                        value={currentLayer.blendMode || 'multiply'}
                        onChange={(e) => updateLayer({ blendMode: e.target.value as any })}
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                      >
                        <option value="normal">Normal</option>
                        <option value="multiply">Multiply</option>
                        <option value="screen">Screen</option>
                        <option value="overlay">Overlay</option>
                        <option value="soft-light">Soft Light</option>
                        <option value="hard-light">Hard Light</option>
                        <option value="color-burn">Color Burn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Opacity</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={currentLayer.opacity !== undefined ? currentLayer.opacity : 0.9}
                        onChange={(e) => updateLayer({ opacity: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-xl mt-20">Select an item to edit logo placement</div>
        )}
      </div>
    </div>
  );
}

