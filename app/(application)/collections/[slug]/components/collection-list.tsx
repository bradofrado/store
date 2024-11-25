import { getCollectionUrl } from '@/app/utils';
import { getPopularCollections } from '@/server/service/collection';

export const CollectionList: React.FunctionComponent = async () => {
  const collections = await getPopularCollections();
  return (
    <>
      <h3 className='sr-only'>Categories</h3>
      <ul
        role='list'
        className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
      >
        {collections.map((collection) => (
          <li key={collection.name}>
            <a href={getCollectionUrl(collection.slug)}>{collection.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
