import { prisma } from '@/prisma';
import {
  createCartItem,
  deleteCartItem,
  deleteCartItems,
  getCartItems as getCartItemsRepo,
  updateCartItem,
} from '../repository/cart';
import { Order } from '@/types/order';
import { createOrder } from '../repository/order';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

export const getCartItems = async ({
  userId,
}: {
  userId: string;
}): Promise<CartItem[]> => {
  const items = await getCartItemsRepo({ db: prisma, userId });

  return items;
};

export const addItemToCart = async ({
  userId,
  product,
  variants,
}: {
  userId: string;
  product: Product;
  variants: Record<string, string>;
}): Promise<CartItem> => {
  const cartItem: CartItem = {
    id: '',
    userId,
    product,
    quantity: 1,
    variants,
  };
  const newItem = await createCartItem({ db: prisma, item: cartItem });

  return newItem;
};

export const removeCartItem = async ({
  cartItemId,
}: {
  cartItemId: string;
}): Promise<void> => {
  await deleteCartItem({ db: prisma, id: cartItemId });
};

export const getNumberOfCartItems = async ({
  userId,
}: {
  userId: string;
}): Promise<number> => {
  const items = await getCartItems({ userId });

  return items.length;
};

export const changeQuantityOfCartItem = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}): Promise<CartItem> => {
  const updatedItem = await updateCartItem({
    db: prisma,
    id: cartItemId,
    quantity,
  });

  return updatedItem;
};

export const checkoutCart = async ({
  userId,
}: {
  userId: string;
}): Promise<Order> => {
  const items = await getCartItems({ userId });
  if (items.length === 0) {
    throw new Error('No items in cart');
  }

  const order: Order = {
    id: '',
    orders: items.map((item) => ({
      id: '',
      product: item.product,
      quantity: item.quantity,
      variants: item.variants,
    })),
    status: 'pending',
    total: items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ),
    userId,
  };

  const createdOrder = await createOrder({ db: prisma, order });
  await deleteCartItems({ db: prisma, userId });

  return createdOrder;
};
