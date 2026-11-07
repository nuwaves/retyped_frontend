import { clientApi } from './clientApi';
import type { ContentRequestState } from '@/app/_types';

interface ContentRequestArgs {
  slug: string;
  // Part of the cache key so signing in or out refetches the allowance.
  signedIn: boolean;
}

export const contentRequestsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/episodes/{slug}/content-request/
    getContentRequest: builder.query<ContentRequestState, ContentRequestArgs>({
      query: ({ slug }) => ({
        url: `episodes/${slug}/content-request/`,
        params: { _t: Date.now() },
      }),
      providesTags: (result, error, { slug }) => [{ type: 'ContentRequest', id: slug }],
    }),

    // POST /api/v1/episodes/{slug}/content-request/
    requestContent: builder.mutation<ContentRequestState, string>({
      query: (slug) => ({
        url: `episodes/${slug}/content-request/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, slug) => [{ type: 'ContentRequest', id: slug }],
    }),
  }),
});

export const { useGetContentRequestQuery, useRequestContentMutation } = contentRequestsApi;
