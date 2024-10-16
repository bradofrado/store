import { z } from 'zod';
import { variantSelectionSchema } from './variant';

export const imageSchema = z.object({
  id: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  primary: z.boolean(),
  variant: z.nullable(variantSelectionSchema),
});
export type Image = z.infer<typeof imageSchema>;
