'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import EpisodeListItem from '@/app/components/modules/shows/EpisodeListItem';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import InfiniteScrollTrigger from '@/app/components/common/InfiniteScrollTrigger';
import RefreshPrompt from '@/app/components/common/RefreshPrompt';
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll';
import { useScrollRestoration } from '@/app/hooks/useScrollRestoration';
import { useLazyGetNewEpisodesQuery } from '@/app/store/services/episodesApi';
import { saveNewEpisodes, selectNewEpisodes, clearExpiredCache, clearNewEpisodes } from '@/app/store/features/infiniteScroll/infiniteScrollSlice';
import { Episode } from '@/app/types';
import type { RootState } from '@/app/store/store';

interface InfiniteEpisodesListProps {
  initialEpisodes: Episode[];
  totalCount: number;
}

const styles = {
  list: "flex flex-col gap-4",
  noMore: "text-center text-gray-500 py-8"
};

export default function InfiniteEpisodesList({ initialEpisodes, totalCount }: InfiniteEpisodesListProps) {
  const dispatch = useDispatch();
  const cachedData = useSelector((state: RootState) => selectNewEpisodes(state));

  // Use cached data if available and fresh, otherwise use initial
  const [episodes, setEpisodes] = useState<Episode[]>(
    cachedData?.items || initialEpisodes
  );
  const [offset, setOffset] = useState(
    cachedData?.offset || initialEpisodes.length
  );
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [lastLoadIndex, setLastLoadIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [getNewEpisodes, { isLoading, error }] = useLazyGetNewEpisodesQuery();
  const hasMore = episodes.length < totalCount;

  // Clear expired cache on mount
  useEffect(() => {
    dispatch(clearExpiredCache());
    // After initial render, mark as not initial
    setTimeout(() => setIsInitialLoad(false), 500);
  }, [dispatch]);

  // Smart refresh: Check for new episodes if using cached data
  useEffect(() => {
    if (cachedData && cachedData.items.length > 0) {
      // Silently check if there are new episodes
      getNewEpisodes({ limit: 1, offset: 0 })
        .unwrap()
        .then(result => {
          if (result.results[0]?.id !== cachedData.items[0]?.id) {
            // New episodes available
            setShowRefreshPrompt(true);
          }
        })
        .catch(() => {
          // Silent fail, user can still use cached data
        });
    }
  }, [cachedData, getNewEpisodes]);

  // Use scroll restoration hook
  useScrollRestoration({
    pageKey: 'newEpisodes',
    isActive: true,
    saveAction: saveNewEpisodes,
    items: episodes,
    offset,
    cachedScrollPosition: cachedData?.scrollPosition,
  });

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsExpanding(true);
    setLastLoadIndex(episodes.length);

    try {
      const result = await getNewEpisodes({
        limit: 10,
        offset
      }).unwrap();

      const newEpisodes = [...episodes, ...result.results];
      const newOffset = offset + result.results.length;

      setEpisodes(newEpisodes);
      setOffset(newOffset);

      // Save to Redux for cache
      dispatch(saveNewEpisodes({
        items: newEpisodes,
        offset: newOffset,
        scrollPosition: window.scrollY,
      }));

      // Reset animation state after animation completes
      const animationTime = result.results.length * 80 + 300;
      setTimeout(() => setIsExpanding(false), animationTime);
    } catch (err) {
      console.error('Failed to load more episodes:', err);
      setIsExpanding(false);
    }
  }, [offset, isLoading, hasMore, getNewEpisodes, episodes, dispatch]);

  const { ref } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: isLoading
  });

  const handleRefresh = useCallback(() => {
    // Clear cache and reload fresh data
    dispatch(clearNewEpisodes());
    window.location.reload();
  }, [dispatch]);

  return (
    <>
      {showRefreshPrompt && (
        <RefreshPrompt
          message="New episodes available"
          onRefresh={handleRefresh}
        />
      )}
      <AnimatePresence mode="popLayout">
        {episodes.length > 0 && (
          <motion.div className={styles.list}>
            {episodes.map((episode, index) => {
              // Determine if this card should animate
              const isNewCard = index >= lastLoadIndex && isExpanding;
              const shouldAnimate = isInitialLoad || isNewCard;
              const cardDelay = shouldAnimate
                ? isInitialLoad
                  ? index * 0.08
                  : (index - lastLoadIndex) * 0.08
                : 0;

              return (
                <motion.div
                  key={episode.id}
                  initial={shouldAnimate ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: cardDelay,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  layout
                >
                  <EpisodeListItem episode={episode} />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="text-center text-red-500 py-4">
          Failed to load episodes
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {hasMore && !isLoading && (
        <InfiniteScrollTrigger triggerRef={ref} />
      )}

      {!hasMore && episodes.length > 0 && (
        <p className={styles.noMore}>
          No more episodes to load
        </p>
      )}
    </>
  );
}