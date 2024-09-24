import { Db, Prisma } from '@/prisma';
import {
  Order,
  OrderItem,
  OrderStatus,
  orderStatusSchema,
} from '@/types/order';
import { prismaToProduct, productPayload } from './product';
import { z } from 'zod';
import { variantSelectionSchema } from '@/types/product';

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
  userId: string;
}
export const getOrders = async ({
  db,
  userId,
}: GetOrdersRequest): Promise<Order[]> => {
  const orders = await db.order.findMany({
    where: {
      userId,
    },
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
  userId: string;
}
export const createOrder = async ({
  db,
  order,
  userId,
}: CreateOrderRequest): Promise<Order> => {
  const prismaOrder = await db.order.create({
    data: {
      userId,
      items: {
        create: order.orders.map((order) => ({
          product: {
            connect: {
              id: order.product.id,
            },
          },
          quantity: order.quantity,
          variants: order.variants,
          status: order.status,
          shippedDate: order.shippedDate,
        })),
      },
      total: order.total,
      number: order.number,
      invoiceSrc: order.invoiceSrc,
    },
    ...orderPayload,
  });

  return prismaToOrder(prismaOrder);
};

interface UpdateOrderItemRequest {
  db: Db;
  orderItemId: string;
  status: OrderStatus;
  dateShipped: Date | null;
}
export const updateOrderItem = async ({
  db,
  orderItemId,
  status,
  dateShipped,
}: UpdateOrderItemRequest): Promise<OrderItem> => {
  const prismaOrder = await db.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: {
      status,
      shippedDate: dateShipped,
    },
    ...orderItemPayload,
  });

  return prismaToOrderItem(prismaOrder);
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
    orders: prismaOrder.items.map(prismaToOrderItem),
    total: prismaOrder.total,
    number: prismaOrder.number,
    invoiceSrc: prismaOrder.invoiceSrc,
    datePlaced: prismaOrder.createdAt,
  };
};

export const prismaToOrderItem = (
  prismaOrderItem: Prisma.OrderItemGetPayload<typeof orderItemPayload>
): OrderItem => {
  return {
    id: prismaOrderItem.id,
    product: prismaToProduct(prismaOrderItem.product),
    quantity: prismaOrderItem.quantity,
    variants: variantSelectionSchema.parse(prismaOrderItem.variants),
    status: orderStatusSchema.parse(prismaOrderItem.status),
    shippedDate: prismaOrderItem.shippedDate,
  };
};
