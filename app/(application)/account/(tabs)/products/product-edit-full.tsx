'use client';

import {
  deleteProductAction,
  deleteProductImage,
  selectProductImage,
  updateProductAction,
  uploadImage,
} from '@/app/(application)/actions';
import { getProductUrl } from '@/app/utils';
import { Button } from '@/components/button';
import { ConfirmButton } from '@/components/confirm-button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/drawer';
import { Label } from '@/components/label';
import { useReload } from '@/hooks/reload';
import { Image } from '@/types/image';
import { Product } from '@/types/product';
import { useState, useEffect } from 'react';
import { UploadImageDialog } from './upload-image';
import { ProductForm, ProductFormData } from './product-form';

interface ProductEditFullProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  uploadedImages: string[];
  uploadImage: typeof uploadImage;
  selectPhoto: typeof selectProductImage;
  deletePhoto: typeof deleteProductImage;
}

export const ProductEditFull: React.FunctionComponent<ProductEditFullProps> = ({
  open,
  setOpen,
  product,
  uploadImage,
  selectPhoto,
  deletePhoto,
  uploadedImages,
}) => {
  const reload = useReload();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    description: product.description,
    price: product.price ?? 0,
    primaryImageUrl: product.imageSrc,
    variants: product.variants,
    details: product.details,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Reset form when product changes
  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price ?? 0,
      primaryImageUrl: product.imageSrc,
      variants: product.variants,
      details: product.details,
    });
    setHasChanges(false);
  }, [product]);

  // Detect changes
  useEffect(() => {
    const changed =
      formData.name !== product.name ||
      formData.description !== product.description ||
      formData.price !== product.price ||
      formData.primaryImageUrl !== product.imageSrc ||
      JSON.stringify(formData.variants) !== JSON.stringify(product.variants) ||
      JSON.stringify(formData.details) !== JSON.stringify(product.details);

    setHasChanges(changed);
  }, [formData, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reload(updateProductAction)({
        id: product.id,
        ...formData,
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await reload(deleteProductAction)(product.id);
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const secondaryImages = product.images.filter((img) => !img.primary);

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerContent className='h-screen top-0 right-0 left-auto !mt-0 w-[500px] rounded-none overflow-y-auto'>
        <DrawerHeader>
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription>
            Update product details. Changes will sync to Stripe and your
            database.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className='space-y-4'>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            uploadedImages={uploadedImages}
            uploadImage={uploadImage}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            loading={loading}
            submitLabel='Save Changes'
            showCancel={false}
            showSubmit={hasChanges}
          />

          <div className='border-t pt-4 space-y-4'>
            <div>
              <Label>Secondary Images</Label>
              <div className='mt-2 flex flex-col gap-2 mb-4'>
                {secondaryImages.map((image) => (
                  <EditImage
                    key={image.id}
                    image={image}
                    onUpload={uploadImage}
                    onChange={async (imageUrl) => {
                      await reload(selectPhoto)(product.id, image, imageUrl);
                    }}
                    onDelete={() => reload(deletePhoto)(image.id)}
                    uploadedImages={uploadedImages}
                  />
                ))}
              </div>
              <div>
                <UploadImageDialog
                  uploadedImages={uploadedImages}
                  uploadImage={uploadImage}
                  selectImage={(imageUrl) =>
                    reload(selectPhoto)(product.id, null, imageUrl)
                  }
                >
                  Add Secondary Image
                </UploadImageDialog>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <Button variant='outline' asChild>
                <a href={getProductUrl(product.id)}>Go to product</a>
              </Button>

              <ConfirmButton
                variant='destructive'
                onConfirm={handleDelete}
                title='Delete Product'
                description='Are you sure you want to delete this product? This will archive it in Stripe and remove it from your site. This action cannot be reversed.'
              >
                Delete Product
              </ConfirmButton>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface EditImageProps {
  image: Image;
  onUpload: typeof uploadImage;
  onChange: (imageUrl: string) => Promise<void>;
  onDelete: () => void;
  uploadedImages: string[];
}
const EditImage: React.FunctionComponent<EditImageProps> = ({
  image,
  onUpload,
  onChange,
  onDelete,
  uploadedImages,
}) => {
  return (
    <div className='flex gap-4 items-center justify-between'>
      <div className='h-14 w-14'>
        <img className='object-cover h-full w-full' src={image.imageSrc} />
      </div>
      <div className='flex gap-2'>
        <UploadImageDialog
          uploadedImages={uploadedImages}
          uploadImage={onUpload}
          selectImage={onChange}
        >
          Change
        </UploadImageDialog>
        <ConfirmButton
          variant='outline'
          onConfirm={onDelete}
          title='Delete Image'
          description='Are you sure you want to delete this image off the product? This action cannot be reversed.'
        >
          Delete
        </ConfirmButton>
      </div>
    </div>
  );
};
