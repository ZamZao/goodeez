export const ProductGallery = () => {
  const useCases = [
    {
      title: "Welcome Packs",
      description: "L'expérience d'arrivée parfaite pour vos nouvelles recrues.",
      color: "bg-goodeez-blue-100",
      emoji: "🎒"
    },
    {
      title: "Équipes Remote",
      description: "Envoyez du matériel et des cadeaux partout dans le monde.",
      color: "bg-goodeez-yellow-100",
      emoji: "🌍"
    },
    {
      title: "Célébrations",
      description: "Anniversaires, fin d'année, milestones d'entreprise.",
      color: "bg-goodeez-blue-200",
      emoji: "🎉"
    },
    {
      title: "Équipement IT",
      description: "Gestion du matériel informatique et des retours.",
      color: "bg-goodeez-yellow-200",
      emoji: "💻"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-goodeez-blue-900 mb-4">
            Pour tous vos besoins d'équipe
          </h2>
          <p className="text-lg text-goodeez-blue-700 max-w-2xl mx-auto">
            Du premier jour à la célébration des 10 ans, nous vous accompagnons à chaque étape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`rounded-3xl p-8 aspect-square ${item.color} mb-4 flex items-center justify-center text-6xl shadow-sm group-hover:shadow-lg group-hover:shadow-goodeez-blue-100 transition-all transform group-hover:-translate-y-1`}>
                {item.emoji}
              </div>
              <h3 className="text-xl font-bold text-goodeez-blue-900 mb-1">{item.title}</h3>
              <p className="text-sm text-goodeez-blue-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
