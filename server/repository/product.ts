import { Db, Prisma } from '@/prisma';
import { Product } from '@/types/product';
import { prismaToImage } from './image';

export const productPayload = {
  include: {
    images: true,
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
      name: product.name,
      price: product.price,
      description: product.description,
      details: product.details,
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
      price: product.price,
      description: product.description,
      details: product.details,
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

export const prismaToProduct = (
  prismaProduct: Prisma.ProductGetPayload<typeof productPayload>
): Product => {
  const mainImage = prismaProduct.images.find((image) => image.primary);
  return {
    id: prismaProduct.id,
    name: prismaProduct.name,
    price: prismaProduct.price,
    description: prismaProduct.description,
    imageSrc: mainImage?.imageSrc ?? '',
    imageAlt: mainImage?.imageAlt ?? '',
    images: prismaProduct.images.map(prismaToImage),
    options: '',
    details: prismaProduct.details,
  };
};
