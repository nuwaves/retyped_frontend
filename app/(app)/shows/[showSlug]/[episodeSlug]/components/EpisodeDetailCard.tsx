import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeadphones, faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { Episode, Podcast } from '@/app/_types';
import SafeHTML from '@/app/_components/common/SafeHTML';
import EpisodeActions from './EpisodeActions';
import AudioPlayer from './AudioPlayer';
import TopicsList from './TopicsList';
import { formatDate } from '@/app/_utils/formatters';

interface EpisodeDetailCardProps {
  episode: Episode;
  show: Podcast;
}

const styles = {
  container: "bg-white rounded-lg p-6 mb-8",
  header: "flex items-center justify-between mb-4",
  date: "text-sm text-gray-500",
  titleSection: "mb-4",
  title: "text-3xl font-bold mb-3 text-black",
  description: "text-base text-gray-600 leading-relaxed mb-4",
  stats: "flex items-center gap-4 mb-4 text-sm text-gray-500",
  statItem: "flex items-center gap-1.5",
  statIcon: "text-xs",
  audioPlayer: "mt-8"
};

export default function EpisodeDetailCard({ episode }: EpisodeDetailCardProps) {
  const topics = episode.tags?.map(tag => tag.name) || [];
  const listenCount = episode.total_views ? `${episode.total_views}` : '0';
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <time className={styles.date} dateTime={episode.release_date}>
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          {formatDate(episode.release_date, true)}
        </time>
        <EpisodeActions episodeId={episode.id.toString()} />
      </div>
      
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{episode.title}</h1>
        <SafeHTML html={episode.description} className={styles.description} />
      </div>
      
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
      {episode.raw_audio_url != null &&
        <div className={styles.audioPlayer}>
          <AudioPlayer
            src={episode.raw_audio_url}
            autoPlay={false}
            showSkipControls={true}
          />
        </div>
      }
      <TopicsList topics={topics} />
    </div>
  );
}