'use client';
import {
  deleteProductImage,
  uploadNewProductImage,
  selectProductImage,
} from '@/app/(application)/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert-dialog';
import { Button, ButtonProps } from '@/components/button';
import { Card } from '@/components/card';
import { ConfirmButton } from '@/components/confirm-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
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
import { UploadFile } from '@/components/upload-file';
import { useReload } from '@/hooks/reload';
import { Image } from '@/types/image';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { Input } from 'postcss';
import { useState } from 'react';

interface ProductsEditProps {
  products: Product[];
  uploadedImages: string[];
  uploadNewPhoto: typeof uploadNewProductImage;
  selectPhoto: typeof selectProductImage;
  deletePhoto: typeof deleteProductImage;
}
export const ProductsEdit: React.FunctionComponent<ProductsEditProps> = ({
  products,
  uploadedImages,
  uploadNewPhoto,
  selectPhoto,
  deletePhoto,
}) => {
  const router = useRouter();
  const reload = useReload();
  const [openProduct, setOpenProduct] = useState<number>(-1);

  const deleteThing = async (id: string) => {
    await deletePhoto(id);
    router.refresh();
  };
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
          uploadNewPhoto={reload(uploadNewPhoto)}
          selectPhoto={reload(selectPhoto)}
          deletePhoto={deleteThing}
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
  uploadNewPhoto: typeof uploadNewProductImage;
  selectPhoto: typeof selectProductImage;
  deletePhoto: typeof deleteProductImage;
}
const EditProductDrawer: React.FunctionComponent<EditProductDrawerProps> = ({
  open,
  setOpen,
  product,
  uploadNewPhoto,
  selectPhoto,
  deletePhoto,
  uploadedImages,
}) => {
  const constructFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append('image', file);

    return formData;
  };
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
                  onNewImage={(file) =>
                    uploadNewPhoto(product.id, image, constructFormData(file))
                  }
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
            uploadImage={(file) =>
              uploadNewPhoto(product.id, null, constructFormData(file))
            }
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
  onNewImage: (file: File) => Promise<void>;
  onChange: (imageUrl: string) => Promise<void>;
  onDelete: () => void;
  uploadedImages: string[];
}
const EditImage: React.FunctionComponent<EditImageProps> = ({
  image,
  onNewImage,
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
          uploadImage={onNewImage}
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

interface UploadImageDialogProps {
  uploadedImages: string[];
  uploadImage: (file: File) => Promise<void>;
  selectImage: (imageUrl: string) => Promise<void>;
  children: React.ReactNode;
}
const UploadImageDialog: React.FunctionComponent<UploadImageDialogProps> = ({
  uploadedImages,
  uploadImage,
  selectImage,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const onUpload = async (file: File): Promise<void> => {
    await uploadImage(file);
    setOpen(false);
  };
  const onSelect = async (imageUrl: string): Promise<void> => {
    await selectImage(imageUrl);
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
