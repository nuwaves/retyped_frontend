import { clientApi } from './clientApi';
import { SearchResponse } from '@/app/_types/models/search';

export const searchApi = clientApi.injectEndpoints({
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
