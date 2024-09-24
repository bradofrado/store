import { Product } from '@/types/product';
import stripe from 'stripe';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '');

interface CreateCheckoutLinkRequest {
  fromUrl: string;
  products: { stripeProductId: string; quantity: number }[];
  customerId: string;
}
export const createCheckoutSession = async ({
  fromUrl,
  products,
  customerId,
}: CreateCheckoutLinkRequest): Promise<
  stripe.Response<stripe.Checkout.Session>
> => {
  const session = await stripeClient.checkout.sessions.create({
    line_items: products.map(({ stripeProductId: price, quantity }) => ({
      price,
      quantity,
    })),
    mode: 'payment',
    success_url: `${fromUrl}/?success=true`,
    cancel_url: `${fromUrl}/?canceled=true`,
    customer: customerId,
  });

  return session;
};

export const createCustomer = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const customer = await stripeClient.customers.create({
    email,
    name,
  });

  return customer;
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await stripeClient.products.list({
    expand: ['data.default_price'],
  });

  return Promise.all(products.data.map(stripeToProduct));
};

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  const product = await getStripeProduct(productId);

  return stripeToProduct(product);
};

export const validateStripeWebhook = async (request: Request) => {
  const signature = request.headers.get('stripe-signature');
  if (signature === null) {
    throw new Error('No signature');
  }

  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const reqBuffer = await request.text();

  return stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
};

const getStripeProduct = async (productId: string) => {
  const product = await stripeClient.products.retrieve(productId, {
    expand: ['default_price'],
  });

  return product;
};

const getPriceFromProduct = async (
  product: stripe.Product
): Promise<{ id: string | null; price: number | null }> => {
  const getPrice = (price: stripe.Price) => {
    return {
      price: (price.unit_amount ?? 0) / 100,
      id: price.id,
    };
  };
  if (!product.default_price) {
    return { id: null, price: null };
  }

  if (typeof product.default_price === 'string') {
    const price = await stripeClient.prices.retrieve(product.default_price);
    return getPrice(price);
  }

  if (product.default_price.unit_amount === null) {
    throw new Error('No unit amount on price ' + product.default_price.id);
  }

  return getPrice(product.default_price);
};

export const stripeToProduct = async (
  product: stripe.Product
): Promise<Product> => {
  const { id: priceId, price } = await getPriceFromProduct(product);
  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    details: [],
    options: '',
    price,
    priceId,
    images: product.images.map((image, i) => ({
      id: `product-${product.id}-image-${i}`,
      imageSrc: image,
      imageAlt: product.name,
      primary: i === 0,
    })),
    imageSrc: product.images[0],
    imageAlt: product.name,
  };
};
