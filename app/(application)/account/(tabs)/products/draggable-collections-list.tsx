'use client';

import { CollectionName } from '@/types/collection';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import Link from 'next/link';
import { CollectionsCreate } from './collections-create';
import {
  createCollectionItem,
  reorderCollections,
  uploadImage,
} from '@/app/(application)/actions';
import { useRouter } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface DraggableCollectionsListProps {
  collections: CollectionName[];
  uploadedImages: string[];
  reorderCollections: typeof reorderCollections;
  createCollection: typeof createCollectionItem;
  uploadImage: typeof uploadImage;
}

export const DraggableCollectionsList: React.FunctionComponent<
  DraggableCollectionsListProps
> = ({
  collections,
  uploadedImages,
  reorderCollections,
  createCollection,
  uploadImage,
}) => {
  const [items, setItems] = useState(collections);
  const [isReordering, setIsReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update the order in the database
        setIsReordering(true);
        reorderCollections(newItems.map((item) => item.id))
          .then(() => setIsReordering(false))
          .catch((error) => {
            console.error('Failed to reorder collections:', error);
            setIsReordering(false);
          });

        return newItems;
      });
    }
  };

  return (
    <div className='relative'>
      {isReordering && (
        <div className='absolute inset-0 bg-white/50 flex items-center justify-center z-10'>
          <div className='text-sm text-gray-600'>Saving order...</div>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          <div className='flex flex-wrap gap-2'>
            {items.map((collection) => (
              <SortableCollectionCard
                key={collection.id}
                collection={collection}
              />
            ))}
            <CollectionsCreate
              createCollection={createCollection}
              uploadImage={uploadImage}
              uploadedImages={uploadedImages}
            />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface SortableCollectionCardProps {
  collection: CollectionName;
}

const SortableCollectionCard: React.FunctionComponent<
  SortableCollectionCardProps
> = ({ collection }) => {
  const router = useRouter();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: collection.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg'
    >
      {/* Drag Handle */}
      <button
        type='button'
        {...attributes}
        {...listeners}
        className='absolute top-2 right-2 z-[1] p-2 bg-white/90 rounded-lg shadow-md hover:bg-white cursor-grab active:cursor-grabbing'
        aria-label='Drag to reorder'
      >
        <Bars3Icon className='h-5 w-5 text-gray-600' />
      </button>

      <button
        type='button'
        className='relative flex h-full w-full flex-col p-6 hover:opacity-75'
        onClick={() => {
          router.push(`?edit-collection=${collection.slug}`);
        }}
      >
        <span aria-hidden='true' className='absolute inset-0'>
          <img
            alt=''
            src={collection.imageSrc}
            className='h-full w-full object-cover object-center'
          />
        </span>
        <span
          aria-hidden='true'
          className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50'
        />
        <span className='relative mt-auto text-center text-xl font-bold text-white'>
          {collection.name}
        </span>
      </button>
    </div>
  );
};
