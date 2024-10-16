import { VariantSelection } from '@/types/variant';
import { encodeState } from '@/utils/common';

export const getProductUrl = (
  id: string,
  variants?: VariantSelection
): string =>
  `/products/${id}${variants !== undefined ? `?variant=${encodeState(variants)}` : ''}`;

export const getCollectionUrl = (slug: string): string =>
  `/collections/${slug}`;
