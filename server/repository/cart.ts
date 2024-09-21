import { Db, Prisma } from '@/prisma';
import { CartItem } from '@/types/cart';
import { prismaToProduct, productPayload } from './product';
import { z } from 'zod';
import { productVariantSchema } from '@/types/product';

const cartPayload = {
  include: {
    product: productPayload,
  },
} satisfies Prisma.CartItemFindManyArgs;

interface GetCartItemsRequest {
  db: Db;
  userId: string;
}
export const getCartItems = async ({
  db,
  userId,
}: GetCartItemsRequest): Promise<CartItem[]> => {
  const cartItems = await db.cartItem.findMany({
    where: {
      userId,
    },
    ...cartPayload,
  });

  return cartItems.map(prismaToCart);
};

interface CreateCartItemRequest {
  db: Db;
  item: CartItem;
}
export const createCartItem = async ({
  db,
  item,
}: CreateCartItemRequest): Promise<CartItem> => {
  const prismaCartItem = await db.cartItem.create({
    data: {
      userId: item.userId,
      productId: item.product.id,
      quantity: item.quantity,
      variants: item.variants,
    },
    ...cartPayload,
  });

  return prismaToCart(prismaCartItem);
};

interface UpdateCartItemRequest {
  db: Db;
  id: string;
  quantity: number;
}
export const updateCartItem = async ({
  db,
  id,
  quantity,
}: UpdateCartItemRequest): Promise<CartItem> => {
  const prismaCartItem = await db.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity,
    },
    ...cartPayload,
  });

  return prismaToCart(prismaCartItem);
};

interface DeleteCartItemRequest {
  db: Db;
  id: string;
}
export const deleteCartItem = async ({
  db,
  id,
}: DeleteCartItemRequest): Promise<CartItem> => {
  const prismaCartItem = await db.cartItem.delete({
    where: {
      id,
    },
    ...cartPayload,
  });

  return prismaToCart(prismaCartItem);
};

interface DeleteCartItemsRequest {
  db: Db;
  userId: string;
}
export const deleteCartItems = async ({
  db,
  userId,
}: DeleteCartItemsRequest): Promise<void> => {
  await db.cartItem.deleteMany({
    where: {
      userId,
    },
  });
};

export const prismaToCart = (
  prismaCart: Prisma.CartItemGetPayload<typeof cartPayload>
): CartItem => {
  return {
    id: prismaCart.id,
    userId: prismaCart.userId,
    product: prismaToProduct(prismaCart.product),
    quantity: prismaCart.quantity,
    variants: productVariantSchema.parse(prismaCart.variants),
  };
};
