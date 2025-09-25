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

const API_BASE_URL = process.env.DJANGO_BACKEND;

if (!API_BASE_URL && process.env.NODE_ENV === 'production') {
  throw new Error('DJANGO_BACKEND environment variable is not set');
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function api<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);
  const timeout = options?.timeout ?? 30000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url.toString(), {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorMessage = response.status === 404
        ? 'Resource not found'
        : `Request failed: ${response.statusText}`;

      throw new APIError(response.status, errorMessage, endpoint);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError(408, 'Request timeout', endpoint);
      }
      throw new APIError(500, error.message, endpoint);
    }

    throw new APIError(500, 'Unknown error occurred', endpoint);
  }
}

export async function safeApi<T>(
  endpoint: string,
  defaultValue: T,
  options?: FetchOptions
): Promise<T> {
  try {
    return await api<T>(endpoint, options);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API] Failed: ${endpoint}`, error);
    }
    return defaultValue;
  }
}