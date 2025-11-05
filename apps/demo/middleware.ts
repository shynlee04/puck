import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple authentication check for demo purposes
// In production, replace with proper authentication (e.g., NextAuth.js, Clerk, Auth0)
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'puck-demo-2024';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an edit route
  const isEditRoute = pathname.endsWith('/edit') ||
                      pathname.includes('/edit/') ||
                      pathname.split('/').some(segment => segment === 'edit');

  if (isEditRoute) {
    // Check for session cookie or demo password
    const session = request.cookies.get('puck-edit-session');
    const passwordParam = request.nextUrl.searchParams.get('password');

    // Allow access if session exists or correct password provided
    if (session?.value === DEMO_PASSWORD || passwordParam === DEMO_PASSWORD) {
      // If password provided in URL, set session cookie
      if (passwordParam === DEMO_PASSWORD && !session) {
        const response = NextResponse.next();
        response.cookies.set('puck-edit-session', DEMO_PASSWORD, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24 hours
        });
        return response;
      }
      return NextResponse.next();
    }

    // Redirect to login page with return URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};