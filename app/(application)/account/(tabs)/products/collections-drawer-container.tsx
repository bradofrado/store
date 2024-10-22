'use client';
import { Drawer, DrawerContent } from '@/components/drawer';
import { useRouter } from 'next/navigation';

interface CollectionsDrawerContainer {
  children: React.ReactNode;
  open: boolean;
}
export const CollectionsDrawerContainer: React.FunctionComponent<
  CollectionsDrawerContainer
> = ({ children, open }) => {
  const router = useRouter();
  return (
    <Drawer
      direction='right'
      open={open}
      onOpenChange={(open) =>
        router.push(new URL(window.location.href).pathname)
      }
    >
      <DrawerContent className='h-screen top-0 right-0 left-auto !mt-0 w-[500px] rounded-none'>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
