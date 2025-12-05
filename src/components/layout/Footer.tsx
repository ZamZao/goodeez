import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-goodeez-blue-50 border-t border-goodeez-blue-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-goodeez-blue-500">
              La plateforme logistique tout-en-un pour les équipes RH et Office Managers.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-goodeez-blue-900 mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-goodeez-blue-700">
              <li><a href="/#how-it-works" className="hover:text-goodeez-blue-600">Comment ça marche</a></li>
              <li><a href="/#services" className="hover:text-goodeez-blue-600">Services</a></li>
              <li><a href="/#pricing" className="hover:text-goodeez-blue-600">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-goodeez-blue-900 mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-goodeez-blue-700">
              <li><a href="/portal/demo" className="hover:text-goodeez-blue-600">Démo</a></li>
              <li><a href="/onboarding" className="hover:text-goodeez-blue-600">Créer un portail</a></li>
              <li><a href="#" className="hover:text-goodeez-blue-600">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-goodeez-blue-900 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-goodeez-blue-700">
              <li><a href="#" className="hover:text-goodeez-blue-600">Mentions légales</a></li>
              <li><a href="#" className="hover:text-goodeez-blue-600">Confidentialité</a></li>
              <li><a href="#" className="hover:text-goodeez-blue-600">CGV</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-goodeez-blue-100 pt-8 text-center text-goodeez-blue-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Goodeez. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
