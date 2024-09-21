import { Customer } from '@/types/customer';
import { createCustomer as createCustomerRepo } from '../repository/customer';
import { createCustomer as createCustomerStripe } from '../repository/stripe';
import { prisma } from '@/prisma';

export const createCustomer = async ({
  clerkId,
  email,
  name,
}: {
  clerkId: string;
  email: string;
  name: string;
}) => {
  const stripeCustomer = await createCustomerStripe({ email, name });

  const customer: Customer = {
    clerkId,
    stripeId: stripeCustomer.id,
  };
  const newCustomer = await createCustomerRepo({ db: prisma, customer });

  return newCustomer;
};
