'use client';

import { useQueryState } from '@/hooks/query-state';
import { productVariants } from '@/types/product';
import { capitalizeFirstLetter } from '@/utils/common';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useTransition } from 'react';

export const ProductVariantFilter: React.FunctionComponent = () => {
  const [checkedFilters, setCheckedFilters] = useQueryState<
    Record<string, string[]>
  >({
    key: 'filter',
    defaultValue: {
      size: [],
      metal: [],
      style: [],
      finish: [],
      width: [],
      addon: [],
    },
  });
  const [isPending, startTransition] = useTransition();

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const section = event.target.name;
    const checked = event.target.checked;
    const copy = { ...checkedFilters };
    if (checked) {
      copy[section].push(event.target.value);
    } else {
      copy[section] = copy[section].filter(
        (value) => value !== event.target.value
      );
    }
    startTransition(() => setCheckedFilters(copy));
  };
  return productVariants.map(({ name: section, values: options }) => (
    <Disclosure
      key={section}
      as='div'
      className='border-b border-gray-200 py-6'
    >
      <h3 className='-my-3 flow-root'>
        <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
          <span className='font-medium text-gray-900'>
            {capitalizeFirstLetter(section)}
          </span>
          <span className='ml-6 flex items-center'>
            <PlusIcon
              aria-hidden='true'
              className='h-5 w-5 group-data-[open]:hidden'
            />
            <MinusIcon
              aria-hidden='true'
              className='h-5 w-5 [.group:not([data-open])_&]:hidden'
            />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className='pt-6'>
        <div className='space-y-4'>
          {options.map((option, optionIdx) => (
            <div key={option} className='flex items-center'>
              <input
                value={option}
                checked={checkedFilters[section].includes(option)}
                id={`filter-mobile-${section}-${optionIdx}`}
                name={section}
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary-lighter'
                onChange={onFilterChange}
              />
              <label
                htmlFor={`filter-${section}-${optionIdx}`}
                className='ml-3 text-sm text-gray-600'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  ));
};
