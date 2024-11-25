import { getOrders } from '@/server/service/order';
import { auth } from '@clerk/nextjs/server';
import { OrderHistory } from './order-history';
import { getAuth } from '@/utils/auth';

const orders = [
  {
    number: '4376',
    status: 'Delivered on January 22, 2021',
    href: '#',
    invoiceHref: '#',
    products: [
      {
        id: 1,
        name: 'Machined Brass Puzzle',
        href: '#',
        price: '$95.00',
        color: 'Brass',
        size: '3" x 3" x 3"',
        imageSrc:
          'https://tailwindui.com/plus/img/ecommerce-images/order-history-page-07-product-01.jpg',
        imageAlt:
          'Brass puzzle in the shape of a jack with overlapping rounded posts.',
      },
      // More products...
    ],
  },
  // More orders...
];

export default async function OrderPage() {
  const userId = await getAuth();

  const orders = userId ? await getOrders({ userId }) : [];
  return (
    <main className='mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8'>
      <div className='max-w-xl'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          Your Orders
        </h1>
        <p className='mt-2 text-sm text-gray-500'>
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>
      </div>

      <OrderHistory orders={orders} />
    </main>
  );
}
