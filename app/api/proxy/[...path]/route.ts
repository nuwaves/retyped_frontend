import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.DJANGO_BACKEND || 'http://django-app-alb-2075286004.us-east-1.elb.amazonaws.com';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  let pathString = path.join('/');
  if (!pathString.endsWith('/')) {
    pathString += '/';
  }
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BACKEND_URL}/api/v1/${pathString}${searchParams ? `?${searchParams}` : ''}`;

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
        { error: `Backend error: ${response.status}`, details: text.substring(0, 200) },
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