import { z } from 'zod';
import { imageSchema } from './image';

export const productVariantSchema = z.record(z.string());

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  options: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  details: z.array(z.string()),
});
export type Product = z.infer<typeof productSchema>;

export const productItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  images: z.array(imageSchema),
  description: z.string(),
  details: z.array(z.string()),
});
export type ProductItem = z.infer<typeof productItemSchema>;
