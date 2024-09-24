import { z } from 'zod';
import { imageSchema } from './image';

export const productVariantSchema = z.record(z.string());

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.nullable(z.number()),
  priceId: z.nullable(z.string()),
  description: z.string(),
  options: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  images: z.array(imageSchema),
  details: z.array(z.string()),
});
export type Product = z.infer<typeof productSchema>;
