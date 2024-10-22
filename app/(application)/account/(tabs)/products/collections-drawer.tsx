'use client';
import {
  selectProducts,
  updateCollectionItem,
  uploadImage,
} from '@/app/(application)/actions';
import { Button } from '@/components/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/drawer';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Collection } from '@/types/collection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UploadImageDialog } from './upload-image';
import { useReload } from '@/hooks/reload';
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
import { Card } from '@/components/card';
import { Product } from '@/types/product';
import { CheckIcon } from '@heroicons/react/24/outline';

interface EditCollectionDrawerProps {
  uploadedImages: string[];
  collection: Collection;
  products: Product[];
  updateCollection: typeof updateCollectionItem;
  uploadImage: typeof uploadImage;
  selectProducts: typeof selectProducts;
}
export const EditCollectionDrawer: React.FunctionComponent<
  EditCollectionDrawerProps
> = ({
  collection,
  products,
  selectProducts,
  uploadImage,
  updateCollection,
  uploadedImages,
}) => {
  const [name, setName] = useState(collection.name);
  const [slug, setSlug] = useState(collection.slug);
  const [imageUrl, setImageUrl] = useState(collection.imageSrc);

  const router = useRouter();
  const reload = useReload();

  const onSave = async () => {
    await reload(updateCollection)({
      id: collection.id,
      name,
      slug,
      imageSrc: imageUrl,
    });
  };
  return (
    <Drawer
      direction='right'
      open={true}
      onOpenChange={(open) =>
        router.push(new URL(window.location.href).pathname)
      }
    >
      <DrawerContent className='h-screen top-0 right-0 left-auto !mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Update a Collection</DrawerTitle>
          <DrawerDescription>
            Update the name, image, and products belonging to this collection.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className='flex flex-col gap-4'>
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={setName} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={slug} onChange={setSlug} />
            </div>
            <div>
              <Label>Image</Label>
              <EditImage
                image={imageUrl}
                uploadedImages={uploadedImages}
                onChange={setImageUrl}
                onUpload={uploadImage}
              />
            </div>
            <div>
              <Label>Products</Label>
              <EditProducts
                value={collection.products.map((product) => product.id)}
                products={products}
                onChange={(products) => selectProducts(collection.id, products)}
              />
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          {imageUrl !== collection.imageSrc ||
          name !== collection.name ||
          slug !== collection.slug ? (
            <Button onClick={onSave}>Save</Button>
          ) : null}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface EditImageProps {
  image: string;
  onUpload: (file: FormData) => Promise<string>;
  onChange: (imageUrl: string) => void;
  uploadedImages: string[];
}
const EditImage: React.FunctionComponent<EditImageProps> = ({
  image,
  onUpload,
  onChange,
  uploadedImages,
}) => {
  return (
    <div className='flex gap-4 items-center justify-between'>
      <div className='h-14 w-14'>
        <img className='object-cover h-full w-full' src={image} />
      </div>
      <div className='flex gap-2'>
        <UploadImageDialog
          uploadedImages={uploadedImages}
          uploadImage={onUpload}
          selectImage={onChange}
        >
          Change
        </UploadImageDialog>
      </div>
    </div>
  );
};

interface EditProductsProps {
  products: Product[];
  value: string[];
  onChange: (productIds: string[]) => void;
}
const EditProducts: React.FunctionComponent<EditProductsProps> = ({
  products,
  value,
  onChange,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(value);

  const onSelect = (product: Product) => {
    if (
      selectedProducts.some((selectedProduct) => selectedProduct === product.id)
    ) {
      setSelectedProducts(
        selectedProducts.filter(
          (selectedProduct) => selectedProduct !== product.id
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, product.id]);
    }
  };

  const onSave = () => {
    onChange(selectedProducts);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Products</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Select Products</DialogTitle>
          <DialogDescription>
            Select the products that should be apart of this collection
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-2 max-h-[calc(3*(theme('spacing.14')+theme('spacing.2')))] overflow-auto">
          {products.map((product) => (
            <Card
              key={product.id}
              className='relative overflow-hidden hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer'
              onClick={() => onSelect(product)}
            >
              {selectedProducts.includes(product.id) ? (
                <div className='absolute right-0 top-0'>
                  <CheckIcon className='h-3 w-3' />
                </div>
              ) : null}
              <div className='h-14 w-14'>
                <img
                  className='object-cover h-full w-full'
                  src={product.imageSrc}
                  alt={product.imageAlt}
                />
              </div>
              <span className='text-xs text-nowrap'>{product.name}</span>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
