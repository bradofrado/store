import { getClass } from '@/utils/common';
import * as React from 'react';

type TextareaProps = Omit<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'onBlur'
> & {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, onBlur, ...props }, ref) => {
    const formattedChange =
      (onChange?: (value: string) => void) =>
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        onChange?.(value);
      };
    return (
      <textarea
        className={getClass(
          'flex min-h-[60px] w-full rounded-md border border-gray-200  bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
Textarea.displayName = 'Textarea';

export { Textarea };
