import { clientApi } from './clientApi';
import { Bookmark, CreateBookmarkRequest, PaginatedResponse } from '@/app/_types';

export const bookmarksApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/bookmarks/ - List all bookmarks
    getBookmarks: builder.query<PaginatedResponse<Bookmark>, { limit?: number; offset?: number }>({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'bookmarks/',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Bookmark' as const, id })),
              { type: 'Bookmark', id: 'LIST' },
            ]
          : [{ type: 'Bookmark', id: 'LIST' }],
    }),

    // GET /api/v1/bookmarks/{entity_type}/ - List bookmarks by type
    getBookmarksByType: builder.query<
      Bookmark[],
      { entity_type: 'episode' | 'podcast' }
    >({
      query: ({ entity_type }) => ({
        url: `bookmarks/${entity_type}/`,
      }),
      providesTags: (result, error, { entity_type }) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Bookmark' as const, id })),
              { type: 'Bookmark', id: `TYPE_${entity_type.toUpperCase()}` },
            ]
          : [{ type: 'Bookmark', id: `TYPE_${entity_type.toUpperCase()}` }],
    }),

    // POST /api/v1/bookmarks/ - Create bookmark
    createBookmark: builder.mutation<Bookmark, CreateBookmarkRequest>({
      query: (body) => ({
        url: 'bookmarks/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Bookmark', id: 'LIST' },
        { type: 'Bookmark', id: result ? `TYPE_${result.entity_type.toUpperCase()}` : 'LIST' },
      ],
    }),

    // DELETE /api/v1/bookmarks/{id}/ - Delete bookmark
    deleteBookmark: builder.mutation<void, number>({
      query: (id) => ({
        url: `bookmarks/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Bookmark', id },
        { type: 'Bookmark', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useGetBookmarksByTypeQuery,
  useLazyGetBookmarksQuery,
  useLazyGetBookmarksByTypeQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarksApi;
