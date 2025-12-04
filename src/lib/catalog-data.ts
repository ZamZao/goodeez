export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  minQuantity: number;
};

export type Pack = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string; // CSS color or placeholder for now
  items: string[];
  tags: string[];
};

export const CATEGORIES = [
  { id: 'apparel', name: 'Textile', icon: '👕' },
  { id: 'drinkware', name: 'Drinkware', icon: '☕' },
  { id: 'office', name: 'Bureau', icon: '📒' },
  { id: 'tech', name: 'Tech', icon: '🎧' },
  { id: 'bags', name: 'Sacs', icon: '🎒' },
];

export const CURATED_PACKS: Pack[] = [
  {
    id: 'welcome-pack-classic',
    title: 'The Classic Welcome',
    description: "L'essentiel pour un onboarding réussi. Simple, efficace, premium.",
    price: 45,
    image: 'bg-blue-100',
    items: ['Hoodie Premium', 'Carnet Moleskine', 'Stylo Metal', 'Stickers'],
    tags: ['Best Seller', 'Onboarding'],
  },
  {
    id: 'remote-worker',
    title: 'Remote Ready',
    description: "Tout pour le confort des équipes en télétravail.",
    price: 65,
    image: 'bg-green-100',
    items: ['Gourde Isotherme', 'Support Laptop', 'Webcam Cover', 'Sweat Confort'],
    tags: ['Remote', 'Tech'],
  },
  {
    id: 'eco-friendly',
    title: 'Green & Clean',
    description: "100% matériaux recyclés ou durables. Pour les entreprises engagées.",
    price: 55,
    image: 'bg-emerald-100',
    items: ['Tote Bag Bio', 'Gourde Verre', 'Crayons Plantables', 'Bento Box'],
    tags: ['RSE', 'Eco'],
  },
  {
    id: 'vip-pack',
    title: 'Executive VIP',
    description: "Pour vos clients clés ou le management. Finitions luxe.",
    price: 120,
    image: 'bg-slate-200',
    items: ['Veste Patagonia', 'Sac à dos Herschel', 'Powerbank Rapide'],
    tags: ['VIP', 'Cadeau Client'],
  },
];
