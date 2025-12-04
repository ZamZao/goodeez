import { prisma } from '@/lib/prisma';
import { PackCard } from '@/components/portal/PackCard';

interface PacksPageProps {
  params: {
    tenant: string;
  };
}

export default async function PacksPage({ params }: PacksPageProps) {
  const packs = await prisma.pack.findMany({
    include: {
      items: true
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Nos Packs</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Des solutions clés en main pour tous les moments forts de la vie de votre entreprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packs.map((pack) => (
          <PackCard 
            key={pack.id} 
            pack={{
              ...pack,
              description: pack.description || undefined,
              imageUrl: pack.imageUrl || undefined,
              items: pack.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
              }))
            }} 
            tenantId={params.tenant} 
          />
        ))}
      </div>
    </div>
  );
}
