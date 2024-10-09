import { getCollectionUrl } from '@/app/utils';
import { redirect } from 'next/navigation';

export default function CollectionPage() {
  redirect(getCollectionUrl('all'));
}
