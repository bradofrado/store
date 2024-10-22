import { getClass } from '@/utils/common';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={getClass('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export const SkeletonCard: React.FunctionComponent = () => {
  return (
    <div className='flex flex-col space-y-3 p-4 w-full'>
      <Skeleton className='h-[125px] w-full rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-[calc(100%-50px)]' />
      </div>
    </div>
  );
};

export { Skeleton };
