import { clientApi } from './clientApi';
import { Follow, CreateFollowRequest, PaginatedResponse } from '@/app/_types';

export const followsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/follows/ - List all follows
    getFollows: builder.query<PaginatedResponse<Follow>, { limit?: number; offset?: number }>({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'follows/',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Follow' as const, id })),
              { type: 'Follow', id: 'LIST' },
            ]
          : [{ type: 'Follow', id: 'LIST' }],
    }),

    // GET /api/v1/follows/{entity_type}/ - List follows by type
    getFollowsByType: builder.query<
      PaginatedResponse<Follow>,
      { entity_type: 'tag' | 'podcast'; limit?: number; offset?: number }
    >({
      query: ({ entity_type, limit = 100, offset = 0 }) => ({
        url: `follows/${entity_type}/`,
        params: { limit, offset },
      }),
      providesTags: (result, error, { entity_type }) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Follow' as const, id })),
              { type: 'Follow', id: `TYPE_${entity_type.toUpperCase()}` },
            ]
          : [{ type: 'Follow', id: `TYPE_${entity_type.toUpperCase()}` }],
    }),

    // POST /api/v1/follows/ - Create follow
    createFollow: builder.mutation<Follow, CreateFollowRequest>({
      query: (body) => ({
        url: 'follows/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Follow', id: 'LIST' },
        { type: 'Follow', id: result ? `TYPE_${result.entity_type.toUpperCase()}` : 'LIST' },
      ],
    }),

    // DELETE /api/v1/follows/{id}/ - Delete follow
    deleteFollow: builder.mutation<void, number>({
      query: (id) => ({
        url: `follows/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Follow', id },
        { type: 'Follow', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetFollowsQuery,
  useGetFollowsByTypeQuery,
  useLazyGetFollowsQuery,
  useLazyGetFollowsByTypeQuery,
  useCreateFollowMutation,
  useDeleteFollowMutation,
} = followsApi;
