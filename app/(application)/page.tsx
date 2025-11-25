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
            src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/venus/Leonardo_Kino_XL_collection_of_flat_rings_bands_made_from_natu_0.jpg'
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
              At Venus Rings, we believe that jewelry should be as meaningful
              and unique as the person wearing it. Whether you have a clear idea
              or just a spark of inspiration, we&#039;ll work closely with you
              to bring your vision to life.
            </li>
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
          className='xl:mx-auto xl:px-16 px-6'
        >
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
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/venus/Leonardo_Phoenix_A_visually_striking_collage_of_various_modern_0.jpg'
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
                        Send us any material or memento. We&#039;ll work with
                        you to create the perfect design. Receive within 5 weeks
                        (or faster)
                      </p>
                    </div>
                  </div>
                  <div className='group relative flex flex-col overflow-hidden items-center basis-full lg:basis-1/3'>
                    <a
                      className='w-full aspect-1 bg-gray-200 sm:aspect-none rounded-lg overflow-hidden'
                      href={getBuildYourOwnUrl()}
                    >
                      <img
                        src="https://necgqvap1g3t014x.public.blob.vercel-storage.com/venus/DALL%C3%82%C2%B7E%202024-11-14%2010.51.22%20-%20A%20high-quality%20image%20of%20a%20workspace%20for%20handcrafting%20rings.%20The%20scene%20includes%20tools%20like%20pliers,%20a%20jeweler's%20torch,%20a%20hammer,%20and%20a%20magnifying%20glass%20.webp"
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
                        src='https://necgqvap1g3t014x.public.blob.vercel-storage.com/venus/Leonardo_Phoenix_A_visually_striking_collage_of_various_modern_2.jpg'
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
                        Create Anything
                      </h3>
                      <p className='text-base text-white font-light'>
                        Don&#039;t let your imagination limit your dream ring. 
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
            <div className='relative bg-opacity-75 px-6 py-32 sm:px-12 sm:py-20 lg:px-16 rounded-3xl bg-gray-600'>
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
                  We want to make sure you are receiving quality care in your
                  rings. If you have any questions or concerns, do not hesitate
                  to reach out to us, and we will respond soon.
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
        <div className='block pt-9 pb-9 border-l-0 border-r-0 border-t-0 border-b-0 bg-auto text-[#ffffffbf] bg-gray-600 rounded-3xl mt-16'>
          <div className='block mr-auto ml-auto mt-0 mb-0 pr-[50px] pl-[50px] pt-0 pb-0 max-w-[1200px] border-l-0 border-r-0 border-t-0 border-b-0'>
            <div className='block opacity-[0.01] relative border-l-0 border-r-0 border-t-0 border-b-0 z-0 animate-slide-in'>
              <div className='flex gap-y-0 gap-x-0 flex-wrap mb-0 pr-0 pl-0 pt-0 pb-0 border-l-0 border-r-0 border-t-0 border-b-0 list-none'>
                <div className='grow shrink-0 relative w-[calc(50%_-_4px)] max-w-full border-l-0 border-r-0 border-t-0 border-b-0'>
                  <div className='block relative pb-[100%] min-h-full border-l border-r border-t border-b rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none overflow-x-hidden overflow-y-hidden shadow-none bg-auto text-[#121212bf] bg-white'>
                    <img
                      className='block absolute top-0 left-0 w-full h-full max-w-full border-l-0 border-r-0 border-t-0 border-b-0 rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none overflow-x-clip overflow-y-clip transition-opacity duration-[0.4s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-0 object-cover'
                      style={{
                        transitionBehavior: 'normal',
                      }}
                      src='https://files.stripe.com/links/MDB8YWNjdF8xUTFaeExHMkJ2T1VpZ21OfGZsX2xpdmVfUTFJT1Nra1VWWkN2cXhRSDVmajRSdEY200R6ZmdsGh'
                    />
                  </div>
                </div>
                <div className='grow shrink-0 relative w-[calc(50%_-_4px)] max-w-full border-l-0 border-r-0 border-t-0 border-b-0'>
                  <div className='flex justify-start items-start flex-col self-start relative pr-[70px] pl-[70px] pt-[60px] pb-[70px] h-full border-l-0 border-r-0 border-t-0 border-b-0 rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none overflow-x-hidden overflow-y-hidden shadow-none z-[1] bg-auto text-[#121212bf] bg-white'>
                    <h2 className='text-[40px] text-left self-start leading-[1.3] mr-0 ml-0 mt-0 mb-0 border-l-0 border-r-0 border-t-0 border-b-0 text-[#121212]'>
                      Designed with love for little hands
                    </h2>
                    <div className='text-left self-start mt-5 border-l-0 border-r-0 border-t-0 border-b-0'>
                      <p className='block mr-0 ml-0 mt-0 mb-0 border-l-0 border-r-0 border-t-0 border-b-0'>
                        We&#039;ve felt how challenging it can be to keep young
                        babies engaged in meaningful ways during quiet moments.
                        That’s what inspired us to design products that help
                        parents create faith-centered moments with their little
                        ones, even in their wiggliest, most curious months.
                      </p>
                    </div>
                    <a
                      className='text-[15px] text-left no-underline flex justify-center items-center self-start relative tracking-[1px] leading-[1.2] mt-[30px] pr-[30px] pl-[30px] pt-0 pb-0 min-w-[122px] min-h-[47px] border-l-0 border-r-0 border-t-0 border-b-0 rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none transition-shadow duration-[0.1s] ease-[ease] delay-0 text-white bg-[#121212]'
                      style={{
                        transitionBehavior: 'normal',
                      }}
                      href='/pages/about-us'
                    >
                      Our Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
