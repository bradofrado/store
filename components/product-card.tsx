import { getProductUrl } from '@/app/utils';
import { Product } from '@/types/product';
import { formatDollarAmount } from '@/utils/common';

export interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}
export const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <div
      key={product.id}
      className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
    >
      <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className='h-full w-full object-cover object-center sm:h-full sm:w-full'
        />
      </div>
      <div className='flex flex-1 flex-col space-y-2 p-4'>
        <h3 className='text-sm font-medium text-gray-900'>
          {onClick ? (
            <button onClick={onClick} type='button'>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </button>
          ) : (
            <a href={getProductUrl(product.id)}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </a>
          )}
        </h3>
        <p className='text-sm text-gray-500'>{product.options}</p>
        <div className='flex flex-1 flex-col justify-end'>
          <p className='text-sm italic text-gray-500'>{product.options}</p>
          <p className='text-base font-medium text-gray-900'>
            {formatDollarAmount(product.price ?? 0)}
          </p>
        </div>
      </div>
    </div>
  );
};
