import { prisma } from '@/prisma';
import {
  getCollectionBySlug as getCollectionBySlugRepo,
  getCollectionNames as getCollectionNamesRepo,
} from '../repository/collection';
import { Collection, CollectionName } from '@/types/collection';
import { getProducts } from './product';

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

export const getPopularCollections = async (): Promise<CollectionName[]> => {
  const collections = await getCollectionNames();

  return collections.slice(0, 5);
};
