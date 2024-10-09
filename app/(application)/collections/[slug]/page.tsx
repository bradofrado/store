import { ProductCard } from '@/components/product-card';
import { CategoryFiltersView } from './components/category-filters-view';
import { Product } from '@/types/product';
import { getProducts, searchProducts } from '@/server/service/product';
import { decodeState } from '@/utils/common';
import {
  getCollectionBySlug,
  getCollectionNames,
  searchProductsInCollection,
} from '@/server/service/collection';
import { Collection } from '@/types/collection';
import { notFound } from 'next/navigation';

export default async function ProductsPage({
  searchParams,
  params: { slug },
}: {
  params: { slug: string };
  searchParams?: { filter?: string };
}) {
  let collection: Collection | null = null;
  if (searchParams?.filter) {
    collection = await searchProductsInCollection(
      slug,
      decodeState(searchParams.filter)
    );
  } else {
    collection = await getCollectionBySlug(slug);
  }

  const collections = await getCollectionNames();

  if (!collection) {
    notFound();
  }

  return (
    <CategoryFiltersView
      name={collection.name}
      collections={collections.slice(0, 4)}
    >
      <h2 id='product-heading' className='sr-only'>
        Products
      </h2>

      <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
        {collection.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryFiltersView>
  );
}
