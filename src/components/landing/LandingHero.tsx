import Image from 'next/image';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 md:pt-16 md:pb-20">
        <div className="md:grid md:grid-cols-2 md:gap-10 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left mb-10 md:mb-0">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
              Pensé pour RH & Office Managers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Votre boutique de merch, <br className="hidden md:block" />
              <span className="text-[var(--brand-primary)]">prête en 5 minutes.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Portail brandé, packs d’onboarding, cadeaux collaborateurs.
              Vos équipes commandent, vos fournisseurs expédient. 
              <br />
              <strong>Zéro stock, zéro Excel.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="bg-[var(--brand-primary)] text-white rounded-full px-8 hover:shadow-lg hover:scale-105 transition">
                Parcourir le catalogue
              </Button>
              <Link href="/portal/demo" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 transition shadow-sm">
                Voir un exemple de portail
              </Link>
            </div>
          </div>

          {/* Right Column - Mockup */}
          <div className="relative">
            <div className="relative rounded-3xl bg-white shadow-2xl p-4 md:p-6 overflow-hidden border border-slate-100 transform rotate-1 hover:rotate-0 transition duration-500">
              {/* Mockup Header */}
              <div className="mb-4 border-b border-slate-100 pb-4">
                {/* Browser bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-50 rounded-full px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    votreentreprise.goodeez.com/portal
                  </div>
                </div>

                {/* Portal info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-blue-50 flex items-center justify-center text-[11px] font-semibold text-blue-700">
                      AC
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        Portail merch · votre entreprise
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Packs d’onboarding, cadeaux & events
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-900 text-white text-[10px] px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Portail actif
                  </div>
                </div>
              </div>

              {/* Mockup Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square bg-slate-50 rounded-xl overflow-hidden group">
                  <div className="absolute top-2 left-2 z-10 bg-[var(--brand-primary)] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    Pack Onboarding
                  </div>
                  <Image
                    src="/images/herolanding/hoodie.png"
                    alt="Hoodie Mockup"
                    fill
                    className="object-contain p-4 drop-shadow-xl"
                  />
                </div>
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/herolanding/totebag.png"
                    alt="Tote Bag Mockup"
                    fill
                    className="object-contain p-4 drop-shadow-xl"
                  />
                </div>
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/herolanding/bottle.png"
                    alt="Bottle Mockup"
                    fill
                    className="object-contain p-4 drop-shadow-xl"
                  />
                </div>
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/herolanding/casquette.png"
                    alt="Cap Mockup"
                    fill
                    className="object-contain p-4 drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Mockup Footer Badge */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white text-xs px-4 py-2 shadow-lg whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Livraison à vos agences ou directe aux collaborateurs
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </div>
        </div>
      </div>
    </section>
  );
}
