import { encodeState } from '@/utils/common';
import { ProductVariant } from '@/types/product';

export const getProductUrl = (id: string, variants?: ProductVariant): string =>
  `/products/${id}?variant=${encodeState(variants)}`;
