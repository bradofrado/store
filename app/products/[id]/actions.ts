'use server';

import { addItemToCart } from '@/server/service/cart';
import { ProductItem } from '@/types/product';

export const addProductToCart = async (product: ProductItem) => {
  await addItemToCart({ product, variants: {}, userId: '1' });
};
