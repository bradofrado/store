import { auth } from '@clerk/nextjs';
import { cookies } from 'next/headers';

export const getAuth = async (): Promise<string | null> => {
  const userId = auth().userId;
  if (!userId) {
    const cookie = await cookies();
    const userGuestId = cookie.get('user_guest_id');
    return userGuestId?.value ?? null;
  }

  return userId;
};
