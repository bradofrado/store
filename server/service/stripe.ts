import { Product } from '@/types/product';
import { createCheckoutSession } from '../repository/stripe';
import { CartItem } from '@/types/cart';
import { getCartItems } from './cart';
import { getCustomer } from '../repository/customer';
import { prisma } from '@/prisma';

export const createCheckoutLink = async ({ userId }: { userId: string }) => {
  const cartItems = await getCartItems({ userId });
  const customer = await getCustomer({ userId, db: prisma });
  if (!customer) throw new Error('Customer not found');

  if (cartItems.some(({ product }) => !product.priceId)) {
    throw new Error('Products have to have a price');
  }

  const checkoutSession = await createCheckoutSession({
    fromUrl: 'http://localhost:3000/cart',
    products: cartItems.map(({ product }) => ({
      stripeProductId: product.priceId ?? '',
      quantity: 1,
    })),
    customerId: customer?.stripeId,
  });

  return checkoutSession.url;
};
