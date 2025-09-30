'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Episode } from '@/app/types';
import { useLazyGetPodcastEpisodesQuery } from '@/app/store/services/podcastsApi';
import EpisodeListItem from './EpisodeListItem';
import Button from '../../common/Button';

interface LoadMoreEpisodesProps {
  initialOffset: number;
  showSlug: string;
  totalCount: number;
}

const EPISODES_PER_PAGE = 20;

export default function LoadMoreEpisodes({ initialOffset, showSlug, totalCount }: LoadMoreEpisodesProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentOffset, setCurrentOffset] = useState(initialOffset);
  const [isExpanding, setIsExpanding] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [lastLoadIndex, setLastLoadIndex] = useState(0);

  const [fetchEpisodes, { isLoading }] = useLazyGetPodcastEpisodesQuery();

  const hasMore = currentOffset < totalCount;

  const handleLoadMore = async () => {
    setIsExpanding(true);
    setButtonHidden(true);
    setLastLoadIndex(episodes.length);

    try {
      // First expand the space
      await new Promise(resolve => setTimeout(resolve, 200));

      // Fetch more episodes using RTK Query
      const result = await fetchEpisodes({
        slug: showSlug,
        limit: EPISODES_PER_PAGE,
        offset: currentOffset,
      }).unwrap();

      // Add new episodes to the list
      setEpisodes(prev => [...prev, ...result.results]);
      setCurrentOffset(prev => prev + result.results.length);

    } catch (error) {
      console.error('Error loading more episodes:', error);
    } finally {
      setButtonHidden(false); // Show button immediately

      // Keep animation state for cards
      const animationTime = EPISODES_PER_PAGE * 60 + 300;
      setTimeout(() => setIsExpanding(false), animationTime);
    }
  };

  return (
    <>
      {/* Dynamically rendered episodes with animation */}
      <AnimatePresence mode="popLayout">
        {episodes.length > 0 && (
          <motion.div
            className="flex flex-col gap-4 mt-4"
          >
            {episodes.map((episode, index) => {
              // Only animate new cards
              const isNewCard = index >= lastLoadIndex && isExpanding;
              const cardDelay = isNewCard ? (index - lastLoadIndex) * 0.08 : 0;

              return (
                <motion.div
                  key={episode.id}
                  initial={isNewCard ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
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

      {/* Load more button */}
      {hasMore && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 1 }}
          animate={{
            opacity: buttonHidden ? 0 : 1
          }}
          transition={{
            duration: 0.2
          }}
        >
          <Button
            variant="outline"
            size="md"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        </motion.div>
      )}
    </>
  );
}