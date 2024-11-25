import {
  getCollectionBySlug,
  getPopularCollections,
} from '@/server/service/collection';
import { getPopularProducts } from '@/server/service/product';
import { ProductCard } from '@/components/product-card';
import { getClass } from '@/utils/common';
import { cooper } from '../fonts/fonts';
import { CollectionList } from './collection-list';
import { getBuildYourOwnUrl } from '../utils';

export default async function MainPage() {
  const collectionNames = await getPopularCollections();
  const collections = (
    await Promise.all(
      collectionNames.map((collection) => getCollectionBySlug(collection.slug))
    )
  ).filter((collection) => collection !== null);

  return (
    <>
      {/* Hero section */}
      <div className='relative bg-gray-900'>
        {/* Decorative image and overlay */}
        <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
          <img
            alt=''
            src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Kino_XL_collection_of_flat_rings_bands_made_from_natu_0-QZID4qLjzwnjGS3UZMFUCU7bDuYBwK.jpg'
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
          >
            Handcrafted rings & wedding bands as unique as your story
          </h1>
          <ul className='mt-8 text-lg text-white list-disc pl-8 font-light space-y-2.5'>
            <li>Hundreds of premium materials & designs</li>
            <li>Handmade in Boston by a single master craftsman</li>
            <li>Free rings sizers & Design Consultation with every purchase</li>
          </ul>
          <a
            href='/collections'
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
            <CollectionList collections={collections} />
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
                <div className='flex mt-4 gap-8'>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Kino_XL_collection_of_flat_rings_bands_made_from_abal_1-VIYbZmwfGKxZA1i1mn7QRgzUUlfOLg.jpg'
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
                        Start with the Material
                      </h3>
                      <p className='text-base text-white font-light'>
                        Send us any material (or choose from the 1000's we
                        have). We'll work with you to create the perfect design.
                        Receive within 4 weeks (or faster)
                      </p>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Kino_XL_distinctive_and_rare_nature_of_exotic_woods_a_3-CvMidGRfZbytJNFS8iqqPsRw4XozQa.jpg'
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
                        Add your Custom Features
                      </h3>
                      <p className='text-base text-white font-light'>
                        Send us any material (or choose from the 1000's we
                        have). We'll work with you to create the perfect design.
                        Receive within 4 weeks (or faster)
                      </p>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Kino_XL_emphasize_the_innovative_and_durable_nature_o_2-wVvsv3lDuuQ6brh5rTomvPlEzLFmF2.jpg'
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
                    </div>
                  </div>
                </div>
                <div className='flex flex-1 justify-center items-start'>
                  <a
                    href={getBuildYourOwnUrl()}
                    className='mt-8 block w-full rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                  >
                    Create Custom Ring
                  </a>
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
                    href='mailto:venus@venusrings.store'
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
