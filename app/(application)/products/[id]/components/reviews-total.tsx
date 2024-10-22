import { StarIcon } from '@heroicons/react/20/solid';
import { reviews } from './reviews';
import { getClass } from '@/utils/common';

interface ReviewsTotalProps {}
export const ReviewsTotal: React.FunctionComponent<
  ReviewsTotalProps
> = ({}) => {
  return (
    <div className='mt-4'>
      <h2 className='sr-only'>Reviews</h2>
      <div className='flex items-center'>
        <p className='text-sm text-gray-700'>
          {reviews.average}
          <span className='sr-only'> out of 5 stars</span>
        </p>
        <div className='ml-1 flex items-center'>
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden='true'
              className={getClass(
                reviews.average > rating ? 'text-yellow-400' : 'text-gray-200',
                'h-5 w-5 flex-shrink-0'
              )}
            />
          ))}
        </div>
        <div aria-hidden='true' className='ml-4 text-sm text-gray-300'>
          ·
        </div>
        <div className='ml-4 flex'>
          <a
            href='#'
            className='text-sm font-medium text-primary hover:text-primary-lighter'
          >
            See all {reviews.totalCount} reviews
          </a>
        </div>
      </div>
    </div>
  );
};
