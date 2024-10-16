import { z } from 'zod';

export const variantSelectionSchema = z.record(z.string());
export type VariantSelection = z.infer<typeof variantSelectionSchema>;
