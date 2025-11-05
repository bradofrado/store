'use client';

import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import Link from 'next/link';
import { getCollectionNames } from '@/server/service/collection';
import { getBuildYourOwnUrl, getCollectionUrl } from './utils';
import { CollectionName } from '@/types/collection';
interface Navigation {
  categories: {
    id: string;
    name: string;
    featured: {
      name: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }[];
    sections: {
      id: string;
      name: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  }[];
  pages: {
    name: string;
    href: string;
  }[];
}
interface FooterNavigation {
  shop: {
    name: string;
    href: string;
  }[];
  company: {
    name: string;
    href: string;
  }[];
  account: {
    name: string;
    href: string;
  }[];
  connect: {
    name: string;
    href: string;
  }[];
}
const socialUrls = {
  tiktok: 'https://www.tiktok.com/@venus_rings_llc',
  instagram: 'https://www.instagram.com/venusrings.llc',
};
export const ApplicationLayout: React.FunctionComponent<{
  children: React.ReactNode;
  numCartItems: number;
  collections: CollectionName[];
}> = ({ children, numCartItems, collections }) => {
  const [open, setOpen] = useState(false);
  const navigation: Navigation = {
    categories: [],
    pages: [
      ...collections.map((collection) => ({
        name: collection.name.replace('Collection', ''),
        href: getCollectionUrl(collection.slug),
      })),
      {
        name: 'Build Your Own',
        href: getBuildYourOwnUrl(),
      },
    ],
  };
  const footerNavigation: FooterNavigation = {
    shop: collections.map((collection) => ({
      name: collection.name.replace('Collection', ''),
      href: getCollectionUrl(collection.slug),
    })),
    company: [
      {
        name: 'Terms & Conditions',
        href: '/terms',
      },
      {
        name: 'Privacy',
        href: '/privacy',
      },
    ],
    account: [
      //{ name: 'Manage Account', href: '/account' },
      {
        name: 'Orders',
        href: '/orders',
      },
    ],
    connect: [
      {
        name: 'Contact Us',
        href: 'mailto:venus@venusrings.store',
      },
      {
        name: 'Instagram',
        href: socialUrls.instagram,
      },
      {
        name: 'TikTok',
        href: socialUrls.tiktok,
      },
    ],
  };
  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className='relative z-40 lg:hidden'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 z-40 flex'>
          <DialogPanel
            transition
            className='relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full'
          >
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
              >
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Close menu</span>
                <XMarkIcon aria-hidden='true' className='h-6 w-6' />
              </button>
            </div>

            {/* Links */}
            <TabGroup className='mt-2'>
              <div className='border-b'>
                <TabList className='-mb-px flex space-x-8 px-4'>
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className='flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-primary data-[selected]:text-primary'
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as='div'>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className='space-y-10 px-4 pb-8 pt-10'
                  >
                    <div className='grid grid-cols-2 gap-x-4'>
                      {category.featured.map((item) => (
                        <div key={item.name} className='group relative text-sm'>
                          <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className='object-cover object-center'
                            />
                          </div>
                          <a
                            href={item.href}
                            className='mt-6 block font-medium text-gray-900'
                          >
                            <span
                              aria-hidden='true'
                              className='absolute inset-0 z-10'
                            />
                            {item.name}
                          </a>
                          <p aria-hidden='true' className='mt-1'>
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className='font-medium text-gray-900'
                        >
                          {section.name}
                        </p>
                        <ul
                          role='list'
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className='mt-6 flex flex-col space-y-6'
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className='flow-root'>
                              <a
                                href={item.href}
                                className='-m-2 block p-2 text-gray-500'
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className='space-y-6 border-t px-4 py-6'>
              {navigation.pages.map((page) => (
                <div key={page.name} className='flow-root'>
                  <a
                    href={page.href}
                    className='-m-2 block p-2 font-medium text-gray-900'
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className='space-y-6 border-t px-4 py-6'>
              <div className='flow-root'>
                <a
                  href='#'
                  className='-m-2 block p-2 font-medium text-gray-900'
                >
                  Sign in
                </a>
              </div>
              <div className='flow-root'>
                <a
                  href='#'
                  className='-m-2 block p-2 font-medium text-gray-900'
                >
                  Create account
                </a>
              </div>
            </div>

            <div className='border-t px-4 py-6'>
              <a href='#' className='-m-2 flex items-center p-2'>
                <img
                  alt=''
                  src='https://tailwindui.com/plus/img/flags/flag-canada.svg'
                  className='block h-auto w-5 flex-shrink-0'
                />
                <span className='ml-3 block text-base font-medium text-gray-900'>
                  CAD
                </span>
                <span className='sr-only'>, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className='relative bg-white z-10'>
        <p className='flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Free shipping on all orders!
        </p>
        <header
          className='grid items-center gap-[normal_20px] grid-cols-[auto_auto_1fr] tracking-[0.6px] mx-auto my-0 mr-auto ml-auto px-4 py-4 lg:px-[50px] lg:py-5 max-w-[1200px]'
          style={{
            gridTemplateAreas: '"heading navigation icons"',
          }}
        >
          <h1 className='flex justify-self-start items-center col-[heading] row-[heading] tracking-[0.6px] leading-[0]'>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden mr-5'
            >
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open menu</span>
              <Bars3Icon aria-hidden='true' className='h-6 w-6' />
            </button>
            <a
              href='/'
              className='text-sm inline-block justify-self-start col-[heading] row-[heading] tracking-[0.6px] leading-[0] mr-0 my-0 ml-[-7.5px] p-[7.5px] pr-[7.5px] pl-[7.5px] pt-[7.5px] pb-[7.5px] border-none border-[#121212]'
            >
              <div className='text-sm inline-block tracking-[0.6px] leading-[0] w-full m-0'>
                <img
                  src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/venus/Venus%20Logo%20Web.svg'
                  className='text-sm tracking-[0.6px] leading-[0] w-[100px] max-w-full overflow-clip border-gray-200'
                />
              </div>
            </a>
          </h1>
          <nav className='hidden lg:block col-[navigation] row-[navigation] tracking-[0.6px]'>
            <ul className='inline-flex flex-wrap tracking-[0.6px]'>
              {navigation.pages.map((page) => (
                <li
                  key={page.name}
                  className='text-left list-item tracking-[0.6px]'
                >
                  <a
                    href={page.href}
                    className='text-sm text-left flex items-center tracking-[0.6px] leading-[1.3] p-3 pr-3 pl-3 pt-3 pb-3 border-none border-[#121212bf]'
                  >
                    <span className='text-sm text-left tracking-[0.6px] leading-[1.3]'>
                      {page.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex justify-self-end col-[icons] row-[icons] tracking-[0.6px] pl-0 py-0 pr-2 items-center'>
            <div className='tracking-[0.6px]'></div>
            <SignedOut>
              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 pr-2'>
                <div className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  <SignInButton mode='modal'>Sign in</SignInButton>
                </div>
                <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
                <div className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  <SignUpButton mode='modal'>Create account</SignUpButton>
                </div>
              </div>
            </SignedOut>
            <SignedIn>
              {' '}
              <AvatarDropdown />
            </SignedIn>

            <a
              href='/cart'
              className='text-sm flex justify-center items-center relative tracking-[0.6px] ml-0 my-0 -mr-3 w-11 h-11 border-none border-[#121212]'
            >
              <ShoppingBagIcon
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
              />
              <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                {numCartItems}
              </span>
              <span className='sr-only'>items in cart, view bag</span>
            </a>
          </div>
        </header>
      </header>

      {children}

      <footer aria-labelledby='footer-heading' className='bg-secondary'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='py-20 xl:grid xl:grid-cols-3 xl:gap-8'>
            <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
              <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                <div>
                  <h3 className='text-sm font-medium text-primary'>Shop</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-600 hover:text-gray-500'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-primary'>Company</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-600 hover:text-gray-500'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                <div>
                  <h3 className='text-sm font-medium text-primary'>Account</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-600 hover:text-gray-500'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-primary'>Connect</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-600 hover:text-gray-500'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='mt-12 md:mt-16 xl:mt-0'>
              <div className='text-primary'>Venus Rings</div>
              <div className='flex gap-4 mt-2'>
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className='border-t border-gray-800 py-10'>
            <p className='text-sm text-primary'>
              Copyright &copy; 2024 Venus Rings.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
function SocialIconX(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 16 16' fill='currentColor' {...props}>
      <path d='M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z' />
    </svg>
  );
}
function SocialIconFacebook(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 16 16' fill='currentColor' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z'
      />
    </svg>
  );
}
function SocialIconLinkedIn(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 16 16' fill='currentColor' {...props}>
      <path d='M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z' />
    </svg>
  );
}
function SocialIconInstagram(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      viewBox='0 0 24 24'
      fill='none'
    >
      <g clip-path='url(#clip0_296_650)'>
        <path
          d='M12.188 2.98378C15.2023 2.98378 15.5603 2.9932 16.7566 3.04972C19.818 3.19101 21.2498 4.64166 21.3911 7.68427C21.4477 8.88058 21.4571 9.23853 21.4571 12.2529C21.4571 15.2672 21.4477 15.6252 21.3911 16.8215C21.2498 19.8641 19.8275 21.3147 16.7566 21.456C15.5603 21.5126 15.2117 21.522 12.188 21.522C9.16423 21.522 8.8157 21.5126 7.61938 21.456C4.54852 21.3147 3.12613 19.8547 2.98483 16.8215C2.92832 15.6252 2.9189 15.2766 2.9189 12.2529C2.9189 9.22912 2.92832 8.88058 2.98483 7.68427C3.12613 4.64166 4.54852 3.19101 7.61938 3.04972C8.8157 2.9932 9.16423 2.98378 12.188 2.98378ZM12.188 0.949097C9.11713 0.949097 8.73092 0.958516 7.52518 1.01504C3.42757 1.20343 1.13855 3.48303 0.950155 7.59007C0.893636 8.7958 0.884216 9.18202 0.884216 12.2529C0.884216 15.3237 0.893636 15.7099 0.950155 16.9157C1.13855 21.0227 3.41815 23.3023 7.52518 23.4907C8.73092 23.5472 9.11713 23.5567 12.188 23.5567C15.2588 23.5567 15.6451 23.5472 16.8508 23.4907C20.9484 23.3023 23.2374 21.0227 23.4258 16.9157C23.4823 15.7099 23.4918 15.3237 23.4918 12.2529C23.4918 9.18202 23.4823 8.7958 23.4258 7.59007C23.2374 3.49245 20.9578 1.20343 16.8508 1.01504C15.6451 0.958516 15.2588 0.949097 12.188 0.949097ZM12.188 6.45027C8.98525 6.45027 6.38539 9.05014 6.38539 12.2529C6.38539 15.4556 8.98525 18.0555 12.188 18.0555C15.3907 18.0555 17.9906 15.4556 17.9906 12.2529C17.9906 9.05014 15.3907 6.45027 12.188 6.45027ZM12.188 16.0208C10.1062 16.0208 8.42006 14.3347 8.42006 12.2529C8.42006 10.1711 10.1062 8.48495 12.188 8.48495C14.2698 8.48495 15.9559 10.1711 15.9559 12.2529C15.9559 14.3347 14.2698 16.0208 12.188 16.0208ZM18.2261 4.85832C17.4725 4.85832 16.8696 5.46119 16.8696 6.21477C16.8696 6.96836 17.4819 7.57123 18.2261 7.57123C18.9703 7.57123 19.5825 6.96836 19.5825 6.21477C19.5825 5.46119 18.9797 4.85832 18.2261 4.85832Z'
          fill='black'
        ></path>
      </g>
      <defs>
        <clipPath id='clip0_296_650'>
          <rect
            width='22.6075'
            height='22.6076'
            fill='white'
            transform='translate(0.884216 0.949097)'
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
function SocialIconTikTok(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      fill='#000000'
      viewBox='0 0 512 512'
      {...props}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <path d='M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z'></path>
      </g>
    </svg>
  );
}
function SocialLinks() {
  return (
    <>
      <Link
        href={socialUrls.instagram}
        target='_blank'
        aria-label='Visit us on LinkedIn'
        className='text-primary data-[hover]:text-primary/75'
      >
        <SocialIconInstagram className='size-4' />
      </Link>
      <Link
        href={socialUrls.tiktok}
        target='_blank'
        aria-label='Visit us on LinkedIn'
        className='text-primary data-[hover]:text-primary/75'
      >
        <SocialIconTikTok className='size-4' />
      </Link>
    </>
  );
}
