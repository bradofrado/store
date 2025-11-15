'use client';

import {
  createProductAction,
  uploadImage,
} from '@/app/(application)/actions';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/drawer';
import { useReload } from '@/hooks/reload';
import { useState } from 'react';
import { ProductForm, ProductFormData } from './product-form';

interface ProductCreateProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  uploadedImages: string[];
  uploadImage: typeof uploadImage;
}

export const ProductCreate: React.FunctionComponent<ProductCreateProps> = ({
  open,
  setOpen,
  uploadedImages,
  uploadImage,
}) => {
  const reload = useReload();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    primaryImageUrl: '',
    variants: {},
    details: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reload(createProductAction)(formData);
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: 0,
        primaryImageUrl: '',
        variants: {},
        details: [],
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerContent className='h-screen top-0 right-0 left-auto !mt-0 w-[500px] rounded-none overflow-y-auto'>
        <DrawerHeader>
          <DrawerTitle>Create New Product</DrawerTitle>
          <DrawerDescription>
            Add a new product to your store. It will be created in Stripe and
            synced to your database.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            uploadedImages={uploadedImages}
            uploadImage={uploadImage}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            loading={loading}
            submitLabel='Create Product'
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
