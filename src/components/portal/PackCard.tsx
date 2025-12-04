import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Pack } from '@/lib/utils/types';

interface PackCardProps {
  pack: Pack;
  tenantId: string;
}

export const PackCard = ({ pack, tenantId }: PackCardProps) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const generatedImage = tenantId && supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/portals/${tenantId}/products/packs/${pack.id}.png` 
    : pack.imageUrl;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-tr from-gray-100 to-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-200">
        <Image
          src={generatedImage || '/placeholder.png'}
          alt={pack.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {pack.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {pack.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-blue-900">
            {pack.price.toFixed(2)} €
          </span>
          <Link href={`/portal/${tenantId}/product/pack-${pack.id}`}>
            <Button size="sm" className="bg-blue-950 hover:bg-blue-900 text-white border-none">
              Voir le pack
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
