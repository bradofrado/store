import { getClass } from '@/utils/common';
import * as React from 'react';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onBlur'
> & {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, onBlur, ...props }, ref) => {
    const formattedChange =
      (onChange?: (value: string) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange?.(value);
      };
    return (
      <input
        type={type}
        className={getClass(
          'flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300',
          className
        )}
        ref={ref}
        onChange={formattedChange(onChange)}
        onBlur={formattedChange(onBlur)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
