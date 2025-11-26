import { prisma } from '@/prisma';
import {
  getCollectionBySlug as getCollectionBySlugRepo,
  getCollectionNames as getCollectionNamesRepo,
  updateCollection as updateCollectionRepo,
  updateCollectionProducts as updateCollectionProductsRepo,
  createCollection as createCollectionRepo,
  deleteCollection as deleteCollectionRepo,
  getCollectionByName as getCollectionByNameRepo,
  getCollections,
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
      order: 0,
    };
  }
  return getCollectionBySlugRepo({ db: prisma, slug });
};

export const getNavbarCollections = unstable_cache(
  async () => {
    // Fetch specific collections for navigation
    const forHerNames = ['For Her', 'Pressed Flowers', 'Sea Shell'];
    const forHimNames = ['For Him', 'Black Ceramic', 'Crushed Stones'];

    const forHerCollections = (
      await Promise.all(forHerNames.map((name) => getCollectionByName(name)))
    ).filter((c): c is NonNullable<typeof c> => c !== null);

    const forHimCollections = (
      await Promise.all(forHimNames.map((name) => getCollectionByName(name)))
    ).filter((c): c is NonNullable<typeof c> => c !== null);

    return { forHerCollections, forHimCollections };
  },
  undefined,
  { revalidate: 60 * 60 }
);

export const getCollectionByName = async (
  name: string
): Promise<Collection | null> => {
  return getCollectionByNameRepo({ db: prisma, name });
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
  async (): Promise<Collection[]> => {
    const collections = await getCollections({ db: prisma });

    return collections;
  },
  undefined,
  { revalidate: 60 * 60 }
);
