'use client';

import { getProductUrl } from '@/app/utils';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { formatDollarAmount } from '@/utils/common';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type CartItemWithStock = CartItem & { inStock: boolean; leadTime: string };

interface CartViewProps {
  changeQuantity: (cartId: string, quantity: number) => Promise<void>;
  removeItem: (cartId: string) => Promise<void>;
  checkout: () => Promise<void>;
  items: CartItemWithStock[];
}
export const CartView: React.FunctionComponent<CartViewProps> = ({
  items,
  changeQuantity,
  removeItem,
  checkout,
}) => {
  const router = useRouter();
  const onChangeQuantity = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    cartId: string
  ) => {
    const quantity = parseInt(event.target.value);
    await changeQuantity(cartId, quantity);
    router.refresh();
  };

  const onRemove = async (cartId: string) => {
    await removeItem(cartId);
    router.refresh();
  };

  const onCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      checkout();
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className='mt-4'>
        <p>
          You cart is empty.{' '}
          <a href='/collections' className='text-blue-400'>
            Explore
          </a>{' '}
          some products to see what you like!
        </p>
      </div>
    );
  }

  return (
    <form
      className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'
      onSubmit={onCheckout}
    >
      <section aria-labelledby='cart-heading' className='lg:col-span-7'>
        <h2 id='cart-heading' className='sr-only'>
          Items in your shopping cart
        </h2>

        <ul
          role='list'
          className='divide-y divide-gray-200 border-b border-t border-gray-200'
        >
          {items.map(
            (
              { id, product, quantity, variants, inStock, leadTime },
              productIdx
            ) => (
              <li key={id} className='flex py-6 sm:py-10'>
                <div className='flex-shrink-0'>
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className='h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48'
                  />
                </div>

                <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                  <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                    <div>
                      <div className='flex justify-between'>
                        <h3 className='text-sm'>
                          <a
                            href={getProductUrl(product.id, variants)}
                            className='font-medium text-gray-700 hover:text-gray-800'
                          >
                            {product.name}
                          </a>
                        </h3>
                      </div>
                      <ProductVariants variants={variants} />
                      <p className='mt-1 text-sm font-medium text-gray-900'>
                        {formatDollarAmount(product.price ?? 0)}
                      </p>
                    </div>

                    <div className='mt-4 sm:mt-0 sm:pr-9'>
                      <label
                        htmlFor={`quantity-${productIdx}`}
                        className='sr-only'
                      >
                        Quantity, {product.name}
                      </label>
                      <select
                        id={`quantity-${productIdx}`}
                        name={`quantity-${productIdx}`}
                        className='max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-primary-lighter focus:outline-none focus:ring-1 focus:ring-primary-lighter sm:text-sm'
                        onChange={(e) => onChangeQuantity(e, id)}
                        value={quantity}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>

                      <div className='absolute right-0 top-0'>
                        <button
                          type='button'
                          className='-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500'
                          onClick={() => onRemove(id)}
                        >
                          <span className='sr-only'>Remove</span>
                          <XMarkIconMini
                            aria-hidden='true'
                            className='h-5 w-5'
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                    {inStock ? (
                      <CheckIcon
                        aria-hidden='true'
                        className='h-5 w-5 flex-shrink-0 text-green-500'
                      />
                    ) : (
                      <ClockIcon
                        aria-hidden='true'
                        className='h-5 w-5 flex-shrink-0 text-gray-300'
                      />
                    )}

                    <span>{inStock ? 'In stock' : `Ships in ${leadTime}`}</span>
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      </section>

      <OrderSummary items={items} />
    </form>
  );
};

interface OrderSummaryProps {
  items: CartItemWithStock[];
}
const OrderSummary: React.FunctionComponent<OrderSummaryProps> = ({
  items,
}) => {
  const router = useRouter();
  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.quantity * (item.product.price ?? 0),
        0
      ),
    [items]
  );
  const shippingEstimate = useMemo(() => 5, []);
  const taxEstimate = useMemo(() => subtotal * 0.085, [subtotal]);
  const total = useMemo(
    () => subtotal + shippingEstimate + taxEstimate,
    [subtotal, shippingEstimate, taxEstimate]
  );

  return (
    <section
      aria-labelledby='summary-heading'
      className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'
    >
      <h2 id='summary-heading' className='text-lg font-medium text-gray-900'>
        Order summary
      </h2>

      <dl className='mt-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <dt className='text-sm text-gray-600'>Subtotal</dt>
          <dd className='text-sm font-medium text-gray-900'>
            {formatDollarAmount(subtotal)}
          </dd>
        </div>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <dt className='flex items-center text-sm text-gray-600'>
            <span>Shipping estimate</span>
            <a
              href='#'
              className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>
                Learn more about how shipping is calculated
              </span>
              <QuestionMarkCircleIcon aria-hidden='true' className='h-5 w-5' />
            </a>
          </dt>
          <dd className='text-sm font-medium text-gray-900'>
            {formatDollarAmount(shippingEstimate)}
          </dd>
        </div>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <dt className='flex text-sm text-gray-600'>
            <span>Tax estimate</span>
            <a
              href='#'
              className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>
                Learn more about how tax is calculated
              </span>
              <QuestionMarkCircleIcon aria-hidden='true' className='h-5 w-5' />
            </a>
          </dt>
          <dd className='text-sm font-medium text-gray-900'>
            {formatDollarAmount(taxEstimate)}
          </dd>
        </div>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <dt className='text-base font-medium text-gray-900'>Order total</dt>
          <dd className='text-base font-medium text-gray-900'>
            {formatDollarAmount(total)}
          </dd>
        </div>
      </dl>

      <div className='mt-6'>
        <button
          type='submit'
          className='w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 focus:ring-offset-gray-50'
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

interface ProductVariantsProps {
  variants: Record<string, string>;
}
const ProductVariants: React.FunctionComponent<ProductVariantsProps> = ({
  variants,
}) => {
  const variantValues = Object.values(variants);
  return (
    <div className='mt-1 flex text-sm divide-x divide-gray-200'>
      {variantValues.map((variant, idx) => (
        <p key={idx} className='text-gray-500 px-1 first:pl-0 last:pr-0'>
          {variant}
        </p>
      ))}
    </div>
  );
};
