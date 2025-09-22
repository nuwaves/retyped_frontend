import { baseApi } from './baseApi';
import { Episode } from '@/app/types/podcast.types';

export interface EpisodesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Episode[];
}

export const episodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<EpisodesResponse, { page?: number; limit?: number }>({
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
  }),
});

export const {
  useGetEpisodesQuery,
  useGetTopEpisodesQuery,
} = episodesApi;