import { Product } from '@/types/product';
import {
  createCheckoutSession,
  createCoupon,
  getCouponsByName,
  getShippingRate,
} from '../repository/stripe';
import { CartItem } from '@/types/cart';
import { getCartItems } from './cart';
import { getCustomer } from '../repository/customer';
import { prisma } from '@/prisma';
import { calculateCartItemsTotals, hasFreeShipping } from '@/utils/totals';
import stripe from 'stripe';

export const createCheckoutLink = async ({ userId }: { userId: string }) => {
  const cartItems = await getCartItems({ userId });
  const customer = await getCustomer({ userId, db: prisma });

  if (cartItems.some(({ product }) => !product.priceId)) {
    throw new Error('Products have to have a price');
  }

  const { coupons, shipping } = await calculateDiscountsAndShipping(cartItems);

  const checkoutSession = await createCheckoutSession({
    fromUrl: process.env.DEPLOYED_URL ?? '',
    products: cartItems.map(({ product }) => ({
      stripeProductId: product.priceId ?? '',
      quantity: 1,
    })),
    customerId: customer?.stripeId,
    discounts: coupons?.map(({ id }) => ({ coupon: id })),
    shippingRate: shipping ?? undefined,
  });

  return checkoutSession.url;
};

const calculateDiscountsAndShipping = async (
  cartItems: CartItem[]
): Promise<{ coupons: stripe.Coupon[] | null; shipping: string | null }> => {
  const coupons: { name: string; amount: number }[] = [];
  let shippingId: string | null = null;
  try {
    const expandProductQuantities = cartItems
      .reduce<
        number[]
      >((prev, curr) => [...prev, ...Array(curr.quantity).fill(curr.product.price ?? 0)], [])
      .sort((a, b) => b - a);
    const hasBogo = expandProductQuantities.length > 1;

    if (!hasFreeShipping(cartItems)) {
      const shippingRate = await getShippingRate(
        cartItems.map(({ product }) => product.id)
      );
      shippingId = shippingRate?.id ?? null;
    }

    if (hasBogo) {
      const bogoAmount = expandProductQuantities[1] * 0.2 * 100;
      coupons.push({
        name: '20% off 2nd item',
        amount: bogoAmount,
      });
    }
  } catch (error) {
    console.error('Error calculating discounts:', error);
  } finally {
    if (coupons.length > 0) {
      const coupon = await createCoupon(
        coupons.reduce((prev, curr) => prev + curr.amount, 0),
        coupons.map((coupon) => coupon.name).join(' & ')
      );
      return {
        shipping: shippingId,
        coupons: [coupon],
      };
    }

    return {
      shipping: shippingId,
      coupons: null,
    };
  }
};
