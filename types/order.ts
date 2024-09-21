import { z } from 'zod';
import { productSchema, productVariantSchema } from './product';

export const orderStatusSchema = z.union([
  z.literal('pending'),
  z.literal('delivered'),
  z.literal('shipped'),
  z.literal('cancelled'),
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderItemSchema = z.object({
  id: z.string(),
  product: productSchema,
  quantity: z.number(),
  variants: productVariantSchema,
  status: orderStatusSchema,
  shippedDate: z.date().nullable(),
});
export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  number: z.string(),
  userId: z.string(),
  orders: z.array(orderItemSchema),
  total: z.number(),
  datePlaced: z.date(),
  invoiceSrc: z.string(),
});
export type Order = z.infer<typeof orderSchema>;
