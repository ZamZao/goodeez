export const FAQ = () => {
  const faqs = [
    {
      q: "Combien de temps pour mettre en place mon portail ?",
      a: "C'est immédiat. Vous pouvez créer votre compte et accéder à votre portail de démo en quelques secondes. La configuration de vos produits personnalisés prend généralement 1 à 2 semaines (production incluse)."
    },
    {
      q: "Y a-t-il un minimum de commande ?",
      a: "Pour le stockage et l'expédition, non. Pour la production de produits personnalisés, les minimums dépendent des articles (souvent à partir de 50 unités)."
    },
    {
      q: "Puis-je stocker des produits que j'ai déjà ?",
      a: "Oui ! Vous pouvez nous envoyer votre stock existant. Nous l'intégrons dans notre inventaire et vous pouvez commencer à l'expédier via la plateforme."
    },
    {
      q: "Livrez-vous à l'international ?",
      a: "Absolument. Nous expédions dans plus de 150 pays et gérons les formalités douanières pour vous."
    }
  ];

  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-goodeez-blue-900 mb-4">
          Questions fréquentes
        </h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-goodeez-blue-100 rounded-2xl p-6 hover:border-goodeez-blue-300 transition-colors bg-white">
            <h3 className="text-lg font-bold text-goodeez-blue-900 mb-2">
              {faq.q}
            </h3>
            <p className="text-goodeez-blue-700">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
