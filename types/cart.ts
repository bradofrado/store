import { z } from 'zod';
import { productSchema } from './product';
import { variantSelectionSchema } from './variant';

export const cartItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  product: productSchema,
  quantity: z.number(),
  variants: variantSelectionSchema,
});
export type CartItem = z.infer<typeof cartItemSchema>;
