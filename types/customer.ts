import { z } from 'zod';

export const customerSchema = z.object({
  clerkId: z.string(),
  stripeId: z.string(),
});
export type Customer = z.infer<typeof customerSchema>;
