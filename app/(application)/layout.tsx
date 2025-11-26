import { ApplicationLayout } from '../application-layout';
import { getCartItems } from '@/server/repository/cart';
import { auth } from '@clerk/nextjs/server';
import { getNumberOfCartItems } from '@/server/service/cart';
import {
  getCollectionByName,
  getCollectionBySlug,
  getNavbarCollections,
} from '@/server/service/collection';
import { getAuth } from '@/utils/auth';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getAuth();
  const cartItems = userId ? await getNumberOfCartItems({ userId: userId }) : 0;

  const { forHerCollections, forHimCollections } = await getNavbarCollections();

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
