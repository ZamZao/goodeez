export const Testimonials = () => {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-goodeez-blue-900 mb-4">
          Ils nous font confiance
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-goodeez-blue-50 p-8 rounded-3xl border border-goodeez-blue-50">
          <div className="flex gap-1 text-goodeez-yellow-400 mb-4">★★★★★</div>
          <p className="text-lg text-goodeez-blue-700 mb-6 italic">
            "Avant, je passais mes vendredis à faire des cartons. Maintenant, tout est automatisé. Les nouveaux employés reçoivent leur pack chez eux avant même leur premier jour. C'est magique."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-goodeez-blue-200 rounded-full flex items-center justify-center font-bold text-goodeez-blue-700">
              JL
            </div>
            <div>
              <div className="font-bold text-goodeez-blue-900">Julie L.</div>
              <div className="text-sm text-goodeez-blue-500">Office Manager @ TechStart</div>
            </div>
          </div>
        </div>

        <div className="bg-goodeez-blue-50 p-8 rounded-3xl border border-goodeez-blue-50">
          <div className="flex gap-1 text-goodeez-yellow-400 mb-4">★★★★★</div>
          <p className="text-lg text-goodeez-blue-700 mb-6 italic">
            "La qualité des produits est top, et le portail est super simple à utiliser. Nos équipes remote se sentent enfin connectées à la culture de l'entreprise."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-goodeez-yellow-200 rounded-full flex items-center justify-center font-bold text-goodeez-blue-700">
              TM
            </div>
            <div>
              <div className="font-bold text-goodeez-blue-900">Thomas M.</div>
              <div className="text-sm text-goodeez-blue-500">HR Director @ ScaleUp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
