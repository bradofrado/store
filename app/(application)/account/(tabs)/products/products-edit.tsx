'use client';
import {
  deleteProductImage,
  selectProductImage,
  uploadImage,
} from '@/app/(application)/actions';
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
import { ProductCard } from '@/components/product-card';
import { useReload } from '@/hooks/reload';
import { Image } from '@/types/image';
import { Product } from '@/types/product';
import { useState } from 'react';
import { UploadImageDialog } from './upload-image';

interface ProductsEditProps {
  products: Product[];
  uploadedImages: string[];
  uploadImage: typeof uploadImage;
  selectPhoto: typeof selectProductImage;
  deletePhoto: typeof deleteProductImage;
}
export const ProductsEdit: React.FunctionComponent<ProductsEditProps> = ({
  products,
  uploadedImages,
  uploadImage,
  selectPhoto,
  deletePhoto,
}) => {
  const reload = useReload();
  const [openProduct, setOpenProduct] = useState<number>(-1);

  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setOpenProduct(i)}
          />
        ))}
      </div>
      {openProduct > -1 ? (
        <EditProductDrawer
          uploadedImages={uploadedImages}
          product={products[openProduct]}
          open={openProduct !== undefined}
          setOpen={(open) => setOpenProduct(open ? 0 : -1)}
          uploadImage={reload(uploadImage)}
          selectPhoto={reload(selectPhoto)}
          deletePhoto={reload(deletePhoto)}
        />
      ) : null}
    </>
  );
};

interface EditProductDrawerProps {
  uploadedImages: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  uploadImage: typeof uploadImage;
  selectPhoto: typeof selectProductImage;
  deletePhoto: typeof deleteProductImage;
}
const EditProductDrawer: React.FunctionComponent<EditProductDrawerProps> = ({
  open,
  setOpen,
  product,
  uploadImage,
  selectPhoto,
  deletePhoto,
  uploadedImages,
}) => {
  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerContent className='h-screen top-0 right-0 left-auto !mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Update a Product</DrawerTitle>
          <DrawerDescription>
            Primary image is edited through Stripe.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <Label>Images</Label>
          <div className='mt-2 flex flex-col gap-2 mb-4'>
            {product.images.map((image) =>
              !image.primary ? (
                <EditImage
                  key={image.id}
                  image={image}
                  onUpload={uploadImage}
                  onChange={async (imageUrl) => {
                    await selectPhoto(product.id, image, imageUrl);
                  }}
                  onDelete={() => deletePhoto(image.id)}
                  uploadedImages={uploadedImages}
                />
              ) : null
            )}
          </div>
          <UploadImageDialog
            uploadedImages={uploadedImages}
            uploadImage={uploadImage}
            selectImage={(imageUrl) => selectPhoto(product.id, null, imageUrl)}
          >
            Add Image
          </UploadImageDialog>
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
