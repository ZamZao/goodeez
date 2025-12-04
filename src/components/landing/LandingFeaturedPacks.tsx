import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const PACKS = [
  {
    id: 'pack-onboarding',
    name: 'Pack Onboarding',
    description: 'Le kit essentiel pour accueillir vos nouvelles recrues.',
    price: '49.00',
    image: '/portals/demo/pack-onboarding.jpg', // Placeholder path
    badge: 'Best Seller'
  },
  {
    id: 'pack-teambuilding',
    name: 'Pack Team Building',
    description: 'Tout pour vos séminaires et événements d’équipe.',
    price: '35.00',
    image: '/portals/demo/pack-event.jpg',
  },
  {
    id: 'pack-remote',
    name: 'Pack Remote Work',
    description: 'Confort et productivité pour vos équipes en télétravail.',
    price: '65.00',
    image: '/portals/demo/pack-remote.jpg',
  }
];

export default function LandingFeaturedPacks() {
  return (
    <section id="packs" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Packs prêts pour vos équipes
            </h2>
            <p className="text-slate-600 text-lg">
              Des ensembles curatés pour chaque moment de la vie d'entreprise.
            </p>
          </div>
          <Link href="/portal/demo" className="text-[var(--brand-primary)] font-medium hover:underline flex items-center gap-1">
            Voir tous les packs <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PACKS.map((pack) => (
            <div key={pack.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col overflow-hidden border border-slate-100">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {/* Placeholder for image if not found */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-100">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                {/* If we had real images:
                <Image src={pack.image} alt={pack.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                */}
                {pack.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-400 text-yellow-900 border-none font-bold shadow-sm">
                      {pack.badge}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pack.name}</h3>
                <p className="text-slate-600 mb-4 flex-1">{pack.description}</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <span className="text-2xl font-bold text-slate-900">{pack.price} €</span>
                  <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                    Voir le détail
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
