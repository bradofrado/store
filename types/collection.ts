import { z } from 'zod';
import { productSchema } from './product';

export const collectionSchema = z.object({
  id: z.string(),
  products: z.array(productSchema),
  name: z.string(),
  slug: z.string(),
  imageSrc: z.string(),
});
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionName = Omit<Collection, 'products'>;
