import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1">
            <Image 
              src="/images/logos/goodeezlogo.png" 
              alt="Goodeez Icon" 
              width={32} 
              height={32} 
              className="h-8 w-auto object-contain"
            />
            <Image 
              src="/images/logos/goodeez.png" 
              alt="Goodeez Logo" 
              width={150} 
              height={16} 
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/#packs" className="hover:text-slate-900 transition">Packs</Link>
          <Link href="/#features" className="hover:text-slate-900 transition">Fonctionnalités</Link>
          <Link href="/#how-it-works" className="hover:text-slate-900 transition">Comment ça marche</Link>
          <Link href="/#faq" className="hover:text-slate-900 transition">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/portal/demo" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900">
            Voir une démo
          </Link>
          <Link href="/onboarding">
            <Button className="bg-[var(--brand-primary)] text-white rounded-full hover:shadow-md transition hover:scale-105">
              Créer mon portail
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
