import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.DJANGO_BACKEND;

  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      DJANGO_BACKEND_SET: !!backendUrl,
      DJANGO_BACKEND_VALUE: backendUrl ? `${backendUrl.substring(0, 30)}...` : 'NOT SET',
      NEXTAUTH_URL_SET: !!process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
    },
    backend: {
      url: backendUrl || 'NOT CONFIGURED',
      reachable: false,
      response: null as Record<string, unknown> | null,
      error: null as { message: string; name: string; stack?: string } | null
    },
    endpoints: [] as Array<{
      endpoint: string;
      status: number | string;
      ok: boolean;
      time?: string;
      data?: unknown;
      error?: string;
    }>
  };

  // Test backend connectivity if configured
  if (backendUrl) {
    // Test main backend
    try {
      const testUrl = `${backendUrl}/api/v1/`;
      const response = await fetch(testUrl, {
        method: 'GET',
        cache: 'no-store',
        signal: AbortSignal.timeout(5000), // 5 second timeout
        headers: {
          'Accept': 'application/json',
        }
      });

      debugInfo.backend.reachable = response.ok || response.status < 500;
      debugInfo.backend.response = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch (error) {
      debugInfo.backend.error = {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      };
    }

    // Test specific endpoints - SAME AS HOME PAGE
    const testEndpoints = [
      '/api/v1/podcasts/top-by-views/?timeframe=all&limit=4',
      '/api/v1/episodes/top-by-views/?timeframe=7d&limit=4',
      '/api/v1/episodes/?limit=4'
    ];

    for (const endpoint of testEndpoints) {
      try {
        const url = `${backendUrl}${endpoint}`;
        const startTime = Date.now();
        const response = await fetch(url, {
          cache: 'no-store',
          signal: AbortSignal.timeout(5000),
          headers: {
            'Accept': 'application/json',
          }
        });
        const endTime = Date.now();

        let dataInfo = null;
        let rawData = null;
        if (response.ok) {
          try {
            const data = await response.json();
            dataInfo = {
              isArray: Array.isArray(data),
              count: Array.isArray(data) ? data.length : (data.count || 'N/A'),
              hasResults: data.results ? data.results.length : undefined,
              hasResultsArray: data.results ? Array.isArray(data.results) : false,
              firstItem: data.results ? (data.results[0] ? 'Has first item' : 'Empty results') : 'No results field'
            };
            // Store first item for analysis
            if (endpoint.includes('podcasts')) {
              rawData = data.results ? data.results[0] : null;
            }
          } catch {
            dataInfo = 'Failed to parse JSON';
          }
        }

        debugInfo.endpoints.push({
          endpoint,
          status: response.status,
          ok: response.ok,
          time: `${endTime - startTime}ms`,
          data: dataInfo,
          rawData: rawData
        });
      } catch (error) {
        debugInfo.endpoints.push({
          endpoint,
          status: 'ERROR',
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }

  // Add recommendations based on findings
  const recommendations = [];

  if (!backendUrl) {
    recommendations.push('CRITICAL: DJANGO_BACKEND environment variable is not set');
  }

  if (backendUrl && !debugInfo.backend.reachable) {
    recommendations.push('Backend is not reachable. Check if the URL is correct and the server is running');
  }

  if (!process.env.NEXTAUTH_URL) {
    recommendations.push('NEXTAUTH_URL is not set. Authentication may not work properly');
  }

  if (!process.env.NEXTAUTH_SECRET) {
    recommendations.push('NEXTAUTH_SECRET is not set. Authentication will fail');
  }

  debugInfo.endpoints.forEach(ep => {
    if (!ep.ok && ep.status === 404) {
      recommendations.push(`Endpoint ${ep.endpoint} returned 404. Check if the API path is correct`);
    }
    if (!ep.ok && typeof ep.status === 'number' && ep.status >= 500) {
      recommendations.push(`Endpoint ${ep.endpoint} returned server error. Check Django backend logs`);
    }
  });

  return NextResponse.json({
    ...debugInfo,
    recommendations,
    summary: {
      healthy: backendUrl && debugInfo.backend.reachable && debugInfo.endpoints.every(e => e.ok),
      totalEndpoints: debugInfo.endpoints.length,
      successfulEndpoints: debugInfo.endpoints.filter(e => e.ok).length,
      message: !backendUrl
        ? 'Backend not configured'
        : debugInfo.backend.reachable
          ? 'Backend reachable'
          : 'Backend unreachable'
    }
  });
}