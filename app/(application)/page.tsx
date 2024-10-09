import { getPopularCollections } from '@/server/service/collection';
import { getCollectionUrl } from '../utils';
import { getPopularProducts } from '@/server/service/product';
import { ProductCard } from '@/components/product-card';

export default async function MainPage() {
  const categories = await getPopularCollections();
  const products = await getPopularProducts();
  return (
    <>
      {/* Hero section */}
      <div className='relative bg-gray-900'>
        {/* Decorative image and overlay */}
        <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
          <img
            alt=''
            src='https://tailwindui.com/plus/img/ecommerce-images/home-page-01-hero-full-width.jpg'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gray-900 opacity-50'
        />

        <div className='relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0'>
          <h1 className='text-4xl font-bold tracking-tight text-white lg:text-6xl'>
            New arrivals are here
          </h1>
          <p className='mt-4 text-xl text-white'>
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <a
            href='/collections/new-arrivals'
            className='mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100'
          >
            Shop New Arrivals
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
              id='category-heading'
              className='text-2xl font-bold tracking-tight text-gray-900'
            >
              Popular Collections
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
            <div className='-my-2'>
              <div className='relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible'>
                <div className='absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={getCollectionUrl(category.slug)}
                      className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto'
                    >
                      <span aria-hidden='true' className='absolute inset-0'>
                        <img
                          alt=''
                          src={category.imageSrc}
                          className='h-full w-full object-cover object-center'
                        />
                      </span>
                      <span
                        aria-hidden='true'
                        className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50'
                      />
                      <span className='relative mt-auto text-center text-xl font-bold text-white'>
                        {category.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
          className='mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8'
        >
          <div className='relative overflow-hidden rounded-lg'>
            <div className='absolute inset-0'>
              <img
                alt=''
                src='https://tailwindui.com/plus/img/ecommerce-images/home-page-01-feature-section-01.jpg'
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16'>
              <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
                <h2
                  id='social-impact-heading'
                  className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
                >
                  <span className='block sm:inline'>Level up</span>
                  <span className='block sm:inline'>your desk</span>
                </h2>
                <p className='mt-3 text-xl text-white'>
                  Make your desk beautiful and organized. Post a picture to
                  social media and watch it get more likes than life-changing
                  announcements. Reflect on the shallow nature of existence. At
                  least you have a really nice desk setup.
                </p>
                <a
                  href='/collections'
                  className='mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                >
                  Shop Workspace
                </a>
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
            id='collection-heading'
            className='text-2xl font-bold tracking-tight text-gray-900'
          >
            Our Best Selling Bands
          </h2>
          <p className='mt-4 text-base text-gray-500'>
            Each season, we collaborate with world-class designers to create a
            collection inspired by the natural world.
          </p>

          <div className='mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0'>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby='comfort-heading'
          className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'
        >
          <div className='relative overflow-hidden rounded-lg'>
            <div className='absolute inset-0'>
              <img
                alt=''
                src='https://tailwindui.com/plus/img/ecommerce-images/home-page-01-feature-section-02.jpg'
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16'>
              <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
                <h2
                  id='comfort-heading'
                  className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
                >
                  Simple productivity
                </h2>
                <p className='mt-3 text-xl text-white'>
                  Endless tasks, limited hours, a single piece of paper. Not
                  really a haiku, but we're doing our best here. No kanban
                  boards, burndown charts, or tangled flowcharts with our Focus
                  system. Just the undeniable urge to fill empty circles.
                </p>
                <a
                  href='/collections'
                  className='mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                >
                  Shop Focus
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
