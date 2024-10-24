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
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
} from '@clerk/nextjs';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import Link from 'next/link';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/products' },
            { name: 'Pants', href: '/products' },
            { name: 'Sweaters', href: '/products' },
            { name: 'T-Shirts', href: '/products' },
            { name: 'Jackets', href: '/products' },
            { name: 'Activewear', href: '/products' },
            { name: 'Browse All', href: '/products' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/products' },
            { name: 'Wallets', href: '/products' },
            { name: 'Bags', href: '/products' },
            { name: 'Sunglasses', href: '/products' },
            { name: 'Hats', href: '/products' },
            { name: 'Belts', href: '/products' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '/products' },
            { name: 'Counterfeit', href: '/products' },
            { name: 'Full Nelson', href: '/products' },
            { name: 'My Way', href: '/products' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Build Your Own', href: '/products/build-your-own-band' },
    { name: 'Orders', href: '/orders' },
  ],
};
const footerNavigation = {
  shop: [
    { name: 'Bags', href: '/products' },
    { name: 'Tees', href: '/products' },
    { name: 'Objects', href: '/products' },
    { name: 'Home Goods', href: '/products' },
    { name: 'Accessories', href: '/products' },
  ],
  company: [
    { name: 'Terms & Conditions', href: '/products' },
    { name: 'Privacy', href: '/products' },
  ],
  account: [
    { name: 'Manage Account', href: '/account' },
    { name: 'Orders', href: '/orders' },
  ],
  connect: [
    { name: 'Contact Us', href: '/products' },
    { name: 'Facebook', href: '/products' },
    { name: 'Instagram', href: '/products' },
    { name: 'Pinterest', href: '/products' },
  ],
};

export const ApplicationLayout: React.FunctionComponent<{
  children: React.ReactNode;
  numCartItems: number;
}> = ({ children, numCartItems }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);

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
              <div className='border-b border-gray-200'>
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
              <TabPanels as={Fragment}>
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

            <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
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

            <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
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

            <div className='border-t border-gray-200 px-4 py-6'>
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
        <p className='flex h-10 items-center justify-center bg-gray-900 px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label='Top'
          className='px-4 sm:px-6 lg:px-8 border-b border-gray-200'
        >
          <div className='flex h-16 items-center'>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
            >
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open menu</span>
              <Bars3Icon aria-hidden='true' className='h-6 w-6' />
            </button>

            {/* Logo */}
            <div className='ml-4 flex lg:ml-0'>
              <a href='/'>
                <span className='sr-only'>Your Company</span>
                <img
                  alt=''
                  src='/venus-rings-logo.png'
                  className='h-16 w-auto'
                />
              </a>
            </div>

            {/* Flyout menus */}
            <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
              <div className='flex h-full space-x-8'>
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className='flex'>
                    <div className='relative flex'>
                      <PopoverButton className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-primary data-[open]:text-primary'>
                        {category.name}
                      </PopoverButton>
                    </div>

                    <PopoverPanel
                      transition
                      className='absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
                    >
                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                      <div
                        aria-hidden='true'
                        className='absolute inset-0 top-1/2 bg-white shadow'
                      />

                      <div className='relative bg-white'>
                        <div className='mx-auto max-w-7xl px-8'>
                          <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                            <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                              {category.featured.map((item) => (
                                <div
                                  key={item.name}
                                  className='group relative text-base sm:text-sm'
                                >
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
                            <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                              {category.sections.map((section) => (
                                <div key={section.name}>
                                  <p
                                    id={`${section.name}-heading`}
                                    className='font-medium text-gray-900'
                                  >
                                    {section.name}
                                  </p>
                                  <ul
                                    role='list'
                                    aria-labelledby={`${section.name}-heading`}
                                    className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                  >
                                    {section.items.map((item) => (
                                      <li key={item.name} className='flex'>
                                        <a
                                          href={item.href}
                                          className='hover:text-gray-800'
                                        >
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </PopoverGroup>

            <div className='ml-auto flex items-center'>
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

              {/* <div className='hidden lg:ml-8 lg:flex'>
                <a
                  href='#'
                  className='flex items-center text-gray-700 hover:text-gray-800'
                >
                  <img
                    alt=''
                    src='https://tailwindui.com/plus/img/flags/flag-canada.svg'
                    className='block h-auto w-5 flex-shrink-0'
                  />
                  <span className='ml-3 block text-sm font-medium'>CAD</span>
                  <span className='sr-only'>, change currency</span>
                </a>
              </div> */}

              {/* Search */}
              {/* <div className='flex lg:ml-6'>
                <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                  <span className='sr-only'>Search</span>
                  <MagnifyingGlassIcon aria-hidden='true' className='h-6 w-6' />
                </a>
              </div> */}

              <SignedIn>
                {' '}
                <AvatarDropdown />
              </SignedIn>

              {/* Cart */}
              <div className='pl-4 flow-root lg:pl-6 border-l'>
                <a href='/cart' className='group -m-2 flex items-center p-2'>
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
            </div>
          </div>
        </nav>
      </header>

      {children}

      <footer aria-labelledby='footer-heading' className='bg-gray-900'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='py-20 xl:grid xl:grid-cols-3 xl:gap-8'>
            <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
              <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                <div>
                  <h3 className='text-sm font-medium text-white'>Shop</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-300 hover:text-white'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-white'>Company</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-300 hover:text-white'
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
                  <h3 className='text-sm font-medium text-white'>Account</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-300 hover:text-white'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-white'>Connect</h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-300 hover:text-white'
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
              <div className='text-white'>Venus Rings</div>
              <div className='flex gap-4 mt-2'>
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className='border-t border-gray-800 py-10'>
            <p className='text-sm text-gray-400'>
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

function SocialLinks() {
  return (
    <>
      <Link
        href='https://facebook.com'
        target='_blank'
        aria-label='Visit us on Facebook'
        className='text-white data-[hover]:text-white/75'
      >
        <SocialIconFacebook className='size-4' />
      </Link>
      <Link
        href='https://x.com'
        target='_blank'
        aria-label='Visit us on X'
        className='text-white data-[hover]:text-white/75'
      >
        <SocialIconX className='size-4' />
      </Link>
      <Link
        href='https://linkedin.com'
        target='_blank'
        aria-label='Visit us on LinkedIn'
        className='text-white data-[hover]:text-white/75'
      >
        <SocialIconLinkedIn className='size-4' />
      </Link>
    </>
  );
}
