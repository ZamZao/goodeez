'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function CheckoutSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const tenant = params.tenant as string
  const email = searchParams.get('email')

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Votre demande de devis a bien été envoyée.
        </h1>
        
        <p className="text-lg text-gray-600 mb-4">
          Nous vous avons envoyé un email de confirmation à <strong>{email || 'votre adresse email'}</strong>.
        </p>
        
        <p className="text-gray-600 mb-8">
          Vous recevrez votre devis détaillé ainsi qu’un lien de paiement sécurisé dans un second temps.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span>⏱️</span> Rappel des délais estimés
          </h3>
          <p className="text-blue-800">
            Actuellement entre <strong>5 et 6 semaines</strong> après validation du paiement et des visuels.
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mb-8">
          Pour toute question : <a href="mailto:support@onestopmerch.com" className="text-blue-600 hover:underline">support@onestopmerch.com</a>
        </p>

        <Link href={`/portal/${tenant}`}>
          <Button size="lg">
            Retour à l'accueil
          </Button>
        </Link>
      </Card>
    </div>
  )
}
