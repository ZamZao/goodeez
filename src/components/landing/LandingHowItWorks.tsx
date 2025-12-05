export default function LandingHowItWorks() {
  const steps = [
    {
      title: "Votre portail est créé en 10 secondes",
      description: "Uploadez votre logo. Boom : votre boutique brandée est prête, avec packs & produits pré-configurés."
    },
    {
      title: "Vos équipes commandent en autonomie",
      description: "Partagez le lien. Managers & collaborateurs commandent leurs packs selon le budget alloué. Plus d’emails, plus d’Excel."
    },
    {
      title: "Nous produisons & expédions en 48h",
      description: "Production à la demande ou via votre stock tampon. Livraison suivie partout en Europe."
    }
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Votre portail brandé est prêt instantanément. Vos équipes commandent. Nous produisons & expédions. Simple, rapide, sans gestion interne.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300 border border-slate-100">
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-lg font-bold shadow-lg ring-4 ring-slate-50">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">{step.title}</h3>
              <p className="text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
