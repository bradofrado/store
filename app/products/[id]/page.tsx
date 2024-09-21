import { addProductToCart } from './actions';
import { ProductItemView } from './components/product-page';

export default function ProductItemPage() {
  return <ProductItemView addProductToCart={addProductToCart} />;
}
