import { Product } from '@/types/product';
import {
  getProducts as getProductsRepo,
  getProduct as getProductRepo,
} from '../repository/product';
import { prisma } from '@/prisma';

export const getProducts = async (): Promise<Product[]> => {
  const products = await getProductsRepo({ db: prisma });

  return products;
};

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  const product = await getProductRepo({ id: productId, db: prisma });

  return product;
};
