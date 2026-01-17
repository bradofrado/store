import type { MetadataRoute } from 'next';
import { prisma } from '@/prisma';
import { getCollectionUrl } from './utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://venusrings.store';

  // Fetch all collections (excluding 'all' slug)
  const collections = await prisma.collection.findMany({
    where: {
      slug: {
        not: 'all',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Fetch all products (excluding deleted ones)
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/build-your-own-band`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/jewelry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${baseUrl}${getCollectionUrl(collection.slug)}`,
      lastModified: collection.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  );

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
