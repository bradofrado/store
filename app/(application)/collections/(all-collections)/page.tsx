import { getCollectionUrl } from '@/app/utils';
import { ProductCard } from '@/components/product-card';
import { SkeletonCard } from '@/components/skeleton';
import { getCollectionNames } from '@/server/service/collection';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default function CollectionPage() {
  return (
    <>
      <h2 id='product-heading' className='sr-only'>
        Products
      </h2>
      <CollectionList />
    </>
  );
}

const CollectionList: React.FunctionComponent = async () => {
  const collections = await getCollectionNames();

  return (
    <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4'>
      {collections.map((collection) => (
        <ProductCard
          key={collection.id}
          product={{
            id: collection.id,
            name: collection.name,
            imageSrc: collection.imageSrc,
            href: getCollectionUrl(collection.slug),
            options: '',
            price: null,
            priceId: '',
            description: '',
            imageAlt: '',
            images: [],
            details: [],
            variants: {},
          }}
        />
      ))}
    </div>
  );
};
