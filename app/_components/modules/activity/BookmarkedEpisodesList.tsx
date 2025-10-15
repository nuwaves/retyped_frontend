'use client';

import { Episode } from '@/app/_types';
import SearchEpisodeCard from '@/app/(app)/search/components/SearchEpisodeCard';
import { formatDate } from '@/app/_utils/formatters';

interface BookmarkedEpisodesListProps {
  episodes: Episode[];
}

export default function BookmarkedEpisodesList({ episodes }: BookmarkedEpisodesListProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {episodes.map((episode) => (
        <SearchEpisodeCard
          key={episode.id}
          showName={episode.podcast?.name || 'Unknown Show'}
          showSlug={episode.podcast?.slug}
          episodeTitle={episode.title}
          description={episode.description || episode.summary}
          duration={episode.duration || '--:--'}
          date={formatDate(episode.release_date)}
          href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
          imageUrl={episode.podcast?.image_url}
        />
      ))}
    </div>
  );
}
