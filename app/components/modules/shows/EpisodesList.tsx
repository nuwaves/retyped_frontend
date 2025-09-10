import type { Episode } from '@/app/lib/mockData';
import EpisodeListItem from './EpisodeListItem';
import LoadMoreEpisodes from './LoadMoreEpisodes';

interface EpisodesListProps {
  episodes: Episode[];
  totalCount: number;
}

const styles = {
  container: "mt-12",
  header: "text-2xl font-bold mb-6 text-black",
  list: "flex flex-col gap-4"
};

const INITIAL_EPISODES_COUNT = 5;

export default function EpisodesList({ episodes, totalCount }: EpisodesListProps) {
  const initialEpisodes = episodes.slice(0, INITIAL_EPISODES_COUNT);
  const remainingEpisodes = episodes.slice(INITIAL_EPISODES_COUNT);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        All Episodes ({totalCount})
      </h2>
      
      {/* Server-rendered initial episodes */}
      <div className={styles.list}>
        {initialEpisodes.map((episode) => (
          <EpisodeListItem key={episode.id} episode={episode} />
        ))}
      </div>
      
      {/* Client component for loading more */}
      {remainingEpisodes.length > 0 && (
        <LoadMoreEpisodes episodes={remainingEpisodes} />
      )}
    </div>
  );
}