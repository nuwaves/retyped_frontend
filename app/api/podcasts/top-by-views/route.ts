import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || 'all';
    
    const backendUrl = process.env.DJANGO_BACKEND;
    if (!backendUrl) {
      throw new Error('DJANGO_BACKEND environment variable is not set');
    }
    
    const response = await fetch(
      `${backendUrl}/api/v1/podcasts/top-by-views/?timeframe=${timeframe}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching top podcasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top podcasts' },
      { status: 500 }
    );
  }
}