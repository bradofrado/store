import { Db, Prisma } from '@/prisma';
import { Collection, CollectionName } from '@/types/collection';
import { getProducts, prismaToProduct, productPayload } from './product';

// interface GetCollectionsRequest {
//   db: Db;
// }
// const getCollections = async ({
//   db,
// }: GetCollectionsRequest): Promise<Collection[]> => {
//   const collections = await db.collection.findMany()
//   const products = await getProducts({ db });
//   return collections.map((collection, i) => ({
//     ...collection,
//     id: String(i),
//     products,
//   }));
// };

const collectionPayload = {
  include: {
    products: {
      include: {
        product: productPayload,
      },
    },
  },
} satisfies Prisma.CollectionFindManyArgs;

interface GetCollectionNames {
  db: Db;
}
export const getCollectionNames = async ({
  db,
}: GetCollectionNames): Promise<CollectionName[]> => {
  const collections = await db.collection.findMany({
    where: {
      slug: {
        not: 'all',
      },
    },
  });
  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    imageSrc: collection.imageSrc,
  }));
};

interface GetCollectionRequest {
  db: Db;
  slug: string;
}
export const getCollectionBySlug = async ({
  db,
  slug,
}: GetCollectionRequest): Promise<Collection | null> => {
  const collection = await db.collection.findUnique({
    where: {
      slug,
    },
    ...collectionPayload,
  });

  if (!collection) {
    return null;
  }

  return prismaToCollection(collection);
};

export const prismaToCollection = (
  collection: Prisma.CollectionGetPayload<typeof collectionPayload>
): Collection => {
  return {
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    imageSrc: collection.imageSrc,
    products: collection.products.map(({ product }) =>
      prismaToProduct(product)
    ),
  };
};

const collections = [
  {
    name: 'Shop All Rings',
    slug: 'all',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-01.jpg',
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-01.jpg',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Workspace',
    slug: 'workspace',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-05.jpg',
  },
  {
    name: 'Sale',
    slug: 'sale',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-category-03.jpg',
  },
];
