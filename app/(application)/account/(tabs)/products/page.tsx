import { Button } from '@/components/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer';
import { ProductCard } from '@/components/product-card';
import { UploadFile } from '@/components/upload-file';
import { getProducts } from '@/server/service/product';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { ProductsEdit } from './products-edit';
import {
  changeProductImage,
  deleteProductImage,
  uploadNewProductImage,
} from '@/app/(application)/actions';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

const allowedEmails = ['bradofrado@gmail.com'];

export default async function ProductsTab() {
  const products = await getProducts();
  const authed = auth();

  if (!authed.userId) {
    notFound();
  }

  const user = await clerkClient.users.getUser(authed.userId);
  if (!allowedEmails.includes(user.emailAddresses[0]?.emailAddress)) {
    notFound();
  }

  return (
    <form>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Products
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Update product information here.
          </p>
          <div className='mt-1'>
            <ProductsEdit
              products={products}
              changePhoto={changeProductImage}
              uploadNewPhoto={uploadNewProductImage}
              deletePhoto={deleteProductImage}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
