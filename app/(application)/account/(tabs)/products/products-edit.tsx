'use client';
import {
  changeProductImage,
  deleteProductImage,
  uploadNewProductImage,
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
import { useState } from 'react';

interface ProductsEditProps {
  products: Product[];
  uploadNewPhoto: typeof uploadNewProductImage;
  changePhoto: typeof changeProductImage;
  deletePhoto: typeof deleteProductImage;
}
export const ProductsEdit: React.FunctionComponent<ProductsEditProps> = ({
  products,
  uploadNewPhoto,
  changePhoto,
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
          product={products[openProduct]}
          open={openProduct !== undefined}
          setOpen={(open) => setOpenProduct(open ? 0 : -1)}
          uploadNewPhoto={reload(uploadNewPhoto)}
          changePhoto={reload(changePhoto)}
          deletePhoto={deleteThing}
        />
      ) : null}
    </>
  );
};

interface EditProductDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  uploadNewPhoto: typeof uploadNewProductImage;
  changePhoto: typeof changeProductImage;
  deletePhoto: typeof deleteProductImage;
}
const EditProductDrawer: React.FunctionComponent<EditProductDrawerProps> = ({
  open,
  setOpen,
  product,
  uploadNewPhoto,
  changePhoto,
  deletePhoto,
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
                  onChange={(file) =>
                    changePhoto(product.id, image, constructFormData(file))
                  }
                  onDelete={() => deletePhoto(image.id)}
                />
              ) : null
            )}
          </div>
          <p className='text-sm text-gray-800'>Add a new image</p>
          <UploadFile
            onChange={(file) =>
              uploadNewPhoto(product.id, constructFormData(file))
            }
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface EditImageProps {
  image: Image;
  onChange: (file: File) => void;
  onDelete: () => void;
}
const EditImage: React.FunctionComponent<EditImageProps> = ({
  image,
  onChange,
  onDelete,
}) => {
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    onChange(file);
  };
  return (
    <div className='flex gap-4 items-center justify-between'>
      <div className='h-14 w-14'>
        <img className='object-cover h-full w-full' src={image.imageSrc} />
      </div>
      <div className='flex gap-2'>
        <Button>
          <div>
            <label htmlFor='file-upload'>Change</label>
            <input
              id='file-upload'
              type='file'
              className='sr-only'
              onChange={onSelectImage}
            />
          </div>
        </Button>
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

interface ConfirmButtonProps extends ButtonProps {
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  description: string;
}
const ConfirmButton: React.FunctionComponent<ConfirmButtonProps> = ({
  onCancel,
  onConfirm,
  title,
  description,
  ...props
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
