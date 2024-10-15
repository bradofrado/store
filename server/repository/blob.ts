import { put, PutBlobResult } from '@vercel/blob';

export const uploadImage = async (imageFile: File): Promise<PutBlobResult> => {
  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
  });

  return blob;
};
