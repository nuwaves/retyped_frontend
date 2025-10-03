'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowCard from '@/app/_components/cards/ShowCard';
import LoadingSpinner from '@/app/_components/common/LoadingSpinner';
import InfiniteScrollTrigger from '@/app/_components/common/InfiniteScrollTrigger';
import RefreshPrompt from '@/app/_components/common/RefreshPrompt';
import { useInfiniteScroll } from '@/app/_hooks/useInfiniteScroll';
import { useScrollRestoration } from '@/app/_hooks/useScrollRestoration';
import { useLazyGetTrendingPodcastsQuery } from '@/app/_store/services/podcastsApi';
import { saveTrendingShows, selectTrendingShows, clearExpiredCache, clearTrendingShows } from '@/app/_store/features/infiniteScroll/infiniteScrollSlice';
import { Podcast } from '@/app/_types';
import type { RootState } from '@/app/_store/store';

interface InfiniteShowsGridProps {
  initialShows: Podcast[];
  totalCount: number;
}

const styles = {
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
  noMore: "text-center text-gray-500 py-8"
};

export default function InfiniteShowsGrid({ initialShows, totalCount }: InfiniteShowsGridProps) {
  const dispatch = useDispatch();
  const cachedData = useSelector((state: RootState) => selectTrendingShows(state));

  // Use cached data if available and fresh, otherwise use initial
  const [shows, setShows] = useState<Podcast[]>(
    cachedData?.items || initialShows
  );
  const [offset, setOffset] = useState(
    cachedData?.offset || initialShows.length
  );
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const [getTrendingPodcasts, { isLoading, error }] = useLazyGetTrendingPodcastsQuery();
  const hasMore = shows.length < totalCount;

  // Clear expired cache on mount
  useEffect(() => {
    dispatch(clearExpiredCache());
  }, [dispatch]);

  // Smart refresh: Check for new shows if using cached data
  useEffect(() => {
    if (cachedData && cachedData.items.length > 0) {
      // Silently check if there are new shows
      getTrendingPodcasts({ timeframe: '7d', limit: 1, offset: 0 })
        .unwrap()
        .then(result => {
          if (result.results[0]?.id !== cachedData.items[0]?.id) {
            // New shows available
            setShowRefreshPrompt(true);
          }
        })
        .catch(() => {
          // Silent fail, user can still use cached data
        });
    }
  }, [cachedData, getTrendingPodcasts]);

  // Use scroll restoration hook
  useScrollRestoration({
    pageKey: 'trendingShows',
    isActive: true,
    saveAction: saveTrendingShows,
    items: shows,
    offset,
    cachedScrollPosition: cachedData?.scrollPosition,
  });

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      const result = await getTrendingPodcasts({
        timeframe: '7d',
        limit: 20,
        offset
      }).unwrap();

      const newShows = [...shows, ...result.results];
      const newOffset = offset + result.results.length;

      setShows(newShows);
      setOffset(newOffset);

      // Save to Redux for cache
      dispatch(saveTrendingShows({
        items: newShows,
        offset: newOffset,
        scrollPosition: window.scrollY,
      }));
    } catch (err) {
      console.error('Failed to load more shows:', err);
    }
  }, [offset, isLoading, hasMore, getTrendingPodcasts, shows, dispatch]);

  const { ref } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: isLoading
  });

  const handleRefresh = useCallback(() => {
    // Clear cache and reload fresh data
    dispatch(clearTrendingShows());
    window.location.reload();
  }, [dispatch]);

  return (
    <>
      {showRefreshPrompt && (
        <RefreshPrompt
          message="New shows available"
          onRefresh={handleRefresh}
        />
      )}
      <div className={styles.grid}>
        {shows.map((show, index) => (
          <ShowCard
            key={show.id}
            title={show.name}
            description={show.description}
            imageUrl={show.image_url}
            categories={show.tags || []}
            episodeCount={show.episode_count}
            totalViews={show.total_views}
            href={`/shows/${show.slug}`}
            priority={index < 8}
          />
        ))}
      </div>

      {error && (
        <div className="text-center text-red-500 py-4">
          Failed to load shows
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {hasMore && !isLoading && (
        <InfiniteScrollTrigger triggerRef={ref} />
      )}

      {!hasMore && shows.length > 0 && (
        <p className={styles.noMore}>
          No more shows to load
        </p>
      )}
    </>
  );
}