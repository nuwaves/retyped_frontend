'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeadphones, faCalendar, faPlay, faPause } from '@/app/_lib/icons';
import type { Episode, Podcast } from '@/app/_types';
import EpisodeActions from './EpisodeActions';
import TopicsList from './TopicsList';
import { formatDate } from '@/app/_utils/formatters';
import { useDispatch, useSelector } from 'react-redux';
import { playEpisode, togglePlay } from '@/app/_store/features/audioPlayer/audioPlayerSlice';
import { RootState } from '@/app/_store/store';
import Button from '@/app/_components/common/Button';
import { useState, useEffect } from 'react';

interface EpisodeDetailCardProps {
  episode: Episode;
  show: Podcast;
}

const styles = {
  container: "bg-white rounded-lg p-6 mb-6",
  header: "flex flex-wrap items-center justify-between gap-3 mb-4",
  date: "text-sm text-gray-500",
  headerActions: "flex flex-wrap items-center gap-2",
  title: "text-3xl font-bold text-black break-words min-w-0 mb-4",
  stats: "flex items-center gap-4 mb-4 text-sm text-gray-500",
  statItem: "flex items-center gap-1.5",
  statIcon: "text-xs",
};

export default function EpisodeDetailCard({ episode }: EpisodeDetailCardProps) {
  const dispatch = useDispatch();
  const { currentEpisode, isPlaying } = useSelector((state: RootState) => state.audioPlayer);
  const [isClient, setIsClient] = useState(false);
  const topics = episode.tags?.map(tag => tag.name) || [];
  const listenCount = episode.total_views ? `${episode.total_views}` : '0';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isCurrentEpisode = isClient && currentEpisode?.id === episode.id;

  const handlePlayClick = () => {
    if (isCurrentEpisode) {
      dispatch(togglePlay());
    } else {
      dispatch(playEpisode(episode));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <time className={styles.date} dateTime={episode.release_date}>
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          {formatDate(episode.release_date, true)}
        </time>
        <div className={styles.headerActions}>
          <EpisodeActions
            episodeId={episode.id.toString()}
            episodeTitle={episode.title}
            episodeDescription={episode.description}
          />
          {episode.raw_audio_url != null && (
            <Button
              variant={isCurrentEpisode && isPlaying ? "outline" : "primary"}
              size="sm"
              onClick={handlePlayClick}
              className="whitespace-nowrap"
              suppressHydrationWarning
            >
              <FontAwesomeIcon icon={isCurrentEpisode && isPlaying ? faPause : faPlay} suppressHydrationWarning />
              <span suppressHydrationWarning>
                {isCurrentEpisode && isPlaying ? 'Pause Episode' : 'Play Episode'}
              </span>
            </Button>
          )}
        </div>
      </div>

      <h1 className={styles.title}>{episode.title}</h1>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <FontAwesomeIcon icon={faClock} className={styles.statIcon} />
          <span>{episode.duration || '--:--'}</span>
        </div>
        <div className={styles.statItem}>
          <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
          <span>{listenCount}</span>
        </div>
      </div>
      <TopicsList topics={topics} />
    </div>
  );
}
