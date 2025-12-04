'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toPng } from 'html-to-image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { products } from '@/data/products'
import { packs } from '@/data/packs'
import { collections } from '@/data/collections'
import { logoPlacements } from '@/data/logoPlacements'
import { ProductComposite } from '@/components/products/ProductComposite'

const GENERATION_SIZE = 1000;

export default function OnboardingPage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [processingStep, setProcessingStep] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    processFile(file)
  }

  const processFile = (file: File | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Le fichier est trop volumineux (max 5MB)')
        return
      }
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!companyName || !logo) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    setError(null)

    try {
      setProcessingStep('Création de votre espace...')
      await new Promise(resolve => setTimeout(resolve, 1000))

      setProcessingStep('Configuration du catalogue...')
      await new Promise(resolve => setTimeout(resolve, 1500))

      const formData = new FormData()
      formData.append('companyName', companyName)
      formData.append('logo', logo)

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création du portail')
      }

      const data = await response.json()
      const { slug } = data

      // Generate product images
      setProcessingStep('Génération des visuels produits...')
      
      // Wait for the DOM to be fully ready and images to load
      await new Promise(resolve => setTimeout(resolve, 2000))

      const productsToGenerate = products.filter(p => logoPlacements[p.id]);
      const packsToGenerate = packs.filter(p => logoPlacements[p.id]);
      const collectionsToGenerate = collections.filter(c => logoPlacements[c.id]);

      const generateItem = async (item: any, type: 'product' | 'pack' | 'collection', index: number, total: number) => {
        const node = document.getElementById(`gen-${item.id}`);
        if (node) {
          try {
            const percent = Math.round(((index + 1) / total) * 100);
            if (type === 'product') setProcessingStep(`Création des produits ${percent}%`);
            if (type === 'pack') setProcessingStep(`Création des packs ${percent}%`);
            if (type === 'collection') setProcessingStep(`Création des catalogues ${percent}%`);
            
            const dataUrl = await toPng(node, {
              cacheBust: true,
              pixelRatio: 1,
              quality: 0.95,
              backgroundColor: '#ffffff',
              skipAutoScale: true
            });

            await fetch('/api/admin/generate-assets', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: dataUrl,
                tenantId: slug,
                productId: item.id,
                type: type
              })
            });
          } catch (genError) {
            console.error(`Failed to generate image for ${item.id}`, genError);
          }
        }
      };

      for (let i = 0; i < productsToGenerate.length; i++) {
        await generateItem(productsToGenerate[i], 'product', i, productsToGenerate.length);
      }
      
      for (let i = 0; i < collectionsToGenerate.length; i++) {
        await generateItem(collectionsToGenerate[i], 'collection', i, collectionsToGenerate.length);
      }

      for (let i = 0; i < packsToGenerate.length; i++) {
        await generateItem(packsToGenerate[i], 'pack', i, packsToGenerate.length);
      }

      setProcessingStep('Finalisation...')
      
      // Petit délai pour que l'utilisateur voie "Finalisation"
      await new Promise(resolve => setTimeout(resolve, 500))

      // Vérification que la page est bien accessible avant de rediriger
      // Cela permet d'éviter les 404 si la propagation DB/Cache n'est pas instantanée
      setProcessingStep('Vérification de la disponibilité...')
      for (let i = 0; i < 10; i++) {
        try {
          // On tente d'accéder à la page. Si 200 OK, c'est bon.
          const res = await fetch(`/portal/${data.slug}`, { method: 'HEAD', cache: 'no-store' })
          if (res.ok) break
        } catch (e) {
          console.error('Waiting for portal...', e)
        }
        // On attend 1s entre chaque essai
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      router.push(`/portal/${data.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setLoading(false)
      setProcessingStep(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Loading Overlay */}
      {loading && processingStep && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{processingStep}</h2>
          <p className="text-gray-500">Veuillez patienter quelques instants...</p>
        </div>
      )}

      {/* Hidden Generation Container - Placed behind the loading screen (z-50) but visible to browser */}
      {loading && (
        <div style={{ position: 'fixed', left: '0', top: '0', zIndex: 40, pointerEvents: 'none', opacity: 1 }}>
          {logoPreview && products.map(product => {
            const rawPlacement = logoPlacements[product.id];
            if (!rawPlacement) return null;

            return (
              <ProductComposite
                key={`prod-${product.id}`}
                id={`gen-${product.id}`}
                product={product}
                logoUrl={logoPreview}
                placement={rawPlacement}
                width={GENERATION_SIZE}
                height={GENERATION_SIZE}
              />
            );
          })}
          {logoPreview && packs.map(pack => {
            const rawPlacement = logoPlacements[pack.id];
            if (!rawPlacement) return null;

            return (
              <ProductComposite
                key={`pack-${pack.id}`}
                id={`gen-${pack.id}`}
                product={pack as any}
                logoUrl={logoPreview}
                placement={rawPlacement}
                width={GENERATION_SIZE}
                height={GENERATION_SIZE}
              />
            );
          })}
          {logoPreview && collections.map(collection => {
            const rawPlacement = logoPlacements[collection.id];
            if (!rawPlacement) return null;

            return (
              <ProductComposite
                key={`col-${collection.id}`}
                id={`gen-${collection.id}`}
                product={collection as any}
                logoUrl={logoPreview}
                placement={rawPlacement}
                width={GENERATION_SIZE}
                height={GENERATION_SIZE}
              />
            );
          })}
        </div>
      )}

      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Commençons par l'essentiel
              </h1>
              <p className="mt-2 text-gray-600">
                Configurez votre espace en quelques secondes. Vous pourrez ajouter vos produits plus tard.
              </p>
            </div>

            <Card className="p-6 sm:p-8 shadow-xl border-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nom de l'entreprise"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ex : Acme Corp"
                  required
                  className="text-lg py-3"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de l'entreprise
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      {logoPreview ? (
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <img
                            src={logoPreview}
                            alt="Preview"
                            className="object-contain w-full h-full rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLogo(null);
                              setLogoPreview(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF jusqu'à 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création en cours...
                    </span>
                  ) : (
                    "Générer mon portail →"
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column: Preview */}
          <div className="hidden lg:block sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gray-100 border-b border-gray-200 p-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-white px-3 py-1 rounded-md text-xs text-gray-500 flex-1 text-center mx-4">
                  portal.onestopmerch.com/{companyName ? companyName.toLowerCase().replace(/\s+/g, '-') : 'votre-entreprise'}
                </div>
              </div>
              
              <div className="p-8 bg-white min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-16 object-contain mb-4" />
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4 animate-pulse">
                    🏢
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-gray-900">
                  Bienvenue chez {companyName || "Votre Entreprise"}
                </h2>
                <p className="text-gray-500 max-w-xs">
                  Commandez votre Welcome Pack officiel en quelques clics.
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-8 opacity-50 pointer-events-none">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Ceci est un aperçu en temps réel de votre futur portail.
              </p>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
