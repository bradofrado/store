import { z } from 'zod';
import { productSchema, productVariantSchema } from './product';

export const orderItemSchema = z.object({
  id: z.string(),
  product: productSchema,
  quantity: z.number(),
  variants: productVariantSchema,
});
export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orders: z.array(orderItemSchema),
  status: z.string(),
  total: z.number(),
});
export type Order = z.infer<typeof orderSchema>;
