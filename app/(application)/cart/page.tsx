import { Product } from '@/types/product';
import { CartView } from './cart-form';
import { auth } from '@clerk/nextjs/server';
import { getCartItems } from '@/server/service/cart';
import { changeCartItemQuantity, checkout, removeCartItem } from '../actions';

const relatedProducts = [
  {
    id: 1,
    name: 'Billfold Wallet',
    href: '#',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'Front of Billfold Wallet in natural leather.',
    price: '$118',
    color: 'Natural',
  },
  // More products...
];

export default async function CartPage() {
  const user = auth();
  const userId = user.userId;
  const items = userId ? await getCartItems({ userId }) : [];
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
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img
                  alt={relatedProduct.imageAlt}
                  src={relatedProduct.imageSrc}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href={relatedProduct.href}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {relatedProduct.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {relatedProduct.color}
                  </p>
                </div>
                <p className='text-sm font-medium text-gray-900'>
                  {relatedProduct.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
