import { getProductUrl } from '@/app/utils';
import { Order } from '@/types/order';
import {
  displayDate,
  displayDateFull,
  formatDollarAmount,
} from '@/utils/common';
import { CheckIcon } from '@heroicons/react/24/outline';

interface OrderHistoryProps {
  orders: Order[];
}
export const OrderHistory: React.FunctionComponent<OrderHistoryProps> = ({
  orders,
}) => {
  return (
    <div className='mt-16'>
      <h2 className='sr-only'>Recent orders</h2>

      <div className='space-y-16 sm:space-y-24'>
        {orders.map((order) => (
          <div key={order.number}>
            <h3 className='sr-only'>
              Order placed on{' '}
              <time dateTime={order.datePlaced.toISOString()}>
                {displayDate(order.datePlaced)}
              </time>
            </h3>

            <div className='bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8'>
              <dl className='flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8'>
                <div className='flex justify-between md:block'>
                  <dt className='font-medium text-gray-900'>Order number</dt>
                  <dd className='md:mt-1'>{order.number}</dd>
                </div>
                <div className='flex justify-between pt-4 md:block md:pt-0'>
                  <dt className='font-medium text-gray-900'>Date placed</dt>
                  <dd className='md:mt-1'>
                    <time dateTime={order.datePlaced.toISOString()}>
                      {displayDateFull(order.datePlaced)}
                    </time>
                  </dd>
                </div>
                <div className='flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0'>
                  <dt>Total amount</dt>
                  <dd className='md:mt-1'>{formatDollarAmount(order.total)}</dd>
                </div>
              </dl>
              <div className='mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0'>
                {/* <a
                      href={order.href}
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 md:w-auto"
                    >
                      View Order
                      <span className="sr-only">{order.number}</span>
                    </a> */}
                <a
                  href={order.invoiceSrc}
                  className='flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 md:w-auto'
                >
                  View Invoice
                  <span className='sr-only'>for order {order.number}</span>
                </a>
              </div>
            </div>

            <div className='mt-6 flow-root px-4 sm:mt-10 sm:px-0'>
              <div className='-my-6 divide-y divide-gray-200 sm:-my-10'>
                {order.orders.map(({ product, status, shippedDate }) => (
                  <div key={product.id} className='flex py-6 sm:py-10'>
                    <div className='min-w-0 flex-1 lg:flex lg:flex-col'>
                      <div className='lg:flex-1'>
                        <div className='sm:flex'>
                          <div>
                            <h4 className='font-medium text-gray-900'>
                              {product.name}
                            </h4>
                            <p className='mt-2 hidden text-sm text-gray-500 sm:block'>
                              {product.description}
                            </p>
                          </div>
                          <p className='mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0'>
                            {formatDollarAmount(product.price ?? 0)}
                          </p>
                        </div>
                        <div className='mt-2 flex text-sm font-medium sm:mt-4'>
                          <a
                            href={getProductUrl(product.id)}
                            className='text-primary hover:text-primary-lighter'
                          >
                            View Product
                          </a>
                          <div className='ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6'>
                            <a
                              href='#'
                              className='text-primary hover:text-primary-lighter'
                            >
                              Buy Again
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='mt-6 font-medium'>
                        {status === 'delivered' && shippedDate ? (
                          <div className='flex space-x-2'>
                            <CheckIcon
                              aria-hidden='true'
                              className='h-6 w-6 flex-none text-green-500'
                            />
                            <p>
                              Delivered
                              <span className='hidden sm:inline'>
                                {' '}
                                on{' '}
                                <time dateTime={shippedDate.toISOString()}>
                                  {displayDate(shippedDate)}
                                </time>
                              </span>
                            </p>
                          </div>
                        ) : status === 'shipped' ? (
                          <p>Out for delivery</p>
                        ) : status === 'cancelled' ? (
                          <p className='text-gray-500'>Cancelled</p>
                        ) : null}
                      </div>
                    </div>
                    <div className='ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6'>
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className='col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
