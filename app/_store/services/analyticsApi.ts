import { clientApi } from './clientApi';
import { PaginatedResponse } from '@/app/_types';

// Analytics detail for a single item
export interface AnalyticDetail {
  id: number;
  user: number | null;
  entity_detail: string | Record<string, any>; // Can be JSON string or parsed object
  created_at: string;
  updated_at: string;
}

// Grouped analytics response
export interface Analytic {
  episodes: AnalyticDetail[];
  podcasts: AnalyticDetail[];
}

export const analyticsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/user_analytics/ - Get all analytics grouped
    getUserAnalytics: builder.query<
      PaginatedResponse<Analytic>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'user_analytics/',
        params: { limit, offset },
      }),
      providesTags: ['User'],
    }),

    // GET /api/v1/user_analytics/episodes - Get episode analytics only
    getUserAnalyticsEpisodes: builder.query<
      PaginatedResponse<AnalyticDetail>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'user_analytics/episodes',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result && result.results
          ? [
              ...result.results.map(({ id }) => ({ type: 'Episode' as const, id })),
              { type: 'User', id: 'ANALYTICS_EPISODES' },
            ]
          : [{ type: 'User', id: 'ANALYTICS_EPISODES' }],
    }),

    // GET /api/v1/user_analytics/podcasts - Get podcast analytics only
    getUserAnalyticsPodcasts: builder.query<
      PaginatedResponse<AnalyticDetail>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'user_analytics/podcasts',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result && result.results
          ? [
              ...result.results.map(({ id }) => ({ type: 'Podcast' as const, id })),
              { type: 'User', id: 'ANALYTICS_PODCASTS' },
            ]
          : [{ type: 'User', id: 'ANALYTICS_PODCASTS' }],
    }),
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetUserAnalyticsEpisodesQuery,
  useGetUserAnalyticsPodcastsQuery,
} = analyticsApi;
