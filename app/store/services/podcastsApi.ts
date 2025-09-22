import { baseApi } from './baseApi';
import { Podcast } from '@/app/types/podcast.types';

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
  }),
});

export const {
  useGetTopPodcastsQuery,
} = podcastsApi;