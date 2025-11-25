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

export const createCollection = ({
  collection,
  db,
}: {
  db: Db;
  collection: CollectionName;
}): Promise<CollectionName> => {
  return db.collection.create({
    data: {
      slug: collection.slug,
      name: collection.name,
      imageSrc: collection.imageSrc,
    },
  });
};

export const updateCollection = ({
  collection,
  db,
}: {
  db: Db;
  collection: CollectionName;
}): Promise<CollectionName> => {
  return db.collection.update({
    where: {
      id: collection.id,
    },
    data: {
      slug: collection.slug,
      name: collection.name,
      imageSrc: collection.imageSrc,
    },
  });
};

export const updateCollectionProducts = async ({
  db,
  collectionId,
  productIds,
}: {
  db: Db;
  collectionId: string;
  productIds: string[];
}): Promise<Collection> => {
  const newCollection = await db.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      products: {
        deleteMany: {},
        create: productIds.map((productId) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
    ...collectionPayload,
  });

  return prismaToCollection(newCollection);
};

export const deleteCollection = async ({
  db,
  id,
}: {
  db: Db;
  id: string;
}): Promise<void> => {
  await db.collection.delete({
    where: {
      id,
    },
  });
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

interface GetCollectionByNameRequest {
  db: Db;
  name: string;
}
export const getCollectionByName = async ({
  db,
  name,
}: GetCollectionByNameRequest): Promise<Collection | null> => {
  const collections = await db.collection.findMany({
    where: {
      name: {
        equals: name,
      },
    },
    ...collectionPayload,
  });
  if (!collections[0]) {
    return null;
  }
  return prismaToCollection(collections[0]);
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
