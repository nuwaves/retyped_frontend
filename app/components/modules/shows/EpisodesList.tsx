import type { Episode } from '@/app/types';
import EpisodeListItem from './EpisodeListItem';
import LoadMoreEpisodes from './LoadMoreEpisodes';

interface EpisodesListProps {
  episodes: Episode[];
  totalCount: number;
  showSlug: string;
}

const styles = {
  container: "mt-12",
  header: "text-2xl font-bold mb-6 text-black",
  list: "flex flex-col gap-4"
};

export default function EpisodesList({ episodes, totalCount, showSlug }: EpisodesListProps) {
  const hasMoreEpisodes = totalCount > episodes.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        All Episodes ({totalCount})
      </h2>

      {/* Server-rendered initial episodes */}
      <div className={styles.list}>
        {episodes.map((episode) => (
          <EpisodeListItem key={episode.id} episode={episode} />
        ))}
      </div>

      {/* Client component for loading more */}
      {hasMoreEpisodes && (
        <LoadMoreEpisodes
          initialOffset={episodes.length}
          showSlug={showSlug}
          totalCount={totalCount}
        />
      )}
    </div>
  );
}