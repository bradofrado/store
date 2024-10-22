import { Image } from '@/types/image';
import { uploadImage as uploadImageRepo } from '../repository/blob';
import {
  createImage,
  updateImage as updateImageRepo,
  deleteImage as deleteImageRepo,
} from '../repository/image';
import { prisma } from '@/prisma';

export const selectImageUrl = async (
  productId: string,
  image: Image
): Promise<Image> => {
  if (image.id === '') {
    return createImage({ db: prisma, image, productId });
  }

  return updateImageRepo({ db: prisma, image });
};

export const deleteImage = async (imageId: string): Promise<void> => {
  return deleteImageRepo({ db: prisma, id: imageId });
};
