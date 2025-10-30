import { auth } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';

export const getAuth = async (): Promise<string | null> => {
  const { userId } = await auth();
  if (!userId) {
    const cookie = await cookies();
    const userGuestId = cookie.get('user_guest_id');
    return userGuestId?.value ?? null;
  }

  return userId;
};
