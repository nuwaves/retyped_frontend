import { NextRequest, NextResponse } from 'next/server';
import { DJANGO_BACKEND } from '@/app/_config/env';

if (!DJANGO_BACKEND) {
  throw new Error('DJANGO_BACKEND environment variable is not configured');
}

const isDevelopment = process.env.NODE_ENV === 'development';

const ALLOWED_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'user-agent',
  'x-trailing-slash',
  'authorization',
];

function getForwardHeaders(request: NextRequest): HeadersInit {
  const headers: HeadersInit = {};

  request.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (ALLOWED_HEADERS.includes(normalizedKey)) {
      headers[key] = value;
    }
  });

  if (!headers['accept']) {
    headers['accept'] = 'application/json';
  }

  return headers;
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const needsTrailingSlash = request.headers.get('X-Trailing-Slash') === 'true';

  const url = new URL(
    `api/v1/${pathString}${needsTrailingSlash ? '/' : ''}`,
    DJANGO_BACKEND
  );
  url.search = request.nextUrl.searchParams.toString();

  if (isDevelopment) {
    console.log(`[Proxy ${request.method}]`, url.toString());
  }

  try {
    const requestInit: RequestInit = {
      method: request.method,
      headers: getForwardHeaders(request),
    };

    // Include body for methods that support it
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      requestInit.body = await request.text();
    }

    const response = await fetch(url.toString(), requestInit);

    if (!response.ok && isDevelopment) {
      const text = await response.text();
      console.error(`Backend ${response.status}:`, text.substring(0, 200));
    }

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}