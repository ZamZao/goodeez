import { Product } from '@/lib/utils/types';

export const products: Product[] = [
  // WEAR
  {
    id: 'hoodie-basic',
    slug: 'hoodie-basic',
    name: 'Hoodie 280g',
    description: 'Hoodie unisexe en coton épais, intérieur molletonné, logo brodé.',
    price: 35,
    collectionId: 'wear',
    imageUrl: '/products/hoodie-basic.jpeg',
    category: 'wear'
  },
  {
    id: 'tshirt-basic',
    slug: 'tshirt-basic',
    name: 'T-shirt 180g',
    description: 'T-shirt unisexe en coton 180g, coupe droite, impression logo.',
    price: 15,
    collectionId: 'wear',
    imageUrl: '/products/tshirt-basic.jpg',
    category: 'wear'
  },
  {
    id: 'polo-classic',
    slug: 'polo-classic',
    name: 'Polo Classique',
    description: 'Polo piqué, coupe droite, marquage cœur.',
    price: 25,
    collectionId: 'wear',
    imageUrl: '/products/polo-classic.webp',
    category: 'wear'
  },
  {
    id: 'polo-premium',
    slug: 'polo-premium',
    name: 'Polo Premium',
    description: 'Polo premium, coupe ajustée, broderie poitrine.',
    price: 30,
    collectionId: 'wear',
    imageUrl: '/products/polo-premium.jpg',
    category: 'wear'
  },
  {
    id: 'cap-basic',
    slug: 'cap-basic',
    name: 'Casquette 5 panneaux',
    description: 'Casquette 5 panneaux, taille réglable, logo brodé.',
    price: 15,
    collectionId: 'wear',
    imageUrl: '/products/cap-basic.jpg',
    category: 'wear'
  },
  {
    id: 'cap-premium',
    slug: 'cap-premium',
    name: 'Casquette Premium',
    description: 'Casquette premium avec finition soignée et broderie haute densité.',
    price: 18,
    collectionId: 'wear',
    imageUrl: '/products/cap-premium.jpg',
    category: 'wear'
  },
  {
    id: 'veste-premium',
    slug: 'veste-premium',
    name: 'Veste Premium',
    description: 'Veste zippée premium pour les collaborateurs, idéale pour les welcome back.',
    price: 45,
    collectionId: 'wear',
    imageUrl: '/products/veste-premium.jpeg',
    category: 'wear'
  },

  // DRINKWARE
  {
    id: 'bottle-basic',
    slug: 'bottle-basic',
    name: 'Gourde Inox 500ml',
    description: 'Gourde isotherme 500 ml en acier inoxydable, double paroi.',
    price: 18,
    collectionId: 'drinkware',
    imageUrl: '/products/bottle.jpeg',
    category: 'drinkware'
  },
  {
    id: 'mug-basic',
    slug: 'mug-basic',
    name: 'Mug Blanc',
    description: 'Mug 300 ml, compatible lave-vaisselle, impression logo.',
    price: 8,
    collectionId: 'drinkware',
    imageUrl: '/products/mug-basic.jpg',
    category: 'drinkware'
  },
  {
    id: 'cup-event',
    slug: 'cup-event',
    name: 'Gobelet Réutilisable',
    description: 'Gobelet réutilisable pour événements, séminaires et salons.',
    price: 3,
    collectionId: 'drinkware',
    imageUrl: '/products/cup-event.jpg',
    category: 'drinkware'
  },

  // OFFICE
  {
    id: 'notebook-hard',
    slug: 'notebook-hard',
    name: 'Carnet A5 Rigide',
    description: 'Carnet A5 à couverture rigide, 160 pages lignées, logo marqué.',
    price: 10,
    collectionId: 'office',
    imageUrl: '/products/notebook-hard.jpg',
    category: 'office'
  },
  {
    id: 'mousepad',
    slug: 'mousepad',
    name: 'Tapis de Souris',
    description: 'Tapis de souris avec surface lisse et base antidérapante.',
    price: 7,
    collectionId: 'office',
    imageUrl: '/products/mousepad.jpeg',
    category: 'office'
  },
  {
    id: 'pen-basic',
    slug: 'pen-basic',
    name: 'Stylo Basique',
    description: 'Stylo bille basique, idéal pour les packs à grand volume.',
    price: 2,
    collectionId: 'office',
    imageUrl: '/products/pen-basic.jpg',
    category: 'office'
  },
  {
    id: 'pen-premium',
    slug: 'pen-premium',
    name: 'Stylo Premium',
    description: 'Stylo premium présenté en coffret, idéal pour cadeaux clients.',
    price: 4,
    collectionId: 'office',
    imageUrl: '/products/pen-premium.jpg',
    category: 'office'
  },

  // LIFESTYLE
  {
    id: 'tote-basic',
    slug: 'tote-basic',
    name: 'Tote Bag 140g',
    description: 'Tote bag en coton 140g avec impression logo.',
    price: 6,
    collectionId: 'lifestyle',
    imageUrl: '/products/tote-basic.webp',
    category: 'lifestyle'
  },
  {
    id: 'tote-premium',
    slug: 'tote-premium',
    name: 'Tote Bag Premium',
    description: 'Tote bag premium plus épais, idéal pour packs cadeaux.',
    price: 10,
    collectionId: 'lifestyle',
    imageUrl: '/products/tote-premium.webp',
    category: 'lifestyle'
  },
  {
    id: 'backpack',
    slug: 'backpack',
    name: 'Sac à Dos',
    description: 'Sac à dos urbain avec compartiment pour ordinateur.',
    price: 35,
    collectionId: 'lifestyle',
    imageUrl: '/products/backpack.jpg',
    category: 'lifestyle'
  },
  {
    id: 'porte-cle',
    slug: 'porte-cle',
    name: 'Porte-clé',
    description: 'Porte-clé métal et bois, idéal en petit extra cadeau.',
    price: 5,
    collectionId: 'lifestyle',
    imageUrl: '/products/portecle.jpg',
    category: 'lifestyle'
  },

  // TECH
  {
    id: 'powerbank-8k',
    slug: 'powerbank-8k',
    name: 'Powerbank 8 000 mAh',
    description: 'Batterie externe 8 000 mAh avec logo imprimé.',
    price: 28,
    collectionId: 'tech',
    imageUrl: '/products/powerbank-8k.jpg',
    category: 'tech'
  }
];
