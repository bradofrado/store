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
      <div className='relative bg-gray-900 flex-col'>
        {/* Decorative image and overlay */}
        <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
          <img
            alt=''
            src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Kino_XL_collection_of_flat_rings_bands_made_from_natu_0-QZID4qLjzwnjGS3UZMFUCU7bDuYBwK.jpg'
            className='h-full w-full object-cover object-center flex-nowrap'
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
            Handcrafted rings: Moments turned into memories.
          </h1>
          <ul className='mt-8 text-lg text-white list-disc pl-8 font-light space-y-2.5'>
            <li>
              Here is some text that is going on here. I am trying to make it 
            </li>
            <li>We want you to be happy with these things.</li>
            <li>We use premium materials crafted to last.</li>
            <li>Find your style to fit your unique story.</li>
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
              className='block mt-4 sm:mt-0 text-sm font-semibold text-primary hover:text-primary-lighter'
            >
              Browse all collections
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>
          <p className='text-base mt-3 lg:text-lg font-light text-black'>
            We can create stunning, custom-designed pieces tailored to your
            budget, using materials of your choice. Have a sentimental item
            you'd like to incorporate? We'll transform it into a one-of-a-kind
            piece of jewelry that tells your story.
          </p>
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
                  Have an idea? Start here! Let's create something truly special
                  just for you.
                </h2>
                <p className='text-base mt-3 lg:text-lg font-light text-white'>
                  We can create stunning, custom-designed pieces tailored to
                  your budget, using materials of your choice. Have a
                  sentimental item you'd like to incorporate? We'll transform it
                  into a one-of-a-kind piece of jewelry that tells your story.
                </p>
                <div className='flex flex-wrap lg:flex-nowrap mt-4 gap-8'>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Phoenix_A_visually_striking_collage_of_various_modern_0-jVpM4UiMdfBJoTSTX68PRztkJze5Jm.jpg'
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
                      <p className='text-sm lg:text-base text-white font-light'>
                        Send us any material (or choose from the 100's we have).
                        We'll work with you to create the perfect design.
                        Receive within 4 weeks (or faster)
                      </p>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src="https://necgqvap1g3t014x.public.blob.vercel-storage.com/DALL%C3%82%C2%B7E%202024-11-14%2010.51.22%20-%20A%20high-quality%20image%20of%20a%20workspace%20for%20handcrafting%20rings.%20The%20scene%20includes%20tools%20like%20pliers,%20a%20jeweler's%20torch,%20a%20hammer,%20and%20a%20magnifying%20glass%20-hU1rFNHOlHR4FZ4xZjMwrnERrVUw4U.webp"
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
                        Add custom sizing, finishes, and add ons to make the
                        ring your own.
                      </p>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Phoenix_A_visually_striking_collage_of_various_modern_2-wEK0il0WLX8vk2wAD8nCwWRG9i9aBP.jpg'
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
                        Create an Anything Ring
                      </h3>
                      <p className='text-base text-white font-light'>
                        Don't let your imagination limit your dream ring. We
                        take pride in the quality of our bands and want to
                        ensure that you are getting top-end care.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-start'>
                  <a
                    href={getBuildYourOwnUrl()}
                    className='mt-8 block rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
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
            preferences. Or, order a custom ring and start completely from
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
                  Here is what you should do
                </h2>
                <p className='mt-3 text-lg font-light text-white'>
                  We want to make sure you are doing everything in your power to
                  win the fight. So win the fight.
                </p>
                <div className='flex flex-wrap lg:flex-nowrap mt-4 gap-8'>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
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
                        Then do the things
                      </h3>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/Leonardo_Vision_XL_mossy_oak_obsession_camouflage_pattern_1-sxQNUao1W6uDck38z5UJxePUSAeedF.jpg'
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
                        More things
                      </h3>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/marketing-content-TKN6Si7pxGd4N82jCdTP4PB6yl41xm.jpeg'
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
                        Start with the thing
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='flex mt-4 gap-2'>
                  <a
                    href='mailto:venus@venusrings.store'
                    className='mt-8 block w-full rounded-full border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                  >
                    Contact Us
                  </a>
                  <a
                    href='mailto:venus@venusrings.store'
                    className='mt-8 block w-full rounded-full border border-transparent px-8 py-3 text-base font-medium hover:bg-gray-100 sm:w-auto bg-[#3159a9] text-white'
                  >
                    Contact Us
                  </a>
                  <a
                    href='mailto:venus@venusrings.store'
                    className='mt-8 block w-full rounded-full border border-transparent px-8 py-3 text-base font-medium hover:bg-gray-100 sm:w-auto bg-[#2a4a8a] text-white'
                  >
                    Go Home
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
