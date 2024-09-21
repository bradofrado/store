import type { Metadata } from 'next';
import { ApplicationLayout } from '../application-layout';
import { getCartItems } from '@/server/repository/cart';
import { auth } from '@clerk/nextjs/server';
import { getNumberOfCartItems } from '@/server/service/cart';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();
  const cartItems = user.userId
    ? await getNumberOfCartItems({ userId: user.userId })
    : 0;

  return (
    <ApplicationLayout numCartItems={cartItems}>{children}</ApplicationLayout>
  );
}