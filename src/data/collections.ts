import { Collection } from '@/lib/utils/types';

export const collections: Collection[] = [
  {
    id: 'wear',
    slug: 'wear',
    name: 'Vêtements',
    description: 'Une gamme textile complète pour habiller vos équipes.',
    imageUrl: '/products/collections/wearcollection.png',
    productIds: [
      'hoodie-basic',
      'tshirt-basic',
      'polo-classic',
      'polo-premium',
      'cap-basic',
      'cap-premium',
      'veste-premium'
    ]
  },
  {
    id: 'drinkware',
    slug: 'drinkware',
    name: 'Boissons',
    description: 'Gourdes, mugs et gobelets pour le bureau et les événements.',
    imageUrl: '/products/collections/drinkwarecollection.png',
    productIds: [
      'bottle-basic',
      'mug-basic',
      'cup-event'
    ]
  },
  {
    id: 'office',
    slug: 'office',
    name: 'Bureau',
    description: 'Les essentiels pour travailler dans de bonnes conditions.',
    imageUrl: '/products/collections/officecollection.png',
    productIds: [
      'notebook-hard',
      'mousepad',
      'pen-basic',
      'pen-premium'
    ]
  }
];
