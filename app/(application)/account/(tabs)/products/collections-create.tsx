'use client';

import { createCollectionItem, uploadImage } from '@/app/(application)/actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/dialog';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { useState } from 'react';
import { UploadImageDialog } from './upload-image';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/button';
import { wordToKebabCase } from '@/utils/common';

interface CollectionsCreateProps {
  createCollection: typeof createCollectionItem;
  uploadImage: typeof uploadImage;
  uploadedImages: string[];
  collectionCount: number;
}
export const CollectionsCreate: React.FunctionComponent<
  CollectionsCreateProps
> = ({ createCollection, uploadImage, uploadedImages, collectionCount }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

  const onNameChange = (newName: string) => {
    if (!slugTouched) {
      setSlug(wordToKebabCase(newName));
    }
    setName(newName);
  };

  const onSlugChanged = (newSlug: string) => {
    setSlug(wordToKebabCase(newSlug));
    setSlugTouched(true);
  };

  const onContinue = async () => {
    await createCollection({
      id: '',
      name,
      slug,
      imageSrc,
      order: collectionCount,
    });
    router.push(`?edit-collection=${slug}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto hover:cursor-pointer'>
          <span aria-hidden='true' className='absolute inset-0'>
            <PlusIcon className='h-full w-full object-cover object-center' />
          </span>
          <span
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50'
          />
          <span className='relative mt-auto text-center text-xl font-bold text-white'>
            New Collection
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create New Collection</DialogHeader>
        <DialogDescription>
          Enter in the following information to continue creating a new
          collection.
        </DialogDescription>
        <div className='flex flex-col gap-4'>
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={onNameChange} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={onSlugChanged} />
          </div>
          <div>
            <Label>Image</Label>
            {imageSrc ? (
              <div className='h-24 w-24 rounded-md overflow-hidden mb-1'>
                <img src={imageSrc} alt='' className='h-full w-full' />
              </div>
            ) : null}
            <UploadImageDialog
              uploadImage={uploadImage}
              uploadedImages={uploadedImages}
              selectImage={setImageSrc}
            >
              Select Image
            </UploadImageDialog>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onContinue} disabled={!name || !slug || !imageSrc}>
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
