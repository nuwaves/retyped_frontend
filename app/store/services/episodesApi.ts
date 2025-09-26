import { baseApi } from './baseApi';
import { Episode, PaginatedResponse } from '@/app/types';

export const episodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<PaginatedResponse<Episode>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: 'episodes/',
        params: {
          page,
          page_size: limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'Episode', id: 'LIST' },
            ]
          : [{ type: 'Episode', id: 'LIST' }],
    }),

    getTopEpisodes: builder.query<Episode[], { timeframe?: string }>({
      query: ({ timeframe = 'all' }) => ({
        url: 'episodes/top-by-views/',
        params: {
          timeframe,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'Episode', id: 'TOP' },
            ]
          : [{ type: 'Episode', id: 'TOP' }],
    }),
    getTrendingEpisodes: builder.query<
      PaginatedResponse<Episode>,
      { timeframe?: string; limit?: number; offset?: number }
    >({
      query: ({ timeframe = '7d', limit = 20, offset = 0 }) => ({
        url: 'episodes/top-by-views/',
        params: { timeframe, limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'Episode', id: 'TRENDING' },
            ]
          : [{ type: 'Episode', id: 'TRENDING' }],
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useGetTopEpisodesQuery,
  useLazyGetTrendingEpisodesQuery,
} = episodesApi;