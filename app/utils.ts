import { encodeState } from '@/hooks/query-state';
import { ProductVariant } from '@/types/product';

export const getProductUrl = (id: string, variants?: ProductVariant): string =>
  `/products/${id}?variant=${encodeState(variants)}`;
