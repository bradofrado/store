'use server';

import {
  addItemToCart,
  changeQuantityOfCartItem,
  checkoutCart,
  removeCartItem as removeCartItemService,
} from '@/server/service/cart';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { auth } from '@clerk/nextjs/server';

export const addProductToCart = async (product: Product) => {
  const user = auth();
  const userId = user.userId;
  if (!userId) {
    return;
  }

  await addItemToCart({ product, variants: {}, userId });
};

export const changeCartItemQuantity = async (
  cartItemId: string,
  quantity: number
) => {
  await changeQuantityOfCartItem({ cartItemId, quantity });
};

export const removeCartItem = async (cartItemId: string) => {
  await removeCartItemService({ cartItemId });
};

export const checkout = async (): Promise<void> => {
  const user = auth();
  const userId = user.userId;
  if (!userId) return;

  await checkoutCart({ userId });
};
