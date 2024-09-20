import { z } from 'zod';
import { productSchema, productVariantSchema } from './product';

export const cartItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  product: productSchema,
  quantity: z.number(),
  variants: productVariantSchema,
});
export type CartItem = z.infer<typeof cartItemSchema>;
