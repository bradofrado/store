import {
  deleteProductImage,
  selectProductImage,
  selectProducts,
  updateCollectionItem,
  uploadImage,
} from '@/app/(application)/actions';
import { EditCollectionDrawer } from './collections-drawer';
import {
  getCollectionBySlug,
  getCollectionNames,
  updateCollection,
} from '@/server/service/collection';
import { listImages } from '@/server/repository/blob';
import Link from 'next/link';
import { getProducts } from '@/server/service/product';

interface CollectionsEditProps {
  editCollectionId?: string;
}
export const CollectionsEdit: React.FunctionComponent<
  CollectionsEditProps
> = async ({ editCollectionId }) => {
  const collection = editCollectionId
    ? ((await getCollectionBySlug(editCollectionId)) ?? undefined)
    : undefined;
  const collections = await getCollectionNames();
  const uploadedImages = await listImages();
  const products = await getProducts();
  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        {collections.map((category, i) => (
          <Link
            key={category.name}
            href={`?edit-collection=${category.slug}`}
            className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto'
          >
            <span aria-hidden='true' className='absolute inset-0'>
              <img
                alt=''
                src={category.imageSrc}
                className='h-full w-full object-cover object-center'
              />
            </span>
            <span
              aria-hidden='true'
              className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50'
            />
            <span className='relative mt-auto text-center text-xl font-bold text-white'>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      {collection ? (
        <EditCollectionDrawer
          uploadedImages={uploadedImages.blobs.map((blob) => blob.url)}
          collection={collection}
          products={products}
          updateCollection={updateCollectionItem}
          uploadImage={uploadImage}
          selectProducts={selectProducts}
        />
      ) : null}
    </>
  );
};
