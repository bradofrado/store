import { CartItem } from '@/types/cart';

export const calculateCartItemsTotals = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (prev, curr) => prev + (curr.product.price ?? 0) * curr.quantity,
    0
  );
};

export const hasFreeShipping = (cartItems: CartItem[]): boolean => {
  return calculateCartItemsTotals(cartItems) > 350;
};
