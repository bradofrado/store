import { Product } from '@/types/product';
import {
  getProducts as getProductsRepo,
  getProduct as getProductRepo,
  getProductByName as getProductByNameRepo,
} from '../repository/product';
import {
  searchProducts as searchProductsStripe,
  stripeToProduct,
} from '../repository/stripe';
import { prisma } from '@/prisma';
import { getCollectionBySlug } from './collection';

export const getProducts = async (): Promise<Product[]> => {
  const products = await getProductsRepo({ db: prisma });

  return products;
};

export const getPopularProducts = async (): Promise<Product[]> => {
  const popularCollection = await getCollectionBySlug('best-sellers');
  const popular = (popularCollection?.products ?? (await getProducts())).slice(
    0,
    8
  );

  return popular;
};

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  const product = await getProductRepo({ id: productId, db: prisma });

  return product;
};

export const getProductByName = async (
  name: string
): Promise<Product | null> => {
  const product = await getProductByNameRepo({ name, db: prisma });

  return product;
};

export const searchProducts = async (
  filter: Record<string, string[]>
): Promise<Product[]> => {
  const query = Object.entries(filter).reduce(
    (prev, [key, values]) =>
      values.length > 0 ? `${prev} -metadata['${key}']:null` : prev,
    ''
  );

  if (query === '') {
    return getProducts();
  }

  const products = await searchProductsStripe(query);
  const filtered = products.filter((product) =>
    Object.entries(filter).every(([key, values]) =>
      values.every((value) => product.metadata[key]?.includes(value))
    )
  );

  return Promise.all(filtered.map(stripeToProduct));
};
