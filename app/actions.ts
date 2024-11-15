'use server';

import { uploadImage } from '@/server/repository/blob';

export const uploadImageFormData = async (
  formData: FormData
): Promise<string> => {
  const image = formData.get('image') as File;
  const result = await uploadImage(image);
  return result.url;
};
