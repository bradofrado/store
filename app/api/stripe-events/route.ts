import { prisma } from '@/prisma';
import {
  createPrice,
  createProduct,
  deletePrice,
  deleteProduct,
  updatePrice,
  updateProduct,
} from '@/server/repository/product';
import { getProduct, validateStripeWebhook } from '@/server/repository/stripe';

export async function POST(request: Request) {
  try {
    const event = await validateStripeWebhook(request);
    if (event.type === 'product.created') {
      const product = await getProduct(event.data.object.id);
      if (!product) {
        return new Response('Invalid Product', { status: 400 });
      }

      const newProduct = await createProduct({ db: prisma, product });

      return new Response('Created product', { status: 200 });
    } else if (event.type === 'product.updated') {
      const stripeProduct = event.data.object;
      const product = await getProduct(event.data.object.id);
      if (!product) {
        return new Response('Invalid Product', { status: 400 });
      }

      const updatedProduct = await updateProduct({
        db: prisma,
        product,
        id: product.id,
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
      const product = await getProduct(event.data.object.product as string);
      if (!product) {
        return new Response('No need to update product', { status: 200 });
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
    }

    return new Response('Unhandled event', { status: 400 });
  } catch (e) {
    return new Response(`Invalid Webhook ${String(e)}`, { status: 400 });
  }
}
