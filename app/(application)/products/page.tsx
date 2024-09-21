'use client';
import { ProductCard } from '@/components/product-card';
import { CategoryFiltersView } from './components/category-filters-view';
import { Product } from '@/types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Basic Tee 8-Pack',
    price: 256,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    details: [],
  },
  {
    id: '2',
    name: 'Basic Tee',
    price: 32,
    description:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
    details: [],
  },
  // More products...
];

export default function Example() {
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
