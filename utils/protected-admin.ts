import { clerkClient } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { getAuth } from './auth';

const adminEmails = ['bradofrado@gmail.com', 'venus@venusrings.store'];

export const protectedAdminPage = <T>(
  Component: (props: T) => JSX.Element | void | Promise<JSX.Element | void>
): ((props: T) => JSX.Element | void | Promise<JSX.Element | void>) => {
  return async (props: T) => {
    const userId = await getAuth();

    if (!userId) {
      notFound();
    }

    const user = await (await clerkClient()).users.getUser(userId);
    if (!adminEmails.includes(user.emailAddresses[0]?.emailAddress)) {
      notFound();
    }
    return Component(props);
  };
};
