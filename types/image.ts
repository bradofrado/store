import { z } from 'zod';

export const imageSchema = z.object({
  id: z.number(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  primary: z.boolean(),
});
export type Image = z.infer<typeof imageSchema>;
