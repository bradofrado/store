import { authMiddleware } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from './utils/auth';
import { NextResponse } from 'next/server';

export default authMiddleware({
  async afterAuth(auth, req) {
    const res = NextResponse.next();
    const userGuestId = req.cookies.get('user_guest_id');
    if (!auth.userId && !userGuestId) {
      res.cookies.set('user_guest_id', uuidv4());
    }

    return res;
  },
  publicRoutes(req) {
    if (/\/account/.test(req.url)) {
      return false;
    }

    return true;
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
