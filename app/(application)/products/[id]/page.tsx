import { Product, productVariants } from '@/types/product';
import { addProductToCart } from '../../actions';
import { ProductItemView } from '../components/product-page';
import {
  getPopularProducts,
  getProduct,
  getProductByName,
} from '@/server/service/product';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getPopularProductsCache: typeof getPopularProducts =
  cache(getPopularProducts);

export default async function ProductItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  const relatedProducts = await getPopularProductsCache();
  if (!product) {
    notFound();
  }
  product.images = product.images.map((image) => ({
    ...image,
    variant: { size: '6.5', width: '8mm' },
  }));
  return (
    <ProductItemView
      addProductToCart={addProductToCart}
      product={product}
      relatedProducts={relatedProducts}
      productVariants={productVariants}
    />
  );
}
