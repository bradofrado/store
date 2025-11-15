'use client';
import {
  deleteProductImage,
  selectProductImage,
  uploadImage,
} from '@/app/(application)/actions';
import { Button } from '@/components/button';
import { ProductCard } from '@/components/product-card';
import { useReload } from '@/hooks/reload';
import { Product } from '@/types/product';
import { useState } from 'react';
import { ProductCreate } from './product-create';
import { ProductEditFull } from './product-edit-full';

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
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className='mb-4'>
        <Button type='button' onClick={() => setCreateOpen(true)}>
          New Product
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setOpenProduct(i)}
          />
        ))}
      </div>
      {openProduct > -1 && (
        <ProductEditFull
          uploadedImages={uploadedImages}
          product={products[openProduct]}
          open={true}
          setOpen={(open) => setOpenProduct(open ? 0 : -1)}
          uploadImage={reload(uploadImage)}
          selectPhoto={reload(selectPhoto)}
          deletePhoto={reload(deletePhoto)}
        />
      )}
      <ProductCreate
        open={createOpen}
        setOpen={setCreateOpen}
        uploadedImages={uploadedImages}
        uploadImage={reload(uploadImage)}
      />
    </>
  );
};
