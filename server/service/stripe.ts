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

  const checkoutSession = await createCheckoutSession({
    fromUrl: 'http://localhost:3000/cart',
    products: cartItems.map(({ product }) => ({
      stripeProductId: product.id,
      quantity: 1,
    })),
    customerId: customer?.stripeId,
  });

  return checkoutSession.url;
};
