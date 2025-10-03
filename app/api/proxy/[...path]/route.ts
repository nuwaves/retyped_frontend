import { NextRequest, NextResponse } from 'next/server';
import { DJANGO_BACKEND } from '@/app/config/env';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${DJANGO_BACKEND}/api/v1/${pathString}/${searchParams ? `?${searchParams}` : ''}`;

  console.error('[Proxy GET] Path:', path);
  console.error('[Proxy GET] Final URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Backend returned ${response.status} for ${url}:`, text.substring(0, 200));
      return NextResponse.json(
        {
          error: `Backend error: ${response.status}`,
          details: text.substring(0, 200),
          debug: {
            url,
            path,
            backendUrl: DJANGO_BACKEND
          }
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}