import { copy, list, ListBlobResult, put, PutBlobResult } from '@vercel/blob';

export const uploadImage = async (imageFile: File): Promise<PutBlobResult> => {
  const blob = await put(`venus/${imageFile.name}`, imageFile, {
    access: 'public',
  });

  return blob;
};

export const listImages = async (): Promise<ListBlobResult> => {
  const images = await list({ prefix: 'venus/' });

  return images;
};
