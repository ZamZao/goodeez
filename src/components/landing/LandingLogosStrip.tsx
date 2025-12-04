export default function LandingLogosStrip() {
  return (
    <section className="bg-white py-8 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm font-medium text-slate-500 mb-6">
          Ils utilisent déjà des portails de merch personnalisés
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition duration-500">
          {/* Placeholder Logos - Using text for now, could be SVGs */}
          <div className="text-xl font-bold text-slate-400">ACME Corp</div>
          <div className="text-xl font-bold text-slate-400">Globex</div>
          <div className="text-xl font-bold text-slate-400">Soylent</div>
          <div className="text-xl font-bold text-slate-400">Initech</div>
          <div className="text-xl font-bold text-slate-400">Umbrella</div>
          <div className="text-xl font-bold text-slate-400">Stark Ind</div>
        </div>
      </div>
    </section>
  );
}
