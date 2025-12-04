import Link from 'next/link';
import Image from 'next/image';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <Image 
                src="/images/logos/Goodeez2.jpg" 
                alt="Goodeez Icon" 
                width={32} 
                height={32} 
                className="h-8 w-auto object-contain rounded-sm"
              />
              <Image 
                src="/images/logos/Goodeez3.jpg" 
                alt="Goodeez Logo" 
                width={100} 
                height={32} 
                className="h-8 w-auto object-contain rounded-sm"
              />
            </Link>
            <p className="text-slate-400 max-w-xs">
              La plateforme de gestion de merch préférée des RH et Office Managers.
              Simplifiez vos commandes, maîtrisez votre budget.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition">Fonctionnalités</Link></li>
              <li><Link href="#packs" className="hover:text-white transition">Packs</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Tarifs</Link></li>
              <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition">CGU</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Confidentialité</Link></li>
              <li><Link href="/legal" className="hover:text-white transition">Mentions légales</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Goodeez. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
