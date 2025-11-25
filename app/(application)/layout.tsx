import { ApplicationLayout } from '../application-layout';
import { getCartItems } from '@/server/repository/cart';
import { auth } from '@clerk/nextjs/server';
import { getNumberOfCartItems } from '@/server/service/cart';
import {
  getCollectionByName,
  getCollectionBySlug,
} from '@/server/service/collection';
import { getAuth } from '@/utils/auth';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getAuth();
  const cartItems = userId ? await getNumberOfCartItems({ userId: userId }) : 0;

  // Fetch specific collections for navigation
  const forHerNames = ['For Her', 'Pressed Flowers', 'Sea Shell'];
  const forHimNames = ['For Him', 'Black Ceramic', 'Crushed Stones'];

  const forHerCollections = (
    await Promise.all(forHerNames.map((name) => getCollectionByName(name)))
  )
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .sort((a, b) => a.order - b.order);

  const forHimCollections = (
    await Promise.all(forHimNames.map((name) => getCollectionByName(name)))
  )
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .sort((a, b) => a.order - b.order);

  return (
    <ApplicationLayout
      numCartItems={cartItems}
      forHerCollections={forHerCollections}
      forHimCollections={forHimCollections}
    >
      {children}
    </ApplicationLayout>
  );
}
