import { Order, OrderItem } from '@/types/order';
import { Product } from '@/types/product';
import stripe from 'stripe';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '');

interface CreateCheckoutLinkRequest {
  fromUrl: string;
  products: { stripeProductId: string; quantity: number }[];
  discounts?: { coupon: string }[];
  customerId?: string;
  shippingRate?: string;
}
export const createCheckoutSession = async ({
  fromUrl,
  products,
  discounts,
  customerId,
  shippingRate,
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
    discounts: discounts,
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    shipping_options: shippingRate
      ? [{ shipping_rate: shippingRate }]
      : undefined,
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

export const getCouponsByName = async (
  names: string[]
): Promise<stripe.Coupon[]> => {
  const couponResult = await stripeClient.coupons.list();
  return couponResult.data.filter((coupon) =>
    names.includes(coupon.name ?? '')
  );
};

export const createCoupon = async (
  amountOff: number,
  name: string
): Promise<stripe.Coupon> => {
  const coupon = await stripeClient.coupons.create({
    duration: 'once',
    amount_off: amountOff,
    currency: 'usd',
    name,
  });

  return coupon;
};

export const getShippingRate = async (
  productIds: string[]
): Promise<stripe.ShippingRate | null> => {
  const rates = await stripeClient.shippingRates.list();
  if (productIds.length === 1 && productIds[0] === 'prod_RIazPZ1JclpMnl') {
    return null;
  }

  return rates.data.length > 0 ? rates.data[0] : null;
};

interface CreateProductRequest {
  name: string;
  description: string;
  images: string[];
  metadata: Record<string, string>;
  price: number;
}
export const createStripeProduct = async ({
  name,
  description,
  images,
  metadata,
  price,
}: CreateProductRequest): Promise<stripe.Product> => {
  // Create the product first
  const product = await stripeClient.products.create({
    name,
    description,
    images,
    metadata,
  });

  // Create the price for the product
  await stripeClient.prices.create({
    product: product.id,
    unit_amount: Math.round(price * 100), // Convert to cents
    currency: 'usd',
  });

  // Fetch the product with expanded price
  const productWithPrice = await getStripeProduct(product.id);

  return productWithPrice;
};

interface UpdateProductRequest {
  productId: string;
  name?: string;
  description?: string;
  images?: string[];
  metadata?: Record<string, string>;
}
export const updateStripeProduct = async ({
  productId,
  name,
  description,
  images,
  metadata,
}: UpdateProductRequest): Promise<stripe.Product> => {
  const product = await stripeClient.products.update(productId, {
    name,
    description,
    images,
    metadata,
  });

  return product;
};

interface UpdateProductPriceRequest {
  productId: string;
  oldPriceId?: string;
  newPrice: number;
}
export const updateStripeProductPrice = async ({
  productId,
  oldPriceId,
  newPrice,
}: UpdateProductPriceRequest): Promise<stripe.Price> => {
  // Archive the old price if it exists
  if (oldPriceId) {
    await stripeClient.prices.update(oldPriceId, {
      active: false,
    });
  }

  // Create a new price
  const price = await stripeClient.prices.create({
    product: productId,
    unit_amount: Math.round(newPrice * 100), // Convert to cents
    currency: 'usd',
  });

  // Update the product's default price
  await stripeClient.products.update(productId, {
    default_price: price.id,
  });

  return price;
};

export const archiveStripeProduct = async (
  productId: string
): Promise<stripe.Product> => {
  const product = await stripeClient.products.update(productId, {
    active: false,
  });

  return product;
};
