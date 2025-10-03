import { baseApi } from './baseApi';
import { SearchResponse } from '@/app/types/models/search';

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResponse, { q: string }>({
      query: ({ q }) => ({
        url: 'search/',
        params: { q },
      }),
      providesTags: (result, error, { q }) => [
        { type: 'Episode', id: `SEARCH_${q}` },
        { type: 'Podcast', id: `SEARCH_${q}` },
      ],
    }),
  }),
});

export const {
  useSearchQuery,
  useLazySearchQuery,
} = searchApi;
