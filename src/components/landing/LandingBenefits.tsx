import { Box, Truck, Zap } from 'lucide-react';

const BENEFITS = [
  {
    icon: Box,
    title: "Zéro gestion de stock",
    description: "Fini le placard rempli de t-shirts. Nous stockons tout pour vous et vous ne payez que ce que vous utilisez."
  },
  {
    icon: Zap,
    title: "Packs d’onboarding automatiques",
    description: "Connectez votre HRIS ou commandez en un clic. Le pack arrive sur le bureau du nouveau venu le jour J."
  },
  {
    icon: Truck,
    title: "Expédition directe aux collaborateurs",
    description: "Au bureau ou en télétravail, nous livrons chaque collaborateur individuellement partout dans le monde."
  }
];

export default function LandingBenefits() {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Pourquoi un portail de merch plutôt que des commandes à la main ?
          </h2>
          <p className="text-lg text-slate-600">
            Goodeez transforme la corvée logistique en une expérience fluide pour vos équipes RH et Office Management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {BENEFITS.map((benefit, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8 transition hover:bg-blue-50/50">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[var(--brand-primary)] mb-6">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
