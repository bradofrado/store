'use server';

import { addItemToCart } from '@/server/service/cart';
import { ProductItem } from '@/types/product';
import { auth } from '@clerk/nextjs/server';

export const addProductToCart = async (product: ProductItem) => {
  const user = auth();
  const userId = user.userId;
  if (!userId) {
    return;
  }

  await addItemToCart({ product, variants: {}, userId });
};
