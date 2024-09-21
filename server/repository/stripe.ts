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
