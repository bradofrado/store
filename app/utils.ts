import { encodeState } from '@/utils/common';
import { VariantSelection } from '@/types/product';

export const getProductUrl = (
  id: string,
  variants?: VariantSelection
): string =>
  `/products/${id}${variants !== undefined ? `?variant=${encodeState(variants)}` : ''}`;

export const getCollectionUrl = (slug: string): string =>
  `/collections/${slug}`;
