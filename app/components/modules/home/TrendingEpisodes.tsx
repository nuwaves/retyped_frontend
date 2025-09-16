'use client';

import { useEffect } from 'react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import EpisodeCard from '../../cards/EpisodeCard';
import SectionHeader from '../../common/SectionHeader';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { 
  fetchTrendingEpisodes, 
  selectTrendingEpisodes, 
  selectEpisodesLoading, 
  selectEpisodesError 
} from '@/app/store/features/episodes/episodesSlice';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  loading: "text-center py-8 text-gray-600",
  error: "text-center py-8 text-red-500",
  empty: "text-center py-8 text-gray-500"
};

export default function TrendingEpisodes() {
  const dispatch = useAppDispatch();
  const episodes = useAppSelector(selectTrendingEpisodes);
  const loading = useAppSelector(selectEpisodesLoading);
  const error = useAppSelector(selectEpisodesError);

  useEffect(() => {
    dispatch(fetchTrendingEpisodes('7d'));
  }, [dispatch]);

  const formatDuration = (duration: string | null) => {
    if (!duration) return '';
    // Convert duration string to readable format
    // Assuming duration comes as "HH:MM:SS" or similar
    const parts = duration.split(':');
    if (parts.length >= 2) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    return duration;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader 
          icon={faChartLine} 
          title="Trending Episodes" 
        />
        
        {loading && (
          <div className={styles.loading}>
            Loading trending episodes...
          </div>
        )}

        {error && (
          <div className={styles.error}>
            Failed to load trending episodes.
          </div>
        )}

        {!loading && !error && episodes.length === 0 && (
          <div className={styles.empty}>
            No trending episodes available.
          </div>
        )}

        {!loading && !error && episodes.length > 0 && (
          <div className={styles.grid}>
            {episodes.slice(0, 4).map((episode) => (
              <EpisodeCard
                key={episode.id}
                showName={episode.podcast.name}
                episodeTitle={episode.title}
                description={episode.description}
                duration={formatDuration(episode.release_date)}
                date={formatDate(episode.release_date)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}