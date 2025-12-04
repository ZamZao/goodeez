import Link from 'next/link';
import Button from '@/components/ui/Button';

export const Pricing = () => {
  return (
    <section className="py-20 bg-goodeez-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Une tarification simple et transparente
        </h2>
        <p className="text-xl text-goodeez-blue-100 mb-12 max-w-2xl mx-auto">
          Pas de frais cachés, pas d'abonnement mensuel. Vous ne payez que ce que vous utilisez.
        </p>

        <div className="bg-white text-goodeez-blue-900 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-goodeez-blue-50">
            <div className="px-4 py-4">
              <div className="text-lg font-semibold text-goodeez-blue-500 mb-2">Portail & Stockage</div>
              <div className="text-4xl font-bold text-goodeez-blue-900 mb-2">Gratuit</div>
              <p className="text-sm text-goodeez-blue-500">Accès illimité à la plateforme</p>
            </div>
            <div className="px-4 py-4">
              <div className="text-lg font-semibold text-goodeez-blue-500 mb-2">Produits</div>
              <div className="text-4xl font-bold text-goodeez-blue-900 mb-2">Sur devis</div>
              <p className="text-sm text-goodeez-blue-500">Prix dégressifs selon volume</p>
            </div>
            <div className="px-4 py-4">
              <div className="text-lg font-semibold text-goodeez-blue-500 mb-2">Expédition</div>
              <div className="text-4xl font-bold text-goodeez-blue-900 mb-2">Réel</div>
              <p className="text-sm text-goodeez-blue-500">Frais de port transporteur</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-goodeez-blue-50">
            <Link href="/onboarding">
              <Button className="bg-goodeez-blue-600 hover:bg-goodeez-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg w-full md:w-auto">
                Commencer gratuitement
              </Button>
            </Link>
            <p className="mt-4 text-sm text-goodeez-blue-500">
              Aucune carte de crédit requise pour démarrer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
