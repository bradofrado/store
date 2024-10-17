import { Image } from '@/types/image';
import { uploadImage as uploadImageRepo } from '../repository/blob';
import {
  createImage,
  updateImage as updateImageRepo,
  deleteImage as deleteImageRepo,
} from '../repository/image';
import { prisma } from '@/prisma';

export const uploadImage = async (
  productId: string,
  image: Image | null,
  file: File
): Promise<Image> => {
  const blob = await uploadImageRepo(file);
  if (!image) {
    const imageWithBlob: Image = {
      id: '',
      imageSrc: blob.url,
      imageAlt: blob.pathname,
      primary: false,
      variant: null,
    };
    const imageWithId = await createImage({
      db: prisma,
      image: imageWithBlob,
      productId,
    });

    return imageWithId;
  }

  const imageWithBlob: Image = {
    ...image,
    imageSrc: blob.url,
  };
  return updateImageRepo({ db: prisma, image: imageWithBlob });
};

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
