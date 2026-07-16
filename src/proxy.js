import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const LOGIN_PAGE = '/admin';
const COOKIE_NAME = 'ips_admin_token';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only protect /dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Read cookie using Next.js built-in request.cookies
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = verifyToken(token);

  if (!payload) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Authenticated — pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
