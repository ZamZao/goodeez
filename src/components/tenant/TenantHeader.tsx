'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PortalConfig } from '@/lib/utils/types'
import { useCart } from '@/contexts/CartContext'

interface TenantHeaderProps {
  portal: PortalConfig
}

export default function TenantHeader({ portal }: TenantHeaderProps) {
  const { items } = useCart()
  const params = useParams()
  const tenant = params?.tenant as string

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-950/50 backdrop-blur-md supports-[backdrop-filter]:bg-blue-950/30">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/portal/${tenant}`} className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={portal.logoUrl}
                alt={`${portal.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white tracking-tight">{portal.name}</h1>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Store Employé</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-6">
            <Link 
              href={`/portal/${tenant}`}
              className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Catalogue
            </Link>
            <Link 
              href={`/portal/${tenant}/checkout`}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white border border-white/5"
            >
              <svg 
                className="w-5 h-5 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm ring-2 ring-blue-950">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
