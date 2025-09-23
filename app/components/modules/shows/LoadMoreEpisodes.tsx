'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Episode } from '@/app/types';
import EpisodeListItem from './EpisodeListItem';
import Button from '../../common/Button';

interface LoadMoreEpisodesProps {
  episodes: Episode[];
}

const EPISODES_PER_PAGE = 5;

export default function LoadMoreEpisodes({ episodes }: LoadMoreEpisodesProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [lastLoadIndex, setLastLoadIndex] = useState(0);

  const visibleEpisodes = episodes.slice(0, displayedCount);
  const hasMore = displayedCount < episodes.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    setIsExpanding(true);
    setButtonHidden(true);
    setLastLoadIndex(displayedCount);
    
    // First expand the space
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Then add new episodes
    const prevCount = displayedCount;
    const newCount = Math.min(prevCount + EPISODES_PER_PAGE, episodes.length);
    setDisplayedCount(newCount);
    
    setIsLoading(false);
    setButtonHidden(false); // Show button immediately
    
    // Keep animation state for cards
    const animationTime = (newCount - prevCount) * 80 + 300;
    setTimeout(() => setIsExpanding(false), animationTime);
  };

  return (
    <>
      {/* Dynamically rendered episodes with animation */}
      <AnimatePresence mode="popLayout">
        {visibleEpisodes.length > 0 && (
          <motion.div 
            className="flex flex-col gap-4 mt-4"
          >
            {visibleEpisodes.map((episode, index) => {
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