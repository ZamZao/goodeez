export const SocialProof = () => {
  return (
    <section className="py-10 border-y border-goodeez-blue-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm font-bold text-goodeez-blue-400 uppercase tracking-wider mb-8">
          Déjà adopté par plus de 50 équipes RH et Office Managers
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
          {/* Placeholder Logos */}
          <div className="text-xl font-bold text-goodeez-blue-300">TECHSTART</div>
          <div className="text-xl font-bold text-goodeez-blue-300">GROWTH.IO</div>
          <div className="text-xl font-bold text-goodeez-blue-300">SCALEUP</div>
          <div className="text-xl font-bold text-goodeez-blue-300">UNICORN</div>
          <div className="text-xl font-bold text-goodeez-blue-300">NEXTBIG</div>
        </div>
      </div>
    </section>
  );
};
