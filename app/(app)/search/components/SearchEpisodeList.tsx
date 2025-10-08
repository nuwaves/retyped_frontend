'use client';

import { Episode } from '@/app/_types';
import SearchEpisodeCard from './SearchEpisodeCard';
import { formatDate } from '@/app/_utils/formatters';

interface SearchEpisodeListProps {
  episodes: Episode[];
}

export default function SearchEpisodeList({ episodes }: SearchEpisodeListProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {episodes.map((episode) => (
        <SearchEpisodeCard
          key={episode.id}
          showName={episode.podcast?.name || ''}
          episodeTitle={episode.title}
          description={episode.description || episode.summary}
          duration={episode.duration || '--:--'}
          date={formatDate(episode.release_date)}
          href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
        />
      ))}
    </div>
  );
}
