import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isApiProxy = pathname.startsWith('/api/v1');
  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/reset-password');
  const isPublicPage =
    pathname === '/' ||
    pathname.startsWith('/test/lee') ||
    pathname.startsWith('/test/kim') ||
    pathname.startsWith('/test/park') ||
    pathname.startsWith('/test/song') ||
    pathname.startsWith('/test/yeom') ||
    pathname.startsWith('/boards')

  const hasToken = !!(accessToken || refreshToken);

  if (isApiProxy) {
    const requestHeaders = new Headers(request.headers);
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!hasToken && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image).*)'],
};
