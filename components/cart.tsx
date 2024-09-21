import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface CartProps {
  numItems: number;
}
export const Cart: React.FunctionComponent<CartProps> = ({ numItems }) => {
  return (
    <div className='ml-4 flow-root lg:ml-8'>
      <a href='/cart' className='group -m-2 flex items-center p-2'>
        <ShoppingBagIcon
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-white'
        />
        <span className='ml-2 text-sm font-medium text-white'>{numItems}</span>
        <span className='sr-only'>items in cart, view bag</span>
      </a>
    </div>
  );
};
