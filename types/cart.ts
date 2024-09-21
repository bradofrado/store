import { z } from 'zod';
import { productItemSchema, productVariantSchema } from './product';

export const cartItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  product: productItemSchema,
  quantity: z.number(),
  variants: productVariantSchema,
});
export type CartItem = z.infer<typeof cartItemSchema>;
