'use client';

import { Podcast } from '@/app/_types';
import SearchPodcastCard from '@/app/(app)/search/components/SearchPodcastCard';

interface FollowedPodcastsListProps {
  podcasts: Podcast[];
}

export default function FollowedPodcastsList({ podcasts }: FollowedPodcastsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {podcasts.map((podcast) => (
        <SearchPodcastCard
          key={podcast.id}
          title={podcast.name}
          description={podcast.description}
          imageUrl={podcast.image_url}
          href={`/shows/${podcast.slug}`}
        />
      ))}
    </div>
  );
}
