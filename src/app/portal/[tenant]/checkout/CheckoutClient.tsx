'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { packs } from '@/data/packs'
import { Check } from 'lucide-react'

export default function CheckoutClientPage({ tenant }: { tenant: string }) {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [processingStep, setProcessingStep] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  
  const [formValues, setFormValues] = useState({
    // Customer
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    department: '',
    // Billing
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingPostalCode: '',
    billingCity: '',
    billingCountry: 'France',
    billingVatNumber: '',
    billingSiret: '',
    // Shipping
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingPostalCode: '',
    shippingCity: '',
    shippingCountry: 'France',
    shippingContactName: '',
    shippingNotes: '',
    // Meta
    desiredDeliveryDate: '',
    internalReference: '',
    additionalNotes: '',
  })

  const fillTestValues = () => {
    setFormValues({
      companyName: 'Test Company',
      contactName: 'Test User',
      email: 'test@example.com',
      phone: '0612345678',
      department: 'IT',
      billingAddressLine1: '123 Test St',
      billingAddressLine2: '',
      billingPostalCode: '75001',
      billingCity: 'Paris',
      billingCountry: 'France',
      billingVatNumber: 'FR12345678901',
      billingSiret: '12345678901234',
      shippingAddressLine1: '123 Test St',
      shippingAddressLine2: '',
      shippingPostalCode: '75001',
      shippingCity: 'Paris',
      shippingCountry: 'France',
      shippingContactName: 'Test Receiver',
      shippingNotes: 'Code 1234',
      desiredDeliveryDate: new Date().toISOString().split('T')[0],
      internalReference: 'REF-TEST-1',
      additionalNotes: 'This is a test order',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  const sortedItems = [...items].sort((a, b) => {
    const isPackA = a.product.category === 'Pack';
    const isPackB = b.product.category === 'Pack';
    
    // Sort by type: Products first, Packs last
    if (isPackA !== isPackB) {
      return isPackA ? 1 : -1;
    }
    
    // Sort alphabetically within type
    return a.product.name.localeCompare(b.product.name);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      setError('Votre panier est vide')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulation des étapes de traitement
      setProcessingStep('Création de votre demande...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProcessingStep('Vérification des stocks...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setProcessingStep('Finalisation...')
      
      // If same as shipping, copy shipping address to billing
      const billingData = sameAsShipping ? {
        addressLine1: formValues.shippingAddressLine1,
        addressLine2: formValues.shippingAddressLine2,
        postalCode: formValues.shippingPostalCode,
        city: formValues.shippingCity,
        country: formValues.shippingCountry || 'France',
        vatNumber: formValues.billingVatNumber,
        siret: formValues.billingSiret,
      } : {
        addressLine1: formValues.billingAddressLine1,
        addressLine2: formValues.billingAddressLine2,
        postalCode: formValues.billingPostalCode,
        city: formValues.billingCity,
        country: formValues.billingCountry || 'France',
        vatNumber: formValues.billingVatNumber,
        siret: formValues.billingSiret,
      }

      const payload = {
        type: 'checkout_submission',
        submittedAt: new Date().toISOString(),
        customer: {
          companyName: formValues.companyName,
          contactName: formValues.contactName,
          email: formValues.email,
          phone: formValues.phone,
          department: formValues.department,
        },
        billing: billingData,
        shipping: {
          addressLine1: formValues.shippingAddressLine1,
          addressLine2: formValues.shippingAddressLine2,
          postalCode: formValues.shippingPostalCode,
          city: formValues.shippingCity,
          country: formValues.shippingCountry || 'France',
          contactName: formValues.shippingContactName || formValues.contactName,
          notes: formValues.shippingNotes,
        },
        meta: {
          desiredDeliveryDate: formValues.desiredDeliveryDate,
          internalReference: formValues.internalReference,
          additionalNotes: formValues.additionalNotes,
        },
        cart: {
          lines: items,
          currency: 'EUR',
          estimatedTotal: total,
        },
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande')
      }

      // Attendre un peu avant de rediriger pour que l'utilisateur voie la dernière étape
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Ne pas vider le panier ici pour éviter le flash "Panier vide"
      // Le panier sera vidé après la redirection ou on peut le laisser gérer par la page de succès si on passait l'info autrement
      // Mais ici on va juste rediriger, et on videra le panier juste avant
      
      clearCart()
      router.push(`/portal/${tenant}/checkout/success?email=${encodeURIComponent(formValues.email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setLoading(false)
      setProcessingStep(null)
    }
  }

  const nextStep = () => {
    // Basic validation for step 1
    if (step === 1) {
      if (!formValues.companyName || !formValues.contactName || !formValues.email) {
        setError('Veuillez remplir tous les champs obligatoires')
        return
      }
    }
    // Basic validation for step 2
    if (step === 2) {
      if (!formValues.shippingAddressLine1 || !formValues.shippingPostalCode || !formValues.shippingCity) {
        setError('Veuillez remplir tous les champs obligatoires')
        return
      }
      if (!sameAsShipping && (!formValues.billingAddressLine1 || !formValues.billingPostalCode || !formValues.billingCity)) {
        setError('Veuillez remplir l\'adresse de facturation')
        return
      }
    }
    setError(null)
    setStep(step + 1)
  }

  const prevStep = () => {
    setError(null)
    setStep(step - 1)
  }

  if (loading && processingStep) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{processingStep}</h2>
        <p className="text-gray-500">Veuillez patienter quelques instants...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
        <Link href={`/portal/${tenant}`}>
          <Button>
            Continuer vos achats
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary (Read Only) */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Récapitulatif</h2>
            <Link href={`/portal/${tenant}`} className="text-blue-600 hover:underline text-sm">
              Modifier le panier
            </Link>
          </div>
          
          <div className="space-y-4">
            {sortedItems.map((item) => {
              const isPack = item.product.category === 'Pack';
              const pack = isPack ? packs.find(p => p.id === item.product.id) : null;

              return (
                <div key={item.product.id} className="pb-4 border-b last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                  
                  {isPack && pack && (
                    <div className="mt-2 pl-4 border-l-2 border-blue-100">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Contenu du pack :</p>
                      {pack.items.map((packItem, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                          {packItem.quantity}x {packItem.productId}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="pt-4 border-t-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total estimé (HT)</span>
                <span className="text-2xl font-bold text-blue-600">
                  {total.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Delivery Estimate Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span>⏱️</span> Délais de production & livraison
          </h3>
          <p className="text-blue-800 text-sm">
            En raison d’un volume de commandes élevé, nos délais de production et de livraison sont actuellement estimés entre <strong>5 et 6 semaines</strong> après validation du paiement et des visuels.
          </p>
          <p className="text-blue-800 text-sm mt-2">
            Nous travaillons activement à réduire ces délais en-dessous de <strong>3 semaines</strong> dans les prochains mois.
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <Card className="p-6">
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 flex justify-end">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={fillTestValues}
              className="text-xs bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
            >
              ⚡ Auto-fill (Dev)
            </Button>
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Validation de la commande</h2>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Informations</span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>2. Livraison</span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>3. Détails</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex mb-8">
            <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Informations Client */}
          {step === 1 && (
            <section className="animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Informations Client</h3>
              <div className="space-y-4">
                <Input
                  label="Nom de l'entreprise *"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Nom & Prénom du contact *"
                  name="contactName"
                  value={formValues.contactName}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  label="Service / Département"
                  name="department"
                  value={formValues.department}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Numéro de TVA"
                    name="billingVatNumber"
                    value={formValues.billingVatNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="SIRET"
                    name="billingSiret"
                    value={formValues.billingSiret}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button type="button" onClick={nextStep} size="lg">
                  Suivant
                </Button>
              </div>
            </section>
          )}

          {/* Step 2: Livraison & Facturation */}
          {step === 2 && (
            <section className="animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Adresse de Livraison</h3>
              <div className="space-y-4">
                <Input
                  label="Adresse (Ligne 1) *"
                  name="shippingAddressLine1"
                  value={formValues.shippingAddressLine1}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Adresse (Ligne 2)"
                  name="shippingAddressLine2"
                  value={formValues.shippingAddressLine2}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Code Postal *"
                    name="shippingPostalCode"
                    value={formValues.shippingPostalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Ville *"
                    name="shippingCity"
                    value={formValues.shippingCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  label="Pays"
                  name="shippingCountry"
                  value={formValues.shippingCountry}
                  onChange={handleInputChange}
                  disabled
                />
                <Input
                  label="Contact Livraison (si différent)"
                  name="shippingContactName"
                  value={formValues.shippingContactName}
                  onChange={handleInputChange}
                  placeholder="Même que contact principal"
                />
                <Input
                  label="Notes de livraison (horaires, accès...)"
                  name="shippingNotes"
                  value={formValues.shippingNotes}
                  onChange={handleInputChange}
                />
              </div>

              {/* Billing Address Toggle */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-900">
                    Adresse de facturation identique à l'adresse de livraison
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4 mt-4 pl-4 border-l-2 border-gray-200 animate-fadeIn">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de Facturation</h3>
                    <Input
                      label="Adresse (Ligne 1) *"
                      name="billingAddressLine1"
                      value={formValues.billingAddressLine1}
                      onChange={handleInputChange}
                      required={!sameAsShipping}
                    />
                    <Input
                      label="Adresse (Ligne 2)"
                      name="billingAddressLine2"
                      value={formValues.billingAddressLine2}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Code Postal *"
                        name="billingPostalCode"
                        value={formValues.billingPostalCode}
                        onChange={handleInputChange}
                        required={!sameAsShipping}
                      />
                      <Input
                        label="Ville *"
                        name="billingCity"
                        value={formValues.billingCity}
                        onChange={handleInputChange}
                        required={!sameAsShipping}
                      />
                    </div>
                    <Input
                      label="Pays"
                      name="billingCountry"
                      value={formValues.billingCountry}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  Retour
                </Button>
                <Button type="button" onClick={nextStep} size="lg" className="flex-1">
                  Suivant
                </Button>
              </div>
            </section>
          )}

          {/* Step 3: Meta & Validation */}
          {step === 3 && (
            <section className="animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Informations Complémentaires</h3>
              <div className="space-y-4">
                <Input
                  label="Date de livraison souhaitée (indicatif)"
                  type="date"
                  name="desiredDeliveryDate"
                  value={formValues.desiredDeliveryDate}
                  onChange={handleInputChange}
                />
                <Input
                  label="Référence interne (PO, etc.)"
                  name="internalReference"
                  value={formValues.internalReference}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Notes additionnelles</label>
                  <textarea
                    name="additionalNotes"
                    value={formValues.additionalNotes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Commentaires, instructions spéciales..."
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  Retour
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : 'Valider ma demande de devis'}
                </Button>
              </div>
            </section>
          )}
        </form>
      </Card>
    </div>
  )
}
