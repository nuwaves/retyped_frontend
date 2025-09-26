import { baseApi } from './baseApi';
import { Podcast, PaginatedResponse } from '@/app/types';

export const podcastsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopPodcasts: builder.query<Podcast[], { timeframe?: string }>({
      query: ({ timeframe = 'all' }) => ({
        url: 'podcasts/top-by-views/',
        params: {
          timeframe,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Podcast' as const, id })),
              { type: 'Podcast', id: 'TOP' },
            ]
          : [{ type: 'Podcast', id: 'TOP' }],
    }),
    getTrendingPodcasts: builder.query<
      PaginatedResponse<Podcast>,
      { timeframe?: string; limit?: number; offset?: number }
    >({
      query: ({ timeframe = 'all', limit = 20, offset = 0 }) => ({
        url: 'podcasts/top-by-views/',
        params: { timeframe, limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Podcast' as const, id })),
              { type: 'Podcast', id: 'TRENDING' },
            ]
          : [{ type: 'Podcast', id: 'TRENDING' }],
    }),
  }),
});

export const {
  useGetTopPodcastsQuery,
  useLazyGetTrendingPodcastsQuery,
} = podcastsApi;