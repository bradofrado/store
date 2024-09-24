import { z } from 'zod';
import { productSchema, variantSelectionSchema } from './product';

export const cartItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  product: productSchema,
  quantity: z.number(),
  variants: variantSelectionSchema,
});
export type CartItem = z.infer<typeof cartItemSchema>;
