'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, Field, Label, Switch } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  CubeTransparentIcon,
  FingerPrintIcon,
  RectangleStackIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { getClass } from '@/utils/common';
import ProductsTab from './(tabs)/products/page';
import { accountTabs } from './tabs';

export default function AccountPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='mx-auto lg:flex lg:gap-x-16 lg:px-8'>
        <h1 className='sr-only'>General Settings</h1>

        <aside className='flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20'>
          <nav className='flex-none px-4 sm:px-6 lg:px-0'>
            <ul
              role='list'
              className='flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col'
            >
              {accountTabs.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={getClass(
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6'
                    )}
                  >
                    <item.icon
                      aria-hidden='true'
                      className={getClass(
                        item.current
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className='px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20'>
          {children}
        </main>
      </div>
    </>
  );
}
