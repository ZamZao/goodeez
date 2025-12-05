import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-goodeez-blue-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
            <Image
              src="/images/logos/Goodeez2.jpg"
              alt="Goodeez Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold text-goodeez-blue-900">Goodeez</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-sm font-medium text-goodeez-blue-700 hover:text-goodeez-blue-900">
            Comment ça marche
          </Link>
          <Link href="/#services" className="text-sm font-medium text-goodeez-blue-700 hover:text-goodeez-blue-900">
            Services
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-goodeez-blue-700 hover:text-goodeez-blue-900">
            Tarifs
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/portal/demo"
            className="hidden text-sm font-medium text-goodeez-blue-700 hover:text-goodeez-blue-900 sm:block"
          >
            Voir démo
          </Link>
          <Link href="/onboarding">
            <Button className="bg-goodeez-blue-600 hover:bg-goodeez-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm">
              <span className="hidden sm:inline">Créer mon portail</span>
              <span className="sm:hidden">Portail</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
