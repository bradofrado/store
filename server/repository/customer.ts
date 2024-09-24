import { Db } from '@/prisma';
import { Customer } from '@/types/customer';

export const createCustomer = async ({
  db,
  customer,
}: {
  db: Db;
  customer: Customer;
}) => {
  const newCustomer = await db.customer.create({
    data: {
      clerkId: customer.clerkId,
      stripeId: customer.stripeId,
    },
  });

  return newCustomer;
};

export const getCustomer = async ({
  userId,
  db,
}: {
  userId: string;
  db: Db;
}): Promise<Customer | null> => {
  return await db.customer.findUnique({
    where: {
      clerkId: userId,
    },
  });
};

export const getCustomerFromStripeId = async ({
  stripeId,
  db,
}: {
  stripeId: string;
  db: Db;
}): Promise<Customer | null> => {
  return await db.customer.findUnique({
    where: {
      stripeId,
    },
  });
};
