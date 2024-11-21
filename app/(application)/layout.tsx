import { ApplicationLayout } from '../application-layout';
import { getCartItems } from '@/server/repository/cart';
import { auth } from '@clerk/nextjs/server';
import { getNumberOfCartItems } from '@/server/service/cart';
import { getPopularCollections } from '@/server/service/collection';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();
  const cartItems = user.userId
    ? await getNumberOfCartItems({ userId: user.userId })
    : 0;
  const collections = await getPopularCollections();

  return (
    <ApplicationLayout numCartItems={cartItems} collections={collections}>
      {children}
    </ApplicationLayout>
  );
}
