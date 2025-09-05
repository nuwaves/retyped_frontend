'use client';

import { useState } from 'react';
import type { Episode } from '@/app/lib/mockData';
import EpisodeCard from './EpisodeCard';
import LoadMoreButton from './LoadMoreButton';

interface EpisodesListProps {
  episodes: Episode[];
  totalCount: number;
}

const styles = {
  container: "mt-12",
  header: "text-2xl font-bold mb-6 text-black",
  list: "flex flex-col gap-4"
};

const EPISODES_PER_PAGE = 5;

export default function EpisodesList({ episodes, totalCount }: EpisodesListProps) {
  const [displayedEpisodes, setDisplayedEpisodes] = useState(
    episodes.slice(0, EPISODES_PER_PAGE)
  );

  const handleLoadMore = async () => {
    // Simulate loading more episodes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentLength = displayedEpisodes.length;
    const nextEpisodes = episodes.slice(
      currentLength, 
      currentLength + EPISODES_PER_PAGE
    );
    
    setDisplayedEpisodes([...displayedEpisodes, ...nextEpisodes]);
  };

  const hasMore = displayedEpisodes.length < episodes.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        All Episodes ({totalCount})
      </h2>
      
      <div className={styles.list}>
        {displayedEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      
      {hasMore && (
        <LoadMoreButton onLoadMore={handleLoadMore} />
      )}
    </div>
  );
}