'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import { Avatar } from './avatar';
import { SignOutButton, useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

export const AvatarDropdown: React.FunctionComponent = () => {
  const auth = useUser();
  if (!auth.isSignedIn) {
    return null;
  }
  return (
    <div className='AvatarDropdown '>
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-gray-400 hover:text-gray-500  dark:hover:bg-gray-800 focus:outline-none flex items-center justify-center`}
            >
              <UserIcon className='h-6 w-6' />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0'>
                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div className='relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6'>
                    <div className='flex items-center space-x-3'>
                      <Avatar
                        imgUrl={auth.user?.imageUrl ?? ''}
                        sizeClass='w-12 h-12'
                      />

                      <div className='flex-grow'>
                        <h4 className='font-semibold'>{auth.user.fullName}</h4>
                        <p className='text-xs mt-0.5'>
                          {auth.user.emailAddresses[0].emailAddress}
                        </p>
                      </div>
                    </div>

                    <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

                    {/* ------------------ 1 --------------------- */}
                    {/* <Link
                      href={'/account'}
                      className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                      onClick={() => close()}
                    >
                      <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                        <UserIcon className='h-6 w-6' />
                      </div>
                      <div className='ml-4'>
                        <p className='text-sm font-medium text-gray-700 '>
                          {'My Account'}
                        </p>
                      </div>
                    </Link> */}

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      href={'/cart'}
                      className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                      onClick={() => close()}
                    >
                      <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                        <ShoppingBagIcon className='h-6 w-6' />
                      </div>
                      <div className='ml-4'>
                        <p className='text-sm font-medium text-gray-700 '>
                          My Cart
                        </p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    {/* <Link
                      href={'/account-savelists'}
                      className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                      onClick={() => close()}
                    >
                      <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <p className='text-sm font-medium text-gray-700 '>
                          {'Wishlist'}
                        </p>
                      </div>
                    </Link> */}

                    <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

                    {/* ------------------ 2 --------------------- */}
                    {/* <div className='flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                      <div className='flex items-center'>
                        <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M8.5 22C10.79 21.35 13.21 21.35 15.5 22'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                        <div className='ml-4'>
                          <p className='text-sm font-medium text-gray-700 '>
                            {'Dark theme'}
                          </p>
                        </div>
                      </div>
                      <SwitchDarkMode2 />
                    </div> */}

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      href={'/help'}
                      className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                      onClick={() => close()}
                    >
                      <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M4.89999 4.92993L8.43999 8.45993'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M4.89999 19.07L8.43999 15.54'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M19.05 19.07L15.51 15.54'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M19.05 4.92993L15.51 8.45993'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <p className='text-sm font-medium text-gray-700 '>
                          {'Help'}
                        </p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <SignOutButton>
                      <div className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                        <div className='flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-300'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M15 12H3.62'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M5.85 8.6499L2.5 11.9999L5.85 15.3499'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                        <div className='ml-4'>
                          <p className='text-sm font-medium text-gray-700 '>
                            Log out
                          </p>
                        </div>
                      </div>
                    </SignOutButton>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
