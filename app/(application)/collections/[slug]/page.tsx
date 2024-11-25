import { ProductCard } from '@/components/product-card';
import { decodeState } from '@/utils/common';
import {
  getCollectionBySlug,
  searchProductsInCollection,
} from '@/server/service/collection';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/skeleton';

export default async function ProductsPage({
  searchParams,
  params: { slug },
}: {
  params: { slug: string };
  searchParams?: { filter?: string };
}) {
  return (
    <>
      <h2 id='product-heading' className='sr-only'>
        Products
      </h2>
      <Suspense
        key={searchParams?.filter}
        fallback={
          <div className='flex gap-4'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        }
      >
        <ProductList slug={slug} filter={searchParams?.filter} />
      </Suspense>
    </>
  );
}

const ProductList: React.FunctionComponent<{
  slug: string;
  filter: string | undefined;
}> = async ({ slug, filter }) => {
  const collection = filter
    ? await searchProductsInCollection(slug, decodeState(filter))
    : await getCollectionBySlug(slug);
  if (!collection) {
    notFound();
  }

  return (
    <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
      {collection.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
