import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');

  if (host?.startsWith('www.') && !host.includes('localhost')) {
    const newHost = host.replace('www.', '');
    const url = req.nextUrl.clone();
    url.host = newHost;

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
