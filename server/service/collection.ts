import { prisma } from '@/prisma';
import {
  getCollectionBySlug as getCollectionBySlugRepo,
  getCollectionNames as getCollectionNamesRepo,
  updateCollection as updateCollectionRepo,
  updateCollectionProducts as updateCollectionProductsRepo,
  createCollection as createCollectionRepo,
  deleteCollection as deleteCollectionRepo,
} from '../repository/collection';
import { Collection, CollectionName } from '@/types/collection';
import { getProducts } from './product';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

export const getCollectionBySlug = async (
  slug: string
): Promise<Collection | null> => {
  if (slug === 'all') {
    return {
      id: 'all',
      name: 'Shop All Rings',
      slug: 'all',
      imageSrc:
        'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-01.jpg',
      products: await getProducts(),
    };
  }
  return getCollectionBySlugRepo({ db: prisma, slug });
};

export const getCollectionNames = async (): Promise<CollectionName[]> => {
  return getCollectionNamesRepo({ db: prisma });
};

export const updateCollection = async (
  collection: CollectionName
): Promise<CollectionName> => {
  return await updateCollectionRepo({ db: prisma, collection });
};

export const updateCollectionProducts = async (
  collectionId: string,
  productIds: string[]
): Promise<Collection> => {
  return await updateCollectionProductsRepo({
    db: prisma,
    collectionId,
    productIds,
  });
};

export const createCollection = async (
  collection: CollectionName
): Promise<CollectionName> => {
  return await createCollectionRepo({ db: prisma, collection });
};

export const deleteCollection = async (id: string): Promise<void> => {
  return await deleteCollectionRepo({ db: prisma, id });
};

export const searchProductsInCollection = async (
  slug: string,
  filter: Record<string, string[]>
): Promise<Collection | null> => {
  const collection = await getCollectionBySlug(slug);
  if (!collection) {
    return null;
  }

  const products = collection.products;
  const filtered = products.filter((product) =>
    Object.entries(filter).every(([key, values]) =>
      values.every((value) => product.variants[key]?.includes(value))
    )
  );

  return { ...collection, products: filtered };
};

export const getPopularCollections = unstable_cache(
  async (): Promise<CollectionName[]> => {
    const collections = await getCollectionNames();

    return collections.slice(0, 5);
  }
);
