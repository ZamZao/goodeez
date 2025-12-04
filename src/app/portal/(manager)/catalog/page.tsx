import { CURATED_PACKS, CATEGORIES } from '@/lib/catalog-data';

export default function CatalogPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catalogue</h1>
          <p className="text-gray-500 mt-2">Créez votre stock ou choisissez un pack clé-en-main.</p>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          + Créer un produit sur-mesure
        </button>
      </div>

      {/* Section 1: Curated Packs (The "Inspiration" Layer) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">✨ Packs Recommandés</h2>
          <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Voir tous les packs</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CURATED_PACKS.map((pack) => (
            <div key={pack.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              {/* Image Placeholder */}
              <div className={`h-48 ${pack.image} flex items-center justify-center relative`}>
                <span className="text-4xl opacity-20">📦</span>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-900">
                  {pack.price}€ / unit
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {pack.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{pack.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{pack.description}</p>
                
                <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                  Inclus: {pack.items.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Categories (The "Builder" Layer) */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Parcourir par catégorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:border-blue-500 hover:ring-1 hover:ring-blue-500 cursor-pointer transition-all group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <h3 className="font-medium text-gray-900">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Seasonal / Trending */}
      <section className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
            COLLECTION HIVER 2025
          </span>
          <h2 className="text-3xl font-bold mb-4">Préparez la fin d'année</h2>
          <p className="text-indigo-200 mb-8">
            Hoodies premium, plaids, et cadeaux de fin d'année pour remercier vos équipes.
            Commandez avant le 15 Nov pour une livraison garantie.
          </p>
          <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
            Voir la collection Hiver
          </button>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-20 -top-40 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
      </section>

    </div>
  );
}
