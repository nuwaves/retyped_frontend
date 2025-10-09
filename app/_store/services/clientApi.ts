import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import { signOut } from 'next-auth/react';
import { clearAuthToken } from '@/app/_store/features/auth/authSlice';
/**
 * Custom base query that preserves trailing slashes for Django URLs.
 * fetchBaseQuery normalizes URLs and removes trailing slashes, but Django requires them.
 * We detect trailing slashes and signal the proxy via X-Trailing-Slash header.
 *
 * TODO: Consider setting APPEND_SLASH=False in Django to avoid this workaround.
 */

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async(args: any, api: any, extraOptions: any) => {
  const hasTrailingSlash = typeof args === 'string'
    ? args.endsWith('/')
    : args.url?.endsWith('/');
  const state = api.getState();
  const accessToken = state.auth.backendToken?.access_token;
  let result = await fetchBaseQuery({
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
  if (result.error && result.error.status === 401) {
    // If we get a 401 http from backend we log out the user and clear the session
    // ToDO: some feedback to the user
    await signOut({ redirect: false });
    api.dispatch(clearAuthToken());
  }
  return result;
};

export const clientApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Episode', 'Podcast', 'User', 'Bookmark', 'Follow'],
  endpoints: () => ({}),
});