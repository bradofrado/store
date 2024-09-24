import { ProductCard } from '@/components/product-card';
import { CategoryFiltersView } from './components/category-filters-view';
import { Product } from '@/types/product';
import { getProducts, searchProducts } from '@/server/service/product';
import { decodeState } from '@/utils/common';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  let products: Product[];
  if (searchParams?.filter) {
    products = await searchProducts(decodeState(searchParams.filter));
  } else {
    products = await getProducts();
  }

  return (
    <CategoryFiltersView>
      <h2 id='product-heading' className='sr-only'>
        Products
      </h2>

      <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryFiltersView>
  );
}
