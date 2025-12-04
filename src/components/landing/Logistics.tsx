export const Logistics = () => {
  return (
    <section className="py-20 bg-goodeez-blue-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expédiez partout, sans frontières
          </h2>
          <p className="text-lg text-goodeez-blue-100 max-w-2xl mx-auto">
            Nous gérons les douanes, les taxes et la logistique internationale pour que vous n'ayez pas à le faire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-goodeez-blue-800/50 border border-goodeez-blue-700 backdrop-blur-sm">
            <div className="text-4xl font-bold text-goodeez-yellow-400 mb-2">150+</div>
            <div className="text-goodeez-blue-200">Pays desservis</div>
          </div>
          <div className="p-6 rounded-2xl bg-goodeez-blue-800/50 border border-goodeez-blue-700 backdrop-blur-sm">
            <div className="text-4xl font-bold text-goodeez-yellow-400 mb-2">24/48h</div>
            <div className="text-goodeez-blue-200">Préparation de commande</div>
          </div>
          <div className="p-6 rounded-2xl bg-goodeez-blue-800/50 border border-goodeez-blue-700 backdrop-blur-sm">
            <div className="text-4xl font-bold text-goodeez-yellow-400 mb-2">99.8%</div>
            <div className="text-goodeez-blue-200">Précision logistique</div>
          </div>
        </div>
      </div>
    </section>
  );
};
