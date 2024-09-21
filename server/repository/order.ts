import { Db, Prisma } from '@/prisma';
import { Order, OrderItem } from '@/types/order';
import {
  prismaToProduct,
  prismaToProductItem,
  productPayload,
} from './product';
import { z } from 'zod';
import { productVariantSchema } from '@/types/product';

const orderItemPayload = {
  include: {
    product: productPayload,
  },
} satisfies Prisma.OrderItemFindManyArgs;

const orderPayload = {
  include: {
    items: orderItemPayload,
  },
} satisfies Prisma.OrderFindManyArgs;

interface GetOrdersRequest {
  db: Db;
}
export const getOrders = async ({ db }: GetOrdersRequest): Promise<Order[]> => {
  const orders = await db.order.findMany({
    ...orderPayload,
  });

  return orders.map(prismaToOrder);
};

interface GetOrderRequest {
  db: Db;
  id: string;
}
export const getOrder = async ({
  db,
  id,
}: GetOrderRequest): Promise<Order | null> => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
    ...orderPayload,
  });
  if (!order) {
    return null;
  }

  return prismaToOrder(order);
};

interface CreateOrderRequest {
  db: Db;
  order: Order;
}
export const createOrder = async ({
  db,
  order,
}: CreateOrderRequest): Promise<Order> => {
  const prismaOrder = await db.order.create({
    data: {
      userId: order.userId,
      items: {
        create: order.orders.map((order) => ({
          product: {
            connect: {
              id: order.product.id,
            },
          },
          quantity: order.quantity,
          variants: order.variants,
        })),
      },
      status: order.status,
      total: order.total,
    },
    ...orderPayload,
  });

  return prismaToOrder(prismaOrder);
};

interface UpdateOrderRequest {
  db: Db;
  order: Order;
}
export const updateOrder = async ({
  db,
  order,
}: UpdateOrderRequest): Promise<Order> => {
  const prismaOrder = await db.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: order.status,
    },
    ...orderPayload,
  });

  return prismaToOrder(prismaOrder);
};

interface DeleteOrderRequest {
  db: Db;
  id: string;
}
export const deleteOrder = async ({
  db,
  id,
}: DeleteOrderRequest): Promise<Order> => {
  const prismaOrder = await db.order.delete({
    where: {
      id,
    },
    ...orderPayload,
  });

  return prismaToOrder(prismaOrder);
};

export const prismaToOrder = (
  prismaOrder: Prisma.OrderGetPayload<typeof orderPayload>
): Order => {
  return {
    id: prismaOrder.id,
    userId: prismaOrder.userId,
    orders: prismaOrder.items.map(prismaToOrderItem),
    status: prismaOrder.status,
    total: prismaOrder.total,
  };
};

export const prismaToOrderItem = (
  prismaOrderItem: Prisma.OrderItemGetPayload<typeof orderItemPayload>
): OrderItem => {
  return {
    id: prismaOrderItem.id,
    product: prismaToProductItem(prismaOrderItem.product),
    quantity: prismaOrderItem.quantity,
    variants: productVariantSchema.parse(prismaOrderItem.variants),
  };
};
