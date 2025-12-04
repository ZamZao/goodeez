'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { PortalConfig } from '@/lib/utils/types';
import Button from '@/components/ui/Button';

interface PortalNavbarProps {
  tenantId: string;
  portalConfig?: PortalConfig;
}

export const PortalNavbar = ({ tenantId, portalConfig }: PortalNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => {
    return pathname === path ? 'text-white font-semibold' : 'text-gray-300 hover:text-white';
  };

  const baseUrl = `/portal/${tenantId}`;
  const isDemo = tenantId === 'demo' || tenantId === 'goodeez-demo-portal';

  return (
    <>
      {isDemo && (
        <div className="bg-blue-600 text-white px-4 py-2.5 text-sm flex flex-col sm:flex-row items-center justify-between gap-2 relative z-[60]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-medium">🚀 Mode Démonstration</span>
            <span className="hidden sm:inline text-blue-200">|</span>
            <span className="text-blue-100">Découvrez la puissance d'une boutique Goodeez.</span>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/" className="text-white hover:text-blue-100 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors">
               Retour à l'accueil
             </Link>
             <button 
               className="bg-white text-blue-600 hover:bg-blue-50 text-xs py-2 px-4 rounded-full font-bold whitespace-nowrap transition-all transform hover:scale-105 shadow-sm"
               onClick={() => router.push('/onboarding')}
             >
               Créer mon portail
             </button>
          </div>
        </div>
      )}
      <nav className={`sticky top-0 z-50 border-b border-white/10 bg-blue-950/50 backdrop-blur-md ${isDemo ? 'top-0' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={baseUrl} className="flex items-center gap-2">
          {portalConfig?.logoUrl ? (
            <div className="relative h-8 w-8">
              <Image 
                src={portalConfig.logoUrl} 
                alt={portalConfig.name} 
                fill 
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              {portalConfig?.name?.charAt(0) || 'G'}
            </div>
          )}
          <span className="text-xl font-bold text-white">{portalConfig?.name || 'Goodeez Portal'}</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={baseUrl} className={`text-sm transition-colors ${isActive(baseUrl)}`}>
            Home
          </Link>
          <Link href={`${baseUrl}/packs`} className={`text-sm transition-colors ${isActive(`${baseUrl}/packs`)}`}>
            Packs
          </Link>
          <Link href={`${baseUrl}/collections`} className={`text-sm transition-colors ${isActive(`${baseUrl}/collections`)}`}>
            Collections
          </Link>
          <Link href={`${baseUrl}/catalogue`} className={`text-sm transition-colors ${isActive(`${baseUrl}/catalogue`)}`}>
            Catalogue
          </Link>
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Support
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center gap-4">
          {isDemo ? (
            <div 
              className="relative p-2 text-gray-300 hover:text-white cursor-pointer group transition-colors"
              onClick={() => alert("Ceci est une démo. Créez votre portail pour activer le paiement !")}
              title="Créez votre portail pour activer le paiement"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </div>
          ) : (
            <Link href={`${baseUrl}/checkout`} className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};
