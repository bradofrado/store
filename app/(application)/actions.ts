'use server';

import {
  addItemToCart,
  changeQuantityOfCartItem,
  checkoutCart,
  getCartItems,
  removeCartItem as removeCartItemService,
} from '@/server/service/cart';
import { createCheckoutLink } from '@/server/service/stripe';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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

export const checkout = async (): Promise<string | null> => {
  // const user = auth();
  // const userId = user.userId;
  // if (!userId) return;

  //await checkoutCart({ userId });
  return await getCheckoutLink();
};

export const getCheckoutLink = async () => {
  const user = auth();
  const userId = user.userId;
  if (!userId) return null;

  const checkoutUrl = await createCheckoutLink({ userId });

  return checkoutUrl;
};
