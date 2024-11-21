import { listImages, uploadImage } from '@/server/repository/blob';
import { HarmonySetup } from 'harmony-ai-editor';
import { uploadImageFormData } from './actions';
import { fonts } from './fonts/fonts';

export const Harmony: React.FunctionComponent = async () => {
  const images = await listImages();
  return (
    <HarmonySetup
      repositoryId='7adebdf4-def2-479a-ab5e-c855bebe2d2c'
      cdnImages={images.blobs.map((blob) => blob.url)}
      uploadImage={uploadImageFormData}
      fonts={fonts}
    />
  );
};
