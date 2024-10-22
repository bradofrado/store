import { Db, Prisma } from '@/prisma';
import { Product, productVariantSchema } from '@/types/product';
import { prismaToImage } from './image';

export const productPayload = {
  include: {
    images: true,
    prices: true,
  },
} satisfies Prisma.ProductFindManyArgs;

interface GetProductsRequest {
  db: Db;
}
export const getProducts = async ({
  db,
}: GetProductsRequest): Promise<Product[]> => {
  const products = await db.product.findMany({
    ...productPayload,
  });

  return products.map(prismaToProduct);
};

interface GetProductRequest {
  db: Db;
  id: string;
}
export const getProduct = async ({
  db,
  id,
}: GetProductRequest): Promise<Product | null> => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    ...productPayload,
  });
  if (!product) {
    return null;
  }

  return prismaToProduct(product);
};

export const getProductByName = async ({
  db,
  name,
}: {
  db: Db;
  name: string;
}): Promise<Product | null> => {
  const product = await db.product.findFirst({
    where: {
      name,
    },
    ...productPayload,
  });
  if (!product) {
    return null;
  }

  return prismaToProduct(product);
};

interface CreateProductRequest {
  db: Db;
  product: Product;
}
export const createProduct = async ({
  db,
  product,
}: CreateProductRequest): Promise<Product> => {
  const newProduct = await db.product.create({
    data: {
      id: product.id ? product.id : undefined,
      name: product.name,
      description: product.description,
      details: product.details,
      variants: product.variants,
      images: {
        createMany: {
          data: product.images.map((image) => ({
            imageSrc: image.imageSrc,
            imageAlt: image.imageAlt,
            primary: image.primary,
          })),
        },
      },
      prices:
        product.price !== null
          ? {
              create: {
                id: product.priceId ? product.priceId : undefined,
                price: product.price,
              },
            }
          : undefined,
    },
    ...productPayload,
  });
  return prismaToProduct(newProduct);
};

interface UpdateProductRequest {
  db: Db;
  id: string;
  product: Product;
}
export const updateProduct = async ({
  db,
  id,
  product,
}: UpdateProductRequest): Promise<Product> => {
  const updatedProduct = await db.product.update({
    where: {
      id,
    },
    data: {
      name: product.name,
      description: product.description,
      details: product.details,
      variants: product.variants,
      images: {
        deleteMany: {},
        createMany: {
          data: product.images.map((image) => ({
            imageSrc: image.imageSrc,
            imageAlt: image.imageAlt,
            primary: image.primary,
          })),
        },
      },
      prices:
        product.priceId !== null && product.price !== null
          ? {
              deleteMany: {},
              create: {
                id: product.priceId,
                price: product.price,
              },
            }
          : undefined,
    },
    ...productPayload,
  });
  return prismaToProduct(updatedProduct);
};

interface DeleteProductRequest {
  db: Db;
  id: string;
}
export const deleteProduct = async ({
  db,
  id,
}: DeleteProductRequest): Promise<void> => {
  await db.product.delete({
    where: {
      id,
    },
  });
};

interface CreatePriceRequest {
  db: Db;
  price: number;
  priceId?: string;
  productId: string;
}
export const createPrice = async ({
  db,
  price,
  priceId,
  productId,
}: CreatePriceRequest): Promise<void> => {
  await db.price.create({
    data: {
      id: priceId,
      price: price,
      product: {
        connect: {
          id: productId,
        },
      },
    },
  });
};

interface UpdatePriceRequest {
  db: Db;
  price: number;
  priceId: string;
}
export const updatePrice = async ({
  db,
  price,
  priceId,
}: UpdatePriceRequest): Promise<void> => {
  await db.price.update({
    where: {
      id: priceId,
    },
    data: {
      price: price,
    },
  });
};

interface DeletePriceRequest {
  db: Db;
  priceId: string;
}
export const deletePrice = async ({
  db,
  priceId,
}: DeletePriceRequest): Promise<void> => {
  await db.price.delete({
    where: {
      id: priceId,
    },
  });
};

export const prismaToProduct = (
  prismaProduct: Prisma.ProductGetPayload<typeof productPayload>
): Product => {
  const mainImage = prismaProduct.images.find((image) => image.primary);
  const mainPrice = prismaProduct.prices[0];

  return {
    id: prismaProduct.id,
    name: prismaProduct.name,
    price: mainPrice?.price ?? null,
    priceId: mainPrice?.id ?? null,
    description: prismaProduct.description,
    imageSrc: mainImage?.imageSrc ?? '',
    imageAlt: mainImage?.imageAlt ?? '',
    images: prismaProduct.images.map(prismaToImage),
    options: '',
    details: prismaProduct.details,
    variants: productVariantSchema.parse(prismaProduct.variants),
  };
};
