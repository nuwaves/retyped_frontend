/**
 * API helper functions for server-side data fetching
 */

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Fetch data from the Django backend with error handling
 */
export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const backendUrl = process.env.DJANGO_BACKEND;

  if (!backendUrl) {
    throw new Error('DJANGO_BACKEND environment variable is not set');
  }

  const url = new URL(endpoint, backendUrl).toString();

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new APIError(
        response.status,
        `API request failed: ${response.statusText}`,
        endpoint
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    // Re-throw APIError as is
    if (error instanceof APIError) {
      throw error;
    }

    // Wrap other errors
    throw new APIError(
      500,
      error instanceof Error ? error.message : 'Unknown error occurred',
      endpoint
    );
  }
}

/**
 * Safe fetch that returns a default value instead of throwing
 */
export async function safeApi<T>(
  endpoint: string,
  defaultValue: T,
  options?: RequestInit
): Promise<T> {
  try {
    const result = await api<T>(endpoint, options);
    // Log successful fetches in development or when debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[safeApi] Success ${endpoint}:`, result);
    }
    return result;
  } catch (error) {
    console.error(`[safeApi] Failed to fetch ${endpoint}:`, error);
    return defaultValue;
  }
}