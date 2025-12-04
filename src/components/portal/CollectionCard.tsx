import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/lib/utils/types';

interface CollectionCardProps {
  collection: Collection;
  tenantId: string;
}

export const CollectionCard = ({ collection, tenantId }: CollectionCardProps) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const generatedImage = tenantId && supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/portals/${tenantId}/products/collections/${collection.id}.png` 
    : collection.imageUrl;

  return (
    <Link href={`/portal/${tenantId}/collections?category=${collection.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900 aspect-[3/4] shadow-lg transition-all duration-300 hover:shadow-blue-900/20 hover:border-blue-500/30">
        <Image
          src={generatedImage || '/placeholder.png'}
          alt={collection.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
          <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{collection.name}</h3>
          <p className="text-sm text-gray-200 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-2">
            {collection.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
