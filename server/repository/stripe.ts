import { Order, OrderItem } from '@/types/order';
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

export const searchProducts = async (
  query: string
): Promise<stripe.Product[]> => {
  const result = await stripeClient.products.search({
    query,
  });

  return result.data;
};

export const getOrderFromCharge = async (chargeId: string): Promise<Order> => {
  const charge = await stripeClient.charges.retrieve(chargeId);

  const chargeToOrder = async (charge: stripe.Charge): Promise<Order> => {
    if (typeof charge.payment_intent !== 'string') {
      throw new Error('No payment intent on charge ' + charge.id);
    }

    if (
      typeof charge.receipt_url !== 'string' ||
      typeof charge.receipt_number !== 'string'
    ) {
      throw new Error('No receipt url on charge ' + charge.id);
    }

    const transactions = await stripeClient.checkout.sessions.list({
      payment_intent: charge.payment_intent,
    });
    const lineItems = await stripeClient.checkout.sessions.listLineItems(
      transactions.data[0].id
    );

    return {
      id: charge.id,
      datePlaced: new Date(charge.created * 1000),
      invoiceSrc: charge.receipt_url,
      number: charge.receipt_number,
      total: charge.amount / 100,
      orders: await Promise.all(
        lineItems.data.map<Promise<OrderItem>>(async (item) => {
          const product = item.price
            ? await getProduct(
                typeof item.price.product === 'string' ? item.price.product : ''
              )
            : null;
          if (!product) {
            throw new Error('No product found for price ' + item.id);
          }
          return {
            id: item.id,
            product: product,
            quantity: item.quantity ?? 0,
            variants: {},
            status: 'pending',
            shippedDate: null,
          };
        })
      ),
    };
  };

  return chargeToOrder(charge);
};

export const getCharge = async (chargeId: string) => {
  const charge = await stripeClient.charges.retrieve(chargeId);

  return charge;
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
      variant: null,
    })),
    imageSrc: product.images[0],
    imageAlt: product.name,
    variants: Object.entries(product.metadata).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value.split(',') }),
      {}
    ),
  };
};
