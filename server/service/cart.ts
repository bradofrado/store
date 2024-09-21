import { prisma } from '@/prisma';
import {
  createCartItem,
  deleteCartItems,
  getCartItems,
  updateCartItem,
} from '../repository/cart';
import { Order } from '@/types/order';
import { createOrder } from '../repository/order';
import { ProductItem } from '@/types/product';
import { CartItem } from '@/types/cart';

export const addItemToCart = async ({
  userId,
  product,
  variants,
}: {
  userId: string;
  product: ProductItem;
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
  const items = await getCartItems({ db: prisma, userId });
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
