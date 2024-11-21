import {
  getCollectionBySlug,
  getPopularCollections,
} from '@/server/service/collection';
import { getCollectionUrl } from '../utils';
import { getPopularProducts } from '@/server/service/product';
import { ProductCard } from '@/components/product-card';
import { getClass } from '@/utils/common';
import { cooper } from '../fonts/fonts';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel';

export default async function MainPage({
  searchParams,
}: {
  searchParams?: { collection?: string };
}) {
  const collection = searchParams?.collection ?? 'wild-patterns';

  return (
    <>
      {/* Hero section */}
      <div className='relative bg-gray-900'>
        {/* Decorative image and overlay */}
        <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
          <img
            alt=''
            src="https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Vision_XL_mossy_oak_obsession_camouflage_pattern_1-sxQNUao1W6uDck38z5UJxePUSAeedF.jpg"
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gray-900 opacity-50'
        />

        <div className='relative flex max-w-3xl flex-col items-start px-6 py-8 sm:py-24 lg:px-8'>
          <h1
            className={getClass(
              `text-4xl tracking-tight text-white lg:text-6xl font-light`,
              cooper.className
            )}
          >Handcrafted rings as unique as your story</h1>
          <ul className='mt-8 text-lg text-white list-disc pl-8 font-light space-y-2.5'>
            <li>Hundreds of premium materials & designs</li>
            <li>Handmade in Utah by a single master craftsman</li>
            <li>Free rings sizers & design consultation with every purchase</li>
          </ul>
          <a
            href="/collections"
            className='mt-12 inline-block rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100'
          >
            Explore Ring Designs
          </a>
        </div>
      </div>
      <main>
        {/* Category section */}
        <section
          aria-labelledby='category-heading'
          className='pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8'
        >
          <div className='px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0'>
            <h2
              className={getClass(
                `text-4xl tracking-tight lg:text-6xl font-light`,
                cooper.className
              )}
            >
              Explore our Collections
            </h2>
            <a
              href='/collections'
              className='hidden text-sm font-semibold text-primary hover:text-primary-lighter sm:block'
            >
              Browse all collections
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>
          <div className='mt-4 flow-root'>
            <CollectionList selectedCollection={collection} />
            <Suspense key={collection}>
              <CollectionProductList collectionSlug={collection} />
            </Suspense>
          </div>

          <div className='mt-6 px-4 sm:hidden'>
            <a
              href='/collections'
              className='block text-sm font-semibold text-primary hover:text-primary-lighter'
            >
              Browse all categories
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby='social-impact-heading'
          className='pt-24 sm:pt-32 rounded-lg'
        >
          <div className='rounded-lg'>
            <div className='relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-20 lg:px-16 rounded-3xl'>
              <div className='relative mx-auto flex flex-col'>
                <h2
                  className={getClass(
                    `text-4xl tracking-tight lg:text-6xl font-light text-white`,
                    cooper.className
                  )}
                >
                  Start with a blank canvas or existing design. Order, then
                  customize with a professional ring designer
                </h2>
                <p className='mt-3 text-lg font-light text-white'>
                  We set the bar on creating the most distinguished bands the
                  world has to offer. Whether you are fascinated with history,
                  your country, your love for whiskey, or things beyond this
                  planet, your band should tell a story about what's important
                  to you.
                </p>
                <div className='flex mt-4'>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href='/'
                    >
                      <img
                        src='/marketing-content-2.jpeg'
                        className='h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:scale-105 transition ease-in-out duration-300'
                      />
                    </a>
                    <div className='flex flex-1 flex-col space-y-2 py-4'>
                      <h3
                        className={getClass(
                          `text-2xl tracking-tight lg:text-3xl leading-tight font-light text-white`,
                          cooper.className
                        )}
                      >
                        Create Anything Ring
                      </h3>
                      <p className='text-base text-white font-light'>
                        Send us any material (or choose from the 1000's we
                        have). We'll work with you to create the perfect design.
                        Receive within 4 weeks (or faster)
                      </p>
                      <div className='flex flex-1 flex-col justify-end items-start'>
                        <a
                          href='/collections'
                          className='mt-8 block w-full rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                        >
                          Custom Ring
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby='collection-heading'
          className='mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8'
        >
          <h2
            className={getClass(
              `text-4xl tracking-tight lg:text-6xl font-light`,
              cooper.className
            )}
          >
            Our Best Selling Bands
          </h2>
          <p className='mt-4 text-lg font-light text-gray-900'>
            Every design you see can be completely customized to your
            preferences. Or, order an Anything Ring and start completely from
            scratch.
          </p>
          <PopularProductsList />
        </section>

        {/* Featured section */}
        <section
          aria-labelledby='social-impact-heading'
          className='pt-24 sm:pt-32 rounded-lg'
        >
          <div className='rounded-lg'>
            <div className='relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-20 lg:px-16 rounded-3xl'>
              <div className='relative mx-auto flex flex-col'>
                <h2
                  className={getClass(
                    `text-4xl tracking-tight lg:text-6xl font-light text-white`,
                    cooper.className
                  )}
                >
                  Reach Out to Us
                </h2>
                <p className='mt-3 text-lg font-light text-white'>
                  We set the bar on creating the most distinguished bands the
                  world has to offer. Whether you are fascinated with history,
                  your country, your love for whiskey, or things beyond this
                  planet, your band should tell a story about what's important
                  to you.
                </p>
                <div className='flex mt-4'>
                  <a
                    href='/collections'
                    className='mt-8 block w-full rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const PopularProductsList = async () => {
  const products = await getPopularProducts();
  return (
    <div className='mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const CollectionList = async ({
  selectedCollection,
}: {
  selectedCollection: string;
}) => {
  const categories = await getPopularCollections();
  return (
    <div className=''>
      <div className='relative box-content overflow-x-auto py-2 xl:overflow-visible'>
        <div className='flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
          {categories.map((category, i) => (
            <Link
              key={category.name}
              href={{ query: { collection: category.slug } }}
              scroll={false}
              className={getClass(
                'inline-block rounded-full border border-transparent px-6 py-3 text-sm lg:text-base font-medium text-center',
                selectedCollection === category.slug
                  ? 'bg-primary hover:bg-primary-lighter text-white'
                  : 'bg-secondary hover:bg-gray-100 text-gray-900'
              )}
            >
              <span className='lg:hidden'>
                {category.name.replace('Collection', '')}
              </span>
              <span className='hidden lg:inline'>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const CollectionProductList = async ({
  collectionSlug,
}: {
  collectionSlug: string;
}) => {
  const collection = await getCollectionBySlug(collectionSlug);
  return (
    <div className='flex gap-2 mt-2'>
      <Carousel opts={{ align: 'start' }} className='w-full'>
        <CarouselContent>
          {collection?.products.map((product, i) => (
            <CarouselItem
              key={product.id}
              className='animate-fade-up opacity-0 lg:basis-1/4 basis-1/2'
              style={
                { '--animation-delay': `${i * 100}ms` } as React.CSSProperties
              }
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
