import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useReload = () => {
  const router = useRouter();
  const reload = useCallback(
    (func: (...params: any[]) => Promise<any>) => {
      return async (...params: any[]) => {
        const ret = await func(...params);
        router.refresh();
        return ret;
      };
    },
    [router]
  );

  return reload;
};
