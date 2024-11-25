import { ProductCard } from '@/components/product-card';
import { getPopularProducts } from '@/server/service/product';

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const relatedProducts = await getPopularProducts();
  return (
    <main className='mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
      {children}
      {/* Related products */}
      <section aria-labelledby='related-heading' className='mt-16 sm:mt-24'>
        <h2 id='related-heading' className='text-lg font-medium text-gray-900'>
          Customers also purchased
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
