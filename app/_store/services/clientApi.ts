import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Custom base query that preserves trailing slashes for Django URLs.
 * fetchBaseQuery normalizes URLs and removes trailing slashes, but Django requires them.
 * We detect trailing slashes and signal the proxy via X-Trailing-Slash header.
 *
 * TODO: Consider setting APPEND_SLASH=False in Django to avoid this workaround.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const hasTrailingSlash = typeof args === 'string'
    ? args.endsWith('/')
    : args.url?.endsWith('/');

  // Get access token from Redux state
  const state = api.getState();
  const accessToken = state.auth.backendToken?.access_token;

  return fetchBaseQuery({
    baseUrl: '/api/proxy',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      // Inject bearer token if available
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      if (hasTrailingSlash) {
        headers.set('X-Trailing-Slash', 'true');
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const clientApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Episode', 'Podcast', 'User', 'Bookmark', 'Follow'],
  endpoints: () => ({}),
});