'use server';

import {
  addItemToCart,
  changeQuantityOfCartItem,
  checkoutCart,
  getCartItems,
  removeCartItem as removeCartItemService,
} from '@/server/service/cart';
import { deleteImage, uploadImage } from '@/server/service/image';
import { createCheckoutLink } from '@/server/service/stripe';
import { CartItem } from '@/types/cart';
import { Image } from '@/types/image';
import { Product, VariantSelection } from '@/types/product';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const addProductToCart = async (
  product: Product,
  variants: VariantSelection
) => {
  const user = auth();
  const userId = user.userId;
  if (!userId) {
    return;
  }

  await addItemToCart({ product, variants, userId });
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
  const url = await getCheckoutLink();

  if (url) {
    redirect(url);
  }

  throw new Error("Couldn't create checkout link");
};

export const getCheckoutLink = async () => {
  const user = auth();
  const userId = user.userId;
  if (!userId) return null;

  const checkoutUrl = await createCheckoutLink({ userId });

  return checkoutUrl;
};

export const changeProductImage = async (
  productId: string,
  image: Image,
  formData: FormData
): Promise<void> => {
  const file = formData.get('image') as File;
  await uploadImage(productId, image, file);
};

export const uploadNewProductImage = async (
  productId: string,
  formData: FormData
): Promise<void> => {
  const file = formData.get('image') as File;
  await uploadImage(productId, null, file);
};

export const deleteProductImage = async (imageId: string): Promise<void> => {
  await deleteImage(imageId);
};
