import { CartView } from './cart-form';
import { auth } from '@clerk/nextjs/server';
import { getCartItems } from '@/server/service/cart';
import { changeCartItemQuantity, checkout, removeCartItem } from '../actions';
import { ProductCard } from '@/components/product-card';
import { getPopularProducts } from '@/server/service/product';

export default async function CartPage() {
  const user = auth();
  const userId = user.userId;
  const items = userId ? await getCartItems({ userId }) : [];
  const products = await getPopularProducts();
  return (
    <main className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        Shopping Cart
      </h1>

      <CartView
        items={items.map((item) => ({
          ...item,
          inStock: true,
          leadTime: '3-4 weeks',
        }))}
        changeQuantity={changeCartItemQuantity}
        removeItem={removeCartItem}
        checkout={checkout}
      />

      {/* Related products */}
      <section aria-labelledby='related-heading' className='mt-24'>
        <h2 id='related-heading' className='text-lg font-medium text-gray-900'>
          You may also like&hellip;
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
