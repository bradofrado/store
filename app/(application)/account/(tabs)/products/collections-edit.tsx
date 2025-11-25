import {
  createCollectionItem,
  deleteCollectionItem,
  selectProducts,
  updateCollectionItem,
  uploadImage,
  reorderCollections,
} from '@/app/(application)/actions';
import { EditCollectionDrawer } from './collections-drawer';
import {
  getCollectionBySlug,
  getCollectionNames,
} from '@/server/service/collection';
import { listImages } from '@/server/repository/blob';
import { getProducts } from '@/server/service/product';
import { CollectionsDrawerContainer } from './collections-drawer-container';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/skeleton';
import { DraggableCollectionsList } from './draggable-collections-list';

interface CollectionsEditProps {
  editCollectionId?: string;
}
export const CollectionsEdit: React.FunctionComponent<CollectionsEditProps> = ({
  editCollectionId,
}) => {
  return (
    <>
      <Suspense fallback={<SkeletonCard />}>
        <CollectionsList />
      </Suspense>
      <CollectionsDrawerContainer open={editCollectionId !== undefined}>
        <Suspense key={editCollectionId} fallback={<SkeletonCard />}>
          <EditCollectionDrawerContent editCollectionId={editCollectionId} />
        </Suspense>
      </CollectionsDrawerContainer>
    </>
  );
};

const CollectionsList: React.FunctionComponent = async () => {
  const collections = await getCollectionNames();
  const uploadedImages = await listImages();
  const uploadedImagesMapped = uploadedImages.blobs.map((blob) => blob.url);

  return (
    <DraggableCollectionsList
      collections={collections}
      uploadedImages={uploadedImagesMapped}
      reorderCollections={reorderCollections}
      createCollection={createCollectionItem}
      uploadImage={uploadImage}
    />
  );
};

const EditCollectionDrawerContent: React.FunctionComponent<
  CollectionsEditProps
> = async ({ editCollectionId }) => {
  const collection = editCollectionId
    ? ((await getCollectionBySlug(editCollectionId)) ?? undefined)
    : undefined;
  const uploadedImages = await listImages();
  const uploadedImagesMapped = uploadedImages.blobs.map((blob) => blob.url);
  const products = await getProducts();
  if (!collection) return null;

  return (
    <EditCollectionDrawer
      uploadedImages={uploadedImagesMapped}
      collection={collection}
      products={products}
      updateCollection={updateCollectionItem}
      uploadImage={uploadImage}
      selectProducts={selectProducts}
      deleteCollection={deleteCollectionItem}
    />
  );
};
