export default function LandingHowItWorks() {
  const steps = [
    {
      title: "On crée votre portail brandé",
      description: "Sélectionnez vos produits, validez vos designs. Nous configurons votre boutique privée en quelques jours."
    },
    {
      title: "Vos équipes commandent leurs packs",
      description: "Donnez accès à vos managers ou employés. Ils commandent en autonomie selon les budgets alloués."
    },
    {
      title: "Nous gérons production & livraison",
      description: "Nous produisons à la demande ou piochons dans votre stock, et expédions avec suivi en 48h."
    }
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Comment ça marche ?</h2>
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
