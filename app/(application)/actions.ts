'use server';

import { uploadImage as uploadImageRepo } from '@/server/repository/blob';
import { NodeMailerEmailService } from '@/server/repository/email';
import {
  addItemToCart,
  changeQuantityOfCartItem,
  checkoutCart,
  getCartItems,
  removeCartItem as removeCartItemService,
} from '@/server/service/cart';
import {
  createCollection,
  deleteCollection,
  updateCollection,
  updateCollectionProducts,
} from '@/server/service/collection';
import { deleteImage, selectImageUrl } from '@/server/service/image';
import { createCheckoutLink } from '@/server/service/stripe';
import { CartItem } from '@/types/cart';
import { Image } from '@/types/image';
import { Product } from '@/types/product';
import { VariantSelection } from '@/types/variant';
import { getAuth } from '@/utils/auth';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getBuildYourOwnUrl } from '../utils';

export const addProductToCart = async (
  product: Product,
  variants: VariantSelection
) => {
  const userId = await getAuth();
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
  const userId = await getAuth();
  if (!userId) return null;

  const checkoutUrl = await createCheckoutLink({ userId });

  return checkoutUrl;
};

export const selectProductImage = async (
  productId: string,
  image: Image | null,
  imageUrl: string
): Promise<void> => {
  const newImage: Image = image
    ? {
        ...image,
        imageSrc: imageUrl,
      }
    : {
        id: '',
        imageSrc: imageUrl,
        imageAlt: '',
        primary: false,
        variant: null,
      };

  await selectImageUrl(productId, newImage);
};

export const uploadImage = async (formData: FormData): Promise<string> => {
  const file = formData.get('image') as File;
  const blob = await uploadImageRepo(file);

  return blob.url;
};

export const deleteProductImage = async (imageId: string): Promise<void> => {
  await deleteImage(imageId);
};

export const updateCollectionItem = updateCollection;

export const selectProducts = updateCollectionProducts;

export const createCollectionItem = createCollection;

export const deleteCollectionItem = deleteCollection;

export const emailCustomForm = async (
  _: Product,
  variantSelection: VariantSelection
) => {
  const email = variantSelection.email;
  if (!email) {
    throw new Error('No email provided');
  }
  const name = variantSelection.name;
  if (!name) {
    throw new Error('No name provided');
  }

  const nodeMailer = new NodeMailerEmailService();
  const subject = `Custom Order Request for ${name}`;
  const body = Object.entries(variantSelection)
    .map(([key, value]) => `${key}: ${value}`)
    .join('<br />');

  await nodeMailer.sendMail({ to: 'venus@venusrings.store', subject, body });

  redirect(`${getBuildYourOwnUrl()}?success=true`);
};

// Product CRUD operations
export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  primaryImageUrl: string;
  variants: Record<string, string[]>;
  details: string[];
}

export const createProductAction = async (
  data: CreateProductData
): Promise<Product> => {
  const userId = await getAuth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { createProduct } = await import('@/server/service/product');
  const product = await createProduct(data);

  return product;
};

export interface UpdateProductData {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  primaryImageUrl?: string;
  variants?: Record<string, string[]>;
  details?: string[];
}

export const updateProductAction = async (
  data: UpdateProductData
): Promise<Product> => {
  const userId = await getAuth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { updateProduct } = await import('@/server/service/product');
  const product = await updateProduct(data);

  return product;
};

export const deleteProductAction = async (productId: string): Promise<void> => {
  const userId = await getAuth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { deleteProduct } = await import('@/server/service/product');
  await deleteProduct(productId);
};
