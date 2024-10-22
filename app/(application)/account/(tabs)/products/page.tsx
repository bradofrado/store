import { getProducts } from '@/server/service/product';
import { ProductsEdit } from './products-edit';
import {
  selectProductImage,
  deleteProductImage,
  uploadImage,
} from '@/app/(application)/actions';
import { protectedAdminPage } from '@/utils/protected-admin';
import { listImages } from '@/server/repository/blob';
import { getCollectionNames } from '@/server/service/collection';
import { CollectionsEdit } from './collections-edit';

async function ProductsTab({
  searchParams,
}: {
  searchParams?: { 'edit-collection'?: string };
}) {
  const products = await getProducts();
  const uploadedImages = await listImages();
  return (
    <form>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Collections
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Put products into collections. Update that information here.
          </p>
          <div className='mt-1'>
            <CollectionsEdit
              editCollectionId={searchParams?.['edit-collection']}
            />
          </div>
        </div>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Products
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Update product information here.
          </p>
          <div className='mt-1'>
            <ProductsEdit
              uploadedImages={uploadedImages.blobs.map((blob) => blob.url)}
              products={products}
              selectPhoto={selectProductImage}
              uploadImage={uploadImage}
              deletePhoto={deleteProductImage}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default protectedAdminPage(ProductsTab);
