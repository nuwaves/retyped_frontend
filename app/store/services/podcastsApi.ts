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
    getPodcastEpisodes: builder.query<
      PaginatedResponse<import('@/app/types').Episode>,
      { slug: string; limit?: number; offset?: number }
    >({
      query: ({ slug, limit = 5, offset = 0 }) => ({
        url: `podcasts/${slug}/episodes`,
        params: { limit, offset },
      }),
      providesTags: (result, error, { slug }) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'Podcast', id: slug },
            ]
          : [{ type: 'Podcast', id: slug }],
    }),
  }),
});

export const {
  useGetTopPodcastsQuery,
  useLazyGetTrendingPodcastsQuery,
  useLazyGetPodcastEpisodesQuery,
} = podcastsApi;