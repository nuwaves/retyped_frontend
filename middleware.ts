import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  const proto = req.headers.get('x-forwarded-proto');
  if (proto && proto !== 'https') {
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  if (host.startsWith('www.') && !host.includes('localhost')) {
    url.host = host.replace(/^www\./, '');
    url.protocol = 'https'; // ensure https for redirect
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};