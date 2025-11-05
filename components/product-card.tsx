import { getProductUrl } from '@/app/utils';
import { Product } from '@/types/product';
import { formatDollarAmount } from '@/utils/common';
import Image from 'next/image';
export interface ProductCardProps {
  product: Product & { href?: string };
  onClick?: () => void;
  showSecondImage?: boolean;
}
export const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  onClick,
  showSecondImage = false,
}) => {
  const secondImage =
    showSecondImage && product.images[1] ? product.images[1] : null;
  return (
    <div className='group/media relative flex flex-col overflow-hidden bg-white h-full'>
      <div className='relative overflow-hidden bg-white aspect-[1/1]'>
        <div
          className={`absolute w-full h-full opacity-100 transition duration-300 ease-in-out ${secondImage ? 'group-hover/media:opacity-0' : ''} group-hover/media:scale-105`}
        >
          <Image
            alt={product.imageAlt}
            src={product.imageSrc}
            width={100}
            height={100}
            //style={{ position: undefined }}
            className={`bg-white object-cover absolute w-full h-full`}
          />
        </div>
        {secondImage ? (
          <div className='absolute w-full h-full opacity-0 transition duration-300 ease-in-out group-hover/media:opacity-100 group-hover/media:scale-105'>
            <Image
              alt={secondImage.imageAlt}
              src={secondImage.imageSrc}
              width={100}
              height={100}
              //style={{ position: undefined }}
              className={`bg-white object-cover absolute w-full h-full`}
            />
          </div>
        ) : null}
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
