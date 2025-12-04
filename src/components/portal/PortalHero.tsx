import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Package } from 'lucide-react';

interface PortalHeroProps {
  tenantId: string;
  companyName?: string;
}

export const PortalHero = ({ tenantId, companyName = 'Votre Entreprise' }: PortalHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500 blur-3xl mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 blur-3xl mix-blend-screen" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500 blur-3xl mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Boutique De Merch Interne Réservée aux Employés
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Bienvenue sur le store <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{companyName}</span>
            </h1>
            <p className="text-lg leading-8 text-gray-300 mb-8">
              Votre espace dédié pour commander vos équipements, welcome packs et cadeaux d'entreprise. 
              Une expérience fluide, pensée pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/portal/${tenantId}/packs`}>
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-0">
                  <Package className="mr-2 h-5 w-5" />
                  Voir les Packs
                </Button>
              </Link>
              <Link href={`/portal/${tenantId}/catalogue`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Tout le catalogue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Abstract Visual / 3D feel */}
          <div className="relative hidden lg:block">
             <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="aspect-[4/3] rounded-xl bg-slate-800/50 overflow-hidden relative flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                   <div className="text-center p-8 relative z-10">
                      <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 shadow-2xl shadow-blue-500/20 flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Welcome Pack Premium</h3>
                      <p className="text-sm text-gray-400">Le kit d'accueil ultime pour vos nouveaux talents.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
