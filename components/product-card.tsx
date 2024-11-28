import { getProductUrl } from '@/app/utils';
import { Product } from '@/types/product';
import { formatDollarAmount } from '@/utils/common';

export interface ProductCardProps {
  product: Product & { href?: string };
  onClick?: () => void;
}
export const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <div className='group relative flex flex-col overflow-hidden bg-white h-full'>
      <div className='aspect-h-3 aspect-w-3 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden h-full'>
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className='h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:scale-105 transition ease-in-out duration-300'
        />
      </div>
      <div className='flex flex-1 flex-col space-y-2 p-4'>
        <h3 className='text-sm font-normal text-gray-900'>
          {onClick ? (
            <button onClick={onClick} type='button'>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </button>
          ) : (
            <a href={product.href ?? getProductUrl(product.id)}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </a>
          )}
        </h3>
        {product.options ? (
          <p className='text-sm text-gray-500'>{product.options}</p>
        ) : null}
        <div className='flex flex-1 flex-col justify-end'>
          {product.options ? (
            <p className='text-sm italic text-gray-500'>{product.options}</p>
          ) : null}
          {product.price ? (
            <p className='text-base font-normal text-gray-900'>
              {formatDollarAmount(product.price ?? 0)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
