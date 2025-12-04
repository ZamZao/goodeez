import { Pack } from '@/lib/utils/types';

export const packs: Pack[] = [
  {
    id: 'onboarding-classic',
    slug: 'onboarding-classic',
    name: 'Pack Onboarding Classique',
    description: 'Le pack d’accueil standard pour les nouveaux collaborateurs au bureau.',
    price: 85,
    imageUrl: '/products/packs/onboardingpack.png',
    items: [
      { productId: 'hoodie-basic', quantity: 1 },
      { productId: 'mug-basic', quantity: 1 },
      { productId: 'bottle-basic', quantity: 1 },
      { productId: 'tote-basic', quantity: 1 },
      { productId: 'pen-premium', quantity: 1 }
    ]
  },
  {
    id: 'event-stand',
    slug: 'event-stand',
    name: 'Pack Salon / Stand',
    description: 'Un pack pensé pour les salons professionnels et événements clients.',
    price: 70,
    imageUrl: '/products/packs/pack4-eventpack.png',
    items: [
      { productId: 'polo-classic', quantity: 1 },
      { productId: 'cap-premium', quantity: 1 },
      { productId: 'tote-basic', quantity: 1 },
      { productId: 'cup-event', quantity: 1 },
      { productId: 'porte-cle', quantity: 1 }
    ]
  }
];
