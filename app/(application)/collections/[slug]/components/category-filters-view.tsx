import React, { Suspense } from 'react';
import { getClass } from '@/utils/common';
import { cooper } from '@/app/fonts/fonts';
import { ProductVariantFilter } from './product-variant-filter';
import { CollectionList } from './collection-list';
import { MobileFilterDialog } from './mobile-filter-dialog';
import { getCollectionBySlug } from '@/server/service/collection';
import { Skeleton } from '@/components/skeleton';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

export const CategoryFiltersView: React.FunctionComponent<{
  children: React.ReactNode;
  showCollectionList?: boolean;
  slug?: string;
}> = ({ children, slug, showCollectionList = true }) => {
  return (
    <div className='bg-white'>
      <div>
        {/* Mobile filter dialog */}
        {showCollectionList ? (
          <MobileFilterDialog>
            <CollectionList />
          </MobileFilterDialog>
        ) : null}

        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <CollectionName slug={slug} />

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}
              {showCollectionList ? (
                <form className='hidden lg:block'>
                  <CollectionList />
                </form>
              ) : null}

              {/* Product grid */}
              <div
                className={getClass(
                  showCollectionList ? 'lg:col-span-3' : 'lg:col-span-4'
                )}
              >
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const CollectionName: React.FunctionComponent<{ slug?: string }> = async ({
  slug,
}) => {
  const collection = slug ? await getCollectionBySlug(slug) : undefined;
  return (
    <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
      <h1
        className={getClass(
          `text-4xl tracking-tight lg:text-6xl font-light`,
          cooper.className
        )}
      >
        {collection?.name ?? 'Shop All Collections'}
      </h1>
    </div>
  );
};
