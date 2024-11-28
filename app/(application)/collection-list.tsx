'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel';
import { ProductCard } from '@/components/product-card';
import { Collection, CollectionName } from '@/types/collection';
import { getClass } from '@/utils/common';
import { useState } from 'react';

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
    <>
      <CollectionNameList
        categories={collections}
        value={selectedCollection}
        onChange={setSelectedCollection}
      />
      <CollectionProductList collection={collection} />
    </>
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
      <div className='relative box-content overflow-x-auto py-2 xl:overflow-visible'>
        <div className='grid grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
          {categories.map((category, i) => (
            <button
              key={category.name}
              className={getClass(
                'inline-block rounded-full border border-transparent px-6 py-3 text-sm lg:text-base font-medium text-center',
                value === category.id
                  ? 'bg-primary hover:bg-primary-lighter text-white'
                  : 'bg-secondary hover:bg-gray-100 text-gray-900'
              )}
              onClick={() => onChange(category.id)}
            >
              <span className='lg:hidden'>
                {category.name.replace('Collection', '')}
              </span>
              <span className='hidden lg:inline'>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CollectionProductList = ({ collection }: { collection: Collection }) => {
  return (
    <div className='flex gap-2 mt-2'>
      <Carousel opts={{ align: 'start' }} className='w-full'>
        <CarouselContent>
          {collection?.products.map((product, i) => (
            <CarouselItem
              key={product.id}
              className='animate-fade-up opacity-0 lg:basis-1/4 basis-1/2'
              style={
                { '--animation-delay': `${i * 100}ms` } as React.CSSProperties
              }
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
