export const ValueProp = () => {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 bg-goodeez-blue-50 rounded-3xl p-8 min-h-[400px] flex items-center justify-center border border-goodeez-blue-100">
          {/* Placeholder for Dashboard UI */}
          <div className="bg-white rounded-xl shadow-xl shadow-goodeez-blue-100 p-6 w-full max-w-md border border-goodeez-blue-50">
            <div className="flex items-center justify-between mb-6 border-b border-goodeez-blue-50 pb-4">
              <div className="font-bold text-goodeez-blue-900">Stock Disponible</div>
              <div className="text-green-500 text-sm font-medium">En direct</div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-goodeez-blue-100 rounded-lg flex items-center justify-center">👕</div>
                  <span className="text-goodeez-blue-700">T-shirts (L)</span>
                </div>
                <span className="font-bold text-goodeez-blue-900">142</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-goodeez-yellow-100 rounded-lg flex items-center justify-center">📓</div>
                  <span className="text-goodeez-blue-700">Notebooks</span>
                </div>
                <span className="font-bold text-goodeez-blue-900">85</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-goodeez-blue-200 rounded-lg flex items-center justify-center">☕</div>
                  <span className="text-goodeez-blue-700">Mugs</span>
                </div>
                <span className="font-bold text-red-500">12</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-goodeez-blue-900">
            Votre inventaire, piloté en pilote automatique
          </h2>
          <p className="text-lg text-goodeez-blue-700">
            Ne vous souciez plus jamais du stock. Notre plateforme vous donne une visibilité totale et vous alerte quand il faut recommander.
          </p>
          
          <ul className="space-y-4 mt-4">
            {[
              "Stockage sécurisé dans nos entrepôts",
              "Inventaire mis à jour en temps réel",
              "Alertes de stock bas automatiques",
              "Réassort simplifié en un clic"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
