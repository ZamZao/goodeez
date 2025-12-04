import Link from 'next/link';
import Button from '@/components/ui/Button';

export const Hero = () => {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl font-bold text-goodeez-blue-900 leading-tight">
            Gérez vos Welcome Packs et équipements sans lever le petit doigt
          </h1>
          <p className="text-lg text-goodeez-blue-700">
            La plateforme logistique tout-en-un pour les équipes RH et Office Managers. 
            Fini les cartons au bureau : nous gérons la production, le stockage et l'expédition de vos produits brandés.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/onboarding">
              <Button variant="primary" className="bg-goodeez-blue-600 hover:bg-goodeez-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg h-auto shadow-lg shadow-goodeez-blue-200">
                Créer mon portail
              </Button>
            </Link>
            <Link href="/portal/demo">
              <Button variant="outline" className="border-2 border-goodeez-blue-100 bg-white hover:bg-goodeez-blue-50 text-goodeez-blue-900 rounded-xl px-8 py-4 text-lg h-auto">
                Voir la démo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-goodeez-blue-500 font-medium">
            Portail gratuit · Pas d'abonnement · Mise en place en 5 min
          </p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden border-4 border-goodeez-blue-100 shadow-2xl shadow-goodeez-blue-100">
          {/* Placeholder for Product Collage */}
          <div className="absolute inset-0 bg-gradient-to-br from-goodeez-blue-50 to-goodeez-yellow-50 opacity-50"></div>
          <div className="relative z-10 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-goodeez-blue-100 mb-4 transform -rotate-3 inline-block border border-goodeez-blue-50">
              <span className="block text-4xl mb-2">🎒</span>
              <span className="font-bold text-goodeez-blue-900">Welcome Pack</span>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-lg shadow-goodeez-blue-100 transform rotate-6 border border-goodeez-blue-50">
                <span className="block text-2xl">👕</span>
                <span className="text-sm font-medium text-goodeez-blue-800">Hoodies</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-lg shadow-goodeez-blue-100 transform -rotate-2 border border-goodeez-blue-50">
                <span className="block text-2xl">💻</span>
                <span className="text-sm font-medium text-goodeez-blue-800">IT Gear</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
