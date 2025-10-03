import { clientApi } from './clientApi';
import { Episode, PaginatedResponse } from '@/app/_types';

export const episodesApi = clientApi.injectEndpoints({
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
    getNewEpisodes: builder.query<
      PaginatedResponse<Episode>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 20, offset = 0 }) => ({
        url: 'episodes/',
        params: { ordering: '-updated_at', limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'Episode', id: 'NEW' },
            ]
          : [{ type: 'Episode', id: 'NEW' }],
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useGetTopEpisodesQuery,
  useLazyGetTrendingEpisodesQuery,
  useLazyGetNewEpisodesQuery,
} = episodesApi;