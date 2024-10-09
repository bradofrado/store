import { Product } from '@/types/product';
import { addProductToCart } from '../../../actions';
import { ProductItemView } from './components/product-page';
import { getProduct } from '@/server/service/product';
import { notFound } from 'next/navigation';

export default async function ProductItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  if (!product) {
    notFound();
  }
  return (
    <ProductItemView addProductToCart={addProductToCart} product={product} />
  );
}
