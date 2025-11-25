'use client';

import { ProductCard } from '@/components/product-card';
import { Collection, CollectionName } from '@/types/collection';
import { getClass } from '@/utils/common';
import { useState, useEffect } from 'react';
import { getCollectionUrl } from '../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

export const CollectionList: React.FunctionComponent<{
  collections: Collection[];
}> = ({ collections }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collections[Math.floor(collections.length / 2)].id
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedCollection, setDisplayedCollection] = useState<Collection>(
    collections[Math.floor(collections.length / 2)]
  );

  const collection =
    collections.find((collection) => collection.id === selectedCollection) ??
    collections[0];

  useEffect(() => {
    if (collection.id !== displayedCollection.id) {
      setIsAnimating(true);

      // Wait for fade-out animation
      const timer = setTimeout(() => {
        setDisplayedCollection(collection);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [collection, displayedCollection.id]);

  return (
    <div className='flex flex-col'>
      <CollectionNameList
        categories={collections}
        value={selectedCollection}
        onChange={setSelectedCollection}
      />
      <CollectionProductList
        collection={displayedCollection}
        isAnimating={isAnimating}
      />
      <div className='cursor-pointer mt-8 block rounded-full border border-transparent bg-gray-900 bg-opacity-75 text-white px-8 py-3 text-base font-medium hover:bg-opacity-50 sm:w-auto mx-auto'>
        <a href={getCollectionUrl(displayedCollection.slug)}>See More</a>
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
  const initialSlide = categories.findIndex((cat) => cat.id === value);

  return (
    <div className='my-8 border-b-4 border-gray-300 '>
      <Swiper
        centeredSlides={true}
        slidesPerView='auto'
        slideToClickedSlide={true}
        initialSlide={initialSlide !== -1 ? initialSlide : 0}
        onSlideChange={(swiper: SwiperType) => {
          const activeCategory = categories[swiper.activeIndex];
          if (activeCategory) {
            onChange(activeCategory.id);
          }
        }}
        className='collection-swiper'
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className='swiper-slide-collection'>
            <div
              className={getClass(
                `py-4 px-6 font-medium text-xl whitespace-nowrap transition-all duration-300 cursor-pointer`,
                value === category.id
                  ? 'text-gray-900 text-3xl font-bold border-b-4 border-gray-900 '
                  : 'text-gray-400'
              )}
            >
              {category.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const CollectionProductList = ({
  collection,
  isAnimating,
}: {
  collection: Collection;
  isAnimating: boolean;
}) => {
  const products = collection.products.slice(0, 8);
  return (
    <div
      className={getClass(
        'grid grid-cols-4 gap-4 transition-all duration-300',
        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      )}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className='transition-all duration-300'
          style={{
            transitionDelay: isAnimating ? '0ms' : `${index * 50}ms`,
          }}
        >
          <ProductCard product={product} showSecondImage />
        </div>
      ))}
    </div>
  );
};
