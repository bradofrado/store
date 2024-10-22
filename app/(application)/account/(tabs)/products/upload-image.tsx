'use client';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { UploadFile } from '@/components/upload-file';
import { useState } from 'react';

interface UploadImageDialogProps {
  uploadedImages: string[];
  uploadImage: (file: FormData) => Promise<string>;
  selectImage: (imageUrl: string) => void | Promise<void>;
  children: React.ReactNode;
}
export const UploadImageDialog: React.FunctionComponent<
  UploadImageDialogProps
> = ({ uploadedImages, uploadImage, selectImage, children }) => {
  const [open, setOpen] = useState(false);
  const constructFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append('image', file);

    return formData;
  };

  const onUpload = async (file: File): Promise<void> => {
    const src = await uploadImage(constructFormData(file));
    await onSelect(src);
    setOpen(false);
  };
  const onSelect = async (imageUrl: string): Promise<void> => {
    if ('then' in selectImage) {
      await selectImage(imageUrl);
    } else {
      selectImage(imageUrl);
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Select or Upload</DialogTitle>
          <DialogDescription>
            Select an already uploaded image or upload a new one from your
            computer.
          </DialogDescription>
        </DialogHeader>
        <div className=''>
          <div className="grid grid-cols-6 gap-2 max-h-[calc(3*(theme('spacing.14')+theme('spacing.2')))] overflow-auto">
            {uploadedImages.map((image) => (
              <Card
                key={image}
                className='h-14 w-14 overflow-hidden hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer'
                onClick={() => onSelect(image)}
              >
                <img className='object-cover h-full w-full' src={image} />
              </Card>
            ))}
          </div>
          <div className='flex items-center justify-between my-4'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <span className='mx-4 text-gray-500'>or</span>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>
          <UploadFile onChange={onUpload} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
