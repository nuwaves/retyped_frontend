'use client';

import { useCallback } from 'react';
import { useAppSelector } from '@/app/_store/hooks';
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from '@/app/_store/services/bookmarksApi';
import {
  selectIsBookmarked,
  selectBookmarkId,
  addBookmarkToMap,
  removeBookmarkFromMap,
} from '@/app/_store/features/bookmarks/bookmarksSlice';
import { selectIsAuthenticated } from '@/app/_store/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export function useBookmark(entity_type: 'episode' | 'podcast', entity_id: number) {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isBookmarked = useAppSelector((state) =>
    selectIsBookmarked(state, entity_type, entity_id)
  );
  const bookmarkId = useAppSelector((state) =>
    selectBookmarkId(state, entity_type, entity_id)
  );

  const [createBookmark, { isLoading: isCreating }] = useCreateBookmarkMutation();
  const [deleteBookmark, { isLoading: isDeleting }] = useDeleteBookmarkMutation();

  const toggleBookmark = useCallback(async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return;
    }

    try {
      if (isBookmarked && bookmarkId) {
        await deleteBookmark(bookmarkId).unwrap();
        dispatch(removeBookmarkFromMap({ entity_type, entity_id }));
      } else {
        const result = await createBookmark({ entity_type, entity_id }).unwrap();
        dispatch(addBookmarkToMap({ entity_type, entity_id, bookmark_id: result.id }));
      }
    } catch (error) {
      console.error('Bookmark toggle failed:', error);
      // Could add toast notification here
    }
  }, [
    isAuthenticated,
    isBookmarked,
    bookmarkId,
    entity_type,
    entity_id,
    createBookmark,
    deleteBookmark,
    dispatch,
  ]);

  return {
    isBookmarked,
    toggleBookmark,
    isLoading: isCreating || isDeleting,
    isAuthenticated,
  };
}
