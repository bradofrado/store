import { prisma } from '@/prisma';
import {
  getCustomer,
  getCustomerFromStripeId,
} from '@/server/repository/customer';
import { createOrder } from '@/server/repository/order';
import {
  createPrice,
  createProduct,
  deletePrice,
  deleteProduct,
  updatePrice,
  updateProduct,
  getProduct,
} from '@/server/repository/product';
import {
  getCharge,
  getOrderFromCharge,
  getProduct as getStripeProduct,
  validateStripeWebhook,
} from '@/server/repository/stripe';
import { checkoutCart } from '@/server/service/cart';

export async function POST(request: Request) {
  try {
    const event = await validateStripeWebhook(request);
    if (event.type === 'product.created') {
      const product = await getStripeProduct(event.data.object.id);
      if (!product) {
        return new Response('Invalid Product', { status: 400 });
      }

      const newProduct = await createProduct({ db: prisma, product });

      return new Response('Created product', { status: 200 });
    } else if (event.type === 'product.updated') {
      const stripeProduct = await getStripeProduct(event.data.object.id);
      if (!stripeProduct) {
        return new Response('Invalid Product', { status: 400 });
      }

      if (!(await getProduct({ db: prisma, id: stripeProduct.id }))) {
        return new Response('Product does not exist', { status: 200 });
      }

      const updatedProduct = await updateProduct({
        db: prisma,
        product: stripeProduct,
        id: stripeProduct.id,
      });

      return new Response('Updated product', { status: 200 });
    } else if (event.type === 'product.deleted') {
      const stripeProduct = event.data.object;
      const updatedProduct = await deleteProduct({
        db: prisma,
        id: stripeProduct.id,
      });

      return new Response('Deleted product', { status: 200 });
    } else if (event.type === 'price.created') {
      const stripePrice = event.data.object;
      if (typeof stripePrice.product !== 'string') {
        return new Response('Invalid Price. Expected product id', {
          status: 400,
        });
      }
      const product = await getStripeProduct(
        event.data.object.product as string
      );
      if (!product) {
        return new Response('No need to update product', { status: 200 });
      }

      if (!(await getProduct({ db: prisma, id: product.id }))) {
        return new Response('Product does not exist', { status: 200 });
      }

      const newPrice = await createPrice({
        db: prisma,
        price: (stripePrice.unit_amount ?? 0) / 100,
        priceId: stripePrice.id,
        productId: stripePrice.product,
      });

      return new Response('Updated price', { status: 200 });
    } else if (event.type === 'price.updated') {
      const stripePrice = event.data.object;
      if (typeof stripePrice.product !== 'string') {
        return new Response('Invalid Price. Expected product id', {
          status: 400,
        });
      }

      const updatedPrice = await updatePrice({
        db: prisma,
        price: (stripePrice.unit_amount ?? 0) / 100,
        priceId: stripePrice.id,
      });

      return new Response('Updated price', { status: 200 });
    } else if (event.type === 'price.deleted') {
      const stripePrice = event.data.object;
      const deletedPrice = await deletePrice({
        db: prisma,
        priceId: stripePrice.id,
      });

      return new Response('Deleted price', { status: 200 });
    } else if (event.type === 'charge.succeeded') {
      const charge = await getCharge(event.data.object.id);
      if (typeof charge.customer !== 'string') {
        return new Response('Invalid Charge. Expected customer id', {
          status: 400,
        });
      }

      const customer = await getCustomerFromStripeId({
        db: prisma,
        stripeId: charge.customer,
      });
      if (!customer) {
        return new Response('Invalid Charge. Customer does not exist', {
          status: 400,
        });
      }
      if (!charge.receipt_url) {
        return new Response('Invalid Charge. Missing receipt information', {
          status: 400,
        });
      }

      const newOrder = await checkoutCart({
        userId: customer.clerkId,
        number: charge.receipt_number ?? `${charge.created}`,
        invoiceSrc: charge.receipt_url,
        datePlaced: new Date(charge.created * 1000),
      });

      return new Response('Created order', { status: 200 });
    }

    return new Response('Unhandled event', { status: 400 });
  } catch (e) {
    return new Response(`Invalid Webhook ${String(e)}`, { status: 400 });
  }
}
