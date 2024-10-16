import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

const adminEmails = ['bradofrado@gmail.com'];

export const protectedAdminPage = <T>(
  Component: (props: T) => JSX.Element | void | Promise<JSX.Element | void>
): ((props: T) => JSX.Element | void | Promise<JSX.Element | void>) => {
  return async (props: T) => {
    const authed = auth();

    if (!authed.userId) {
      notFound();
    }

    const user = await clerkClient.users.getUser(authed.userId);
    if (!adminEmails.includes(user.emailAddresses[0]?.emailAddress)) {
      notFound();
    }
    return Component(props);
  };
};
