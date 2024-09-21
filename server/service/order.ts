import { prisma } from '@/prisma';
import { getOrders as getOrdersRepository } from '../repository/order';
import { Order } from '@/types/order';

export const getOrders = async ({
  userId,
}: {
  userId: string;
}): Promise<Order[]> => {
  return getOrdersRepository({ userId, db: prisma });
};
