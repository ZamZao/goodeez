import Card from '@/components/ui/Card';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Créez votre portail interne",
      description: "Configurez votre boutique privée en quelques clics. Ajoutez vos produits brandés et définissez qui peut commander.",
      icon: "🖥️"
    },
    {
      number: "02",
      title: "Les collaborateurs commandent",
      description: "Fini les fichiers Excel. Vos employés choisissent leurs tailles et renseignent leur adresse de livraison directement.",
      icon: "🛒"
    },
    {
      number: "03",
      title: "Nous produisons et expédions",
      description: "On s'occupe de tout : stockage, kitting, emballage premium et expédition suivie partout dans le monde.",
      icon: "📦"
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Comment ça marche ?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Une logistique simplifiée pour vous, une expérience magique pour vos équipes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="p-8 border border-goodeez-blue-100 shadow-lg shadow-goodeez-blue-50 hover:shadow-xl hover:shadow-goodeez-blue-100 transition-shadow bg-white rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-9xl font-bold text-goodeez-blue-50 opacity-50 select-none">
              {step.number}
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-6 bg-goodeez-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl text-goodeez-blue-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-goodeez-blue-900 mb-3">
                {step.title}
              </h3>
              <p className="text-goodeez-blue-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
