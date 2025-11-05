'use client';

import { ProductCard } from '@/components/product-card';
import { Collection, CollectionName } from '@/types/collection';
import { getClass } from '@/utils/common';
import { useState } from 'react';
import { getCollectionUrl } from '../utils';

export const CollectionList: React.FunctionComponent<{
  collections: Collection[];
}> = ({ collections }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collections[0].id
  );
  const collection =
    collections.find((collection) => collection.id === selectedCollection) ??
    collections[0];
  return (
    <div className='flex flex-col'>
      <CollectionNameList
        categories={collections}
        value={selectedCollection}
        onChange={setSelectedCollection}
      />
      <CollectionProductList collection={collection} />
      <div className='cursor-pointer mt-8 block rounded-full border border-transparent bg-gray-900 bg-opacity-75 text-white px-8 py-3 text-base font-medium hover:bg-opacity-50 sm:w-auto mx-auto'>
        <a href={getCollectionUrl(collection.slug)}>See More</a>
      </div>
    </div>
  );
};

const CollectionNameList = ({
  categories,
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
  categories: CollectionName[];
}) => {
  return (
    <div className=''>
      <div className='relative box-content overflow-x-auto my-2 xl:overflow-visible border-b-4 border-gray-300 flex justify-center'>
        {categories.map((category) => (
          <button
            className={getClass(
              `mr-8 py-4 font-medium text-xl`,
              value === category.id ? 'border-b-4 border-gray-900' : ''
            )}
            key={category.id}
            onClick={() => onChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const CollectionProductList = ({ collection }: { collection: Collection }) => {
  const products = collection.products.slice(0, 8);
  return (
    <div className='grid grid-cols-4 gap-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showSecondImage />
      ))}
    </div>
  );
};
