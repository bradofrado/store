import { Db, Prisma } from '@/prisma';
import { Image } from '@/types/image';
import { variantSelectionSchema } from '@/types/variant';
import { z } from 'zod';

const ImagePayload = {} satisfies Prisma.ImageFindManyArgs;

interface GetImagesRequest {
  db: Db;
}
export const getImages = async ({ db }: GetImagesRequest): Promise<Image[]> => {
  const images = await db.image.findMany();

  return images.map(prismaToImage);
};

interface CreateImageRequest {
  db: Db;
  image: Image;
  productId: string;
}
export const createImage = async ({
  db,
  image,
  productId,
}: CreateImageRequest): Promise<Image> => {
  const prismaImage = await db.image.create({
    data: {
      imageSrc: image.imageSrc,
      imageAlt: image.imageAlt,
      primary: image.primary,
      product: {
        connect: {
          id: productId,
        },
      },
      variant: image.variant ?? undefined,
    },
  });

  return prismaToImage(prismaImage);
};

interface UpdateImageRequest {
  db: Db;
  image: Image;
}
export const updateImage = async ({
  db,
  image,
}: UpdateImageRequest): Promise<Image> => {
  const prismaImage = await db.image.update({
    where: {
      id: image.id,
    },
    data: {
      imageSrc: image.imageSrc,
      imageAlt: image.imageAlt,
      primary: image.primary,
      variant: image.variant ?? undefined,
    },
  });

  return prismaToImage(prismaImage);
};

interface DeleteImageRequest {
  db: Db;
  id: string;
}
export const deleteImage = async ({
  db,
  id,
}: DeleteImageRequest): Promise<void> => {
  await db.image.delete({
    where: {
      id,
    },
  });
};

export const prismaToImage = (
  prismaImage: Prisma.ImageGetPayload<typeof ImagePayload>
): Image => {
  return {
    id: prismaImage.id,
    imageSrc: prismaImage.imageSrc,
    imageAlt: prismaImage.imageAlt,
    primary: prismaImage.primary,
    variant: z.nullable(variantSelectionSchema).parse(prismaImage.variant),
  };
};
