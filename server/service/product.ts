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
import { unstable_cache } from 'next/cache';

export const getProducts = async (): Promise<Product[]> => {
  const products = await getProductsRepo({ db: prisma });

  return products;
};

export const getPopularProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const popularCollection = await getCollectionBySlug('best-sellers');
    const popular = (
      popularCollection?.products ?? (await getProducts())
    ).slice(0, 8);

    return popular;
  },
  undefined,
  { revalidate: 60 * 60 }
);

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

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  primaryImageUrl: string;
  variants: Record<string, string[]>;
  details: string[];
}

export const createProduct = async (
  data: CreateProductRequest
): Promise<Product> => {
  const { createStripeProduct, stripeToProduct } = await import(
    '../repository/stripe'
  );
  const { createProduct: createProductRepo } = await import(
    '../repository/product'
  );

  // Convert variants to metadata format (comma-separated strings)
  const metadata = Object.entries(data.variants).reduce(
    (prev, [key, values]) => ({ ...prev, [key]: values.join(',') }),
    {}
  );

  // Create product in Stripe
  const stripeProduct = await createStripeProduct({
    name: data.name,
    description: data.description,
    images: [data.primaryImageUrl],
    metadata,
    price: data.price,
  });

  // Convert Stripe product to our Product type
  const product = await stripeToProduct(stripeProduct);

  // Sync to our database
  await createProductRepo({
    db: prisma,
    product: {
      ...product,
      details: data.details,
    },
  });

  return product;
};

export interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  primaryImageUrl?: string;
  variants?: Record<string, string[]>;
  details?: string[];
}

export const updateProduct = async (
  data: UpdateProductRequest
): Promise<Product> => {
  const { updateStripeProduct, updateStripeProductPrice, stripeToProduct } =
    await import('../repository/stripe');
  const { updateProduct: updateProductRepo, getProduct: getProductRepo } =
    await import('../repository/product');

  // Get the current product
  const currentProduct = await getProductRepo({ id: data.id, db: prisma });
  if (!currentProduct) {
    throw new Error('Product not found');
  }

  // Convert variants to metadata format if provided
  const metadata = data.variants
    ? Object.entries(data.variants).reduce(
        (prev, [key, values]) => ({ ...prev, [key]: values.join(',') }),
        {}
      )
    : undefined;

  // Prepare images array for Stripe
  let images: string[] | undefined = undefined;
  if (data.primaryImageUrl) {
    // Keep all existing images but replace the first one with the new primary image
    const existingImages = currentProduct.images
      .filter((img) => !img.primary)
      .map((img) => img.imageSrc);
    images = [data.primaryImageUrl, ...existingImages];
  }

  // Update product in Stripe
  await updateStripeProduct({
    productId: data.id,
    name: data.name,
    description: data.description,
    images,
    metadata,
  });

  // Update price if changed
  if (data.price !== undefined && data.price !== currentProduct.price) {
    await updateStripeProductPrice({
      productId: data.id,
      oldPriceId: currentProduct.priceId ?? undefined,
      newPrice: data.price,
    });
  }

  // Fetch updated product from Stripe
  const { getProduct: getStripeProduct } = await import('../repository/stripe');
  const updatedStripeProduct = await getStripeProduct(data.id);
  if (!updatedStripeProduct) {
    throw new Error('Failed to fetch updated product from Stripe');
  }

  // Sync to our database
  const updatedProduct = await updateProductRepo({
    db: prisma,
    id: data.id,
    product: {
      ...updatedStripeProduct,
      details: data.details ?? currentProduct.details,
    },
  });

  return updatedProduct;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const { archiveStripeProduct } = await import('../repository/stripe');
  const { deleteProduct: deleteProductRepo } = await import(
    '../repository/product'
  );

  // Archive in Stripe
  await archiveStripeProduct(productId);

  // Mark as deleted in our database
  await deleteProductRepo({ db: prisma, id: productId });
};
