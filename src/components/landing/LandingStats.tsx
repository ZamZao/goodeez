export default function LandingStats() {
  return (
    <section className="bg-slate-900 text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="md:flex md:items-center md:justify-between gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              On expédie du merch tous les jours pour des équipes partout en Europe.
            </h2>
            <p className="text-slate-400 text-lg">
              Rejoignez les entreprises qui ont modernisé leur gestion de swag. 
              Fiabilité, rapidité et qualité sont nos maîtres-mots.
            </p>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">15k+</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">Packs envoyés</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">12</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">Pays livrés</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">4.9/5</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">Note moyenne</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">24h</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">Expédition</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
