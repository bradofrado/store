import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Define which routes should be protected (require authentication)
const isProtectedRoute = createRouteMatcher(['/account(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication - only /account routes need auth
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      // Redirect to sign-in for protected routes only
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // For all other routes (public routes), allow access to everyone including crawlers
  const response = NextResponse.next();

  // Set guest ID cookie for unauthenticated users (but allow crawlers to continue)
  const { userId } = await auth();
  if (!userId) {
    const userGuestId = req.cookies.get('user_guest_id');
    if (!userGuestId) {
      response.cookies.set('user_guest_id', uuidv4());
    }
  }

  // Allow all requests to proceed - public routes are accessible to everyone including crawlers
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
