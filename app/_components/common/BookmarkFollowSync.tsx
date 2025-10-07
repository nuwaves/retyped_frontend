'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/app/_store/hooks';
import { useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '@/app/_store/features/auth/authSlice';
import { useGetBookmarksQuery } from '@/app/_store/services/bookmarksApi';
import { useGetFollowsQuery } from '@/app/_store/services/followsApi';
import { setBookmarksMap, clearBookmarks } from '@/app/_store/features/bookmarks/bookmarksSlice';
import { setFollowsMap, clearFollows } from '@/app/_store/features/follows/followsSlice';

/**
 * Syncs user bookmarks and follows from the backend to Redux state
 * This component fetches all bookmarks/follows when user authenticates
 * and populates the local state maps for O(1) lookup
 */
export function BookmarkFollowSync() {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Only fetch if authenticated - skip query if not logged in
  const { data: bookmarksData } = useGetBookmarksQuery(
    { limit: 1000, offset: 0 },
    { skip: !isAuthenticated }
  );

  const { data: followsData } = useGetFollowsQuery(
    { limit: 1000, offset: 0 },
    { skip: !isAuthenticated }
  );

  // Build bookmark map when data arrives
  useEffect(() => {
    if (bookmarksData?.results) {
      const bookmarkMap: Record<string, number> = {};
      bookmarksData.results.forEach((bookmark) => {
        const key = `${bookmark.entity_type}:${bookmark.entity_id}`;
        bookmarkMap[key] = bookmark.id;
      });
      dispatch(setBookmarksMap(bookmarkMap));
    }
  }, [bookmarksData, dispatch]);

  // Build follow map when data arrives
  useEffect(() => {
    if (followsData?.results) {
      const followMap: Record<string, number> = {};
      followsData.results.forEach((follow) => {
        const key = `${follow.entity_type}:${follow.entity_id}`;
        followMap[key] = follow.id;
      });
      dispatch(setFollowsMap(followMap));
    }
  }, [followsData, dispatch]);

  // Clear maps when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearBookmarks());
      dispatch(clearFollows());
    }
  }, [isAuthenticated, dispatch]);

  return null;
}
