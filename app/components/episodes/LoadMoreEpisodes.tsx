'use client';

import { useState } from 'react';
import type { Episode } from '@/app/lib/mockData';
import EpisodeCard from './EpisodeCard';
import Button from '@/app/components/common/Button';

interface LoadMoreEpisodesProps {
  episodes: Episode[];
}

const EPISODES_PER_PAGE = 5;

export default function LoadMoreEpisodes({ episodes }: LoadMoreEpisodesProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const visibleEpisodes = episodes.slice(0, displayedCount);
  const hasMore = displayedCount < episodes.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setDisplayedCount(prev => 
      Math.min(prev + EPISODES_PER_PAGE, episodes.length)
    );
    setIsLoading(false);
  };

  return (
    <>
      {/* Dynamically rendered episodes */}
      {visibleEpisodes.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {visibleEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
      
      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            size="md"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </>
  );
}