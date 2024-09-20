'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { Product, ProductItem } from '@/types/product';
import { formatDollarAmount } from '@/utils/common';
import { ProductCard } from '@/components/product-card';

const colors = [
  { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
  {
    name: 'Heather Grey',
    bgColor: 'bg-gray-400',
    selectedColor: 'ring-gray-400',
  },
];
const sizes = [
  { name: 'XXS', inStock: true },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: false },
];

const product: ProductItem = {
  id: 0,
  name: 'Basic Tee',
  price: 35,
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};
const policies = [
  {
    name: 'International delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];
const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
      author: 'Risako M',
      date: 'May 16, 2021',
      datetime: '2021-01-06',
    },
    // More reviews...
  ],
};
const relatedProducts: Product[] = [
  {
    id: 1,
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: 35,
    description: "Front of men's Basic Tee in white.",
    options: 'Aspen White',
  },
  // More products...
];

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductItemPage() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <main className='mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
      <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
        <div className='lg:col-span-5 lg:col-start-8'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-medium text-gray-900'>
              {product.name}
            </h1>
            <p className='text-xl font-medium text-gray-900'>
              {formatDollarAmount(product.price)}
            </p>
          </div>
          {/* Reviews */}
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
                    className={classNames(
                      reviews.average > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200',
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
                  className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                >
                  See all {reviews.totalCount} reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
          <h2 className='sr-only'>Images</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8'>
            {product.images.map((image) => (
              <img
                key={image.id}
                alt={image.imageAlt}
                src={image.imageSrc}
                className={classNames(
                  image.primary
                    ? 'lg:col-span-2 lg:row-span-2'
                    : 'hidden lg:block',
                  'rounded-lg'
                )}
              />
            ))}
          </div>
        </div>

        <div className='mt-8 lg:col-span-5'>
          <form>
            {/* Color picker */}
            <div>
              <h2 className='text-sm font-medium text-gray-900'>Color</h2>

              <fieldset aria-label='Choose a color' className='mt-2'>
                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className='flex items-center space-x-3'
                >
                  {colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color}
                      aria-label={color.name}
                      className={classNames(
                        color.selectedColor,
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
                      )}
                    >
                      <span
                        aria-hidden='true'
                        className={classNames(
                          color.bgColor,
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Size picker */}
            <div className='mt-8'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm font-medium text-gray-900'>Size</h2>
                <a
                  href='#'
                  className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                >
                  See sizing chart
                </a>
              </div>

              <fieldset aria-label='Choose a size' className='mt-2'>
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className='grid grid-cols-3 gap-3 sm:grid-cols-6'
                >
                  {sizes.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? 'cursor-pointer focus:outline-none'
                          : 'cursor-not-allowed opacity-25',
                        'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-indigo-600 data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-700 sm:flex-1'
                      )}
                    >
                      {size.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            <button
              type='submit'
              className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Add to cart
            </button>
          </form>

          {/* Product details */}
          <div className='mt-10'>
            <h2 className='text-sm font-medium text-gray-900'>Description</h2>

            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className='prose prose-sm mt-4 text-gray-500'
            />
          </div>

          <div className='mt-8 border-t border-gray-200 pt-8'>
            <h2 className='text-sm font-medium text-gray-900'>
              Fabric &amp; Care
            </h2>

            <div className='prose prose-sm mt-4 text-gray-500'>
              <ul role='list'>
                {product.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policies */}
          <section aria-labelledby='policies-heading' className='mt-10'>
            <h2 id='policies-heading' className='sr-only'>
              Our Policies
            </h2>

            <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
              {policies.map((policy) => (
                <div
                  key={policy.name}
                  className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center'
                >
                  <dt>
                    <policy.icon
                      aria-hidden='true'
                      className='mx-auto h-6 w-6 flex-shrink-0 text-gray-400'
                    />
                    <span className='mt-4 text-sm font-medium text-gray-900'>
                      {policy.name}
                    </span>
                  </dt>
                  <dd className='mt-1 text-sm text-gray-500'>
                    {policy.description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      {/* Reviews */}
      <section aria-labelledby='reviews-heading' className='mt-16 sm:mt-24'>
        <h2 id='reviews-heading' className='text-lg font-medium text-gray-900'>
          Recent reviews
        </h2>

        <div className='mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10'>
          {reviews.featured.map((review) => (
            <div
              key={review.id}
              className='pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8'
            >
              <div className='lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8'>
                <div className='flex items-center xl:col-span-1'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden='true'
                        className={classNames(
                          review.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                      />
                    ))}
                  </div>
                  <p className='ml-3 text-sm text-gray-700'>
                    {review.rating}
                    <span className='sr-only'> out of 5 stars</span>
                  </p>
                </div>

                <div className='mt-4 lg:mt-6 xl:col-span-2 xl:mt-0'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    {review.title}
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className='mt-3 space-y-6 text-sm text-gray-500'
                  />
                </div>
              </div>

              <div className='mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3'>
                <p className='font-medium text-gray-900'>{review.author}</p>
                <time
                  dateTime={review.datetime}
                  className='ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0'
                >
                  {review.date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      <section aria-labelledby='related-heading' className='mt-16 sm:mt-24'>
        <h2 id='related-heading' className='text-lg font-medium text-gray-900'>
          Customers also purchased
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard {...relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
