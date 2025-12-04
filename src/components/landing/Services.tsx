export const Services = () => {
  const services = [
    {
      title: "Sourcing & Production",
      description: "Accès à notre catalogue de produits premium et éco-responsables, personnalisables à votre image.",
      icon: "🎨"
    },
    {
      title: "Stockage Sécurisé",
      description: "Vos produits sont stockés dans nos entrepôts sécurisés, prêts à être expédiés à la demande.",
      icon: "🏭"
    },
    {
      title: "Kitting sur-mesure",
      description: "Nous assemblons vos kits (Welcome Packs, Event Packs) avec soin et précision.",
      icon: "✨"
    },
    {
      title: "Expédition Mondiale",
      description: "Envoi individuel ou en gros vers vos bureaux ou directement chez vos collaborateurs.",
      icon: "✈️"
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-goodeez-blue-900 mb-4">
          Une suite complète de services
        </h2>
        <p className="text-lg text-goodeez-blue-700 max-w-2xl mx-auto">
          Tout ce dont vous avez besoin pour gérer votre merchandising, au même endroit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="flex gap-6 p-6 rounded-2xl hover:bg-goodeez-blue-50 transition-colors">
            <div className="text-4xl bg-white shadow-md w-16 h-16 flex items-center justify-center rounded-2xl shrink-0">
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-goodeez-blue-900 mb-2">{service.title}</h3>
              <p className="text-goodeez-blue-700 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
