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
}
export const getCarts = async ({
  db,
}: GetCartItemsRequest): Promise<CartItem[]> => {
  const cartItems = await db.cartItem.findMany({
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
  item: CartItem;
}
export const updateCartItem = async ({
  db,
  item,
}: UpdateCartItemRequest): Promise<CartItem> => {
  const prismaCartItem = await db.cartItem.update({
    where: {
      id: item.id,
    },
    data: {
      quantity: item.quantity,
      variants: item.variants,
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
