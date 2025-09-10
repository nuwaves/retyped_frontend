import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeadphones, faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { Episode, Show } from '@/app/lib/mockData';
import Pill from '@/app/components/common/Pill';
import EpisodeActions from './EpisodeActions';

interface EpisodeDetailCardProps {
  episode: Episode;
  show: Show;
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
  topics: "flex flex-wrap gap-2",
  topicLink: "no-underline"
};

export default function EpisodeDetailCard({ episode }: EpisodeDetailCardProps) {
  const topics = episode.topics || ['Cold Case', 'DNA Evidence', 'Justice Delayed', 'Disappearance'];
  const listenCount = episode.listenCount || '1.8M';
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <time className={styles.date} dateTime={episode.publishDate}>
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          {episode.publishDate}
        </time>
        <EpisodeActions episodeId={episode.id} />
      </div>
      
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{episode.title}</h1>
        <p className={styles.description}>{episode.description}</p>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <FontAwesomeIcon icon={faClock} className={styles.statIcon} />
          <span>{episode.duration}</span>
        </div>
        <div className={styles.statItem}>
          <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
          <span>{listenCount}</span>
        </div>
      </div>
      
      <div className={styles.topics}>
        {topics.map((topic, index) => (
          <Link 
            key={index} 
            href={`/search?topic=${encodeURIComponent(topic)}`}
            className={styles.topicLink}
          >
            <Pill 
              variant="filled" 
              size="xs" 
              radius="full" 
              icon={false}
              className="bg-slate-200 text-gray-500"
            >
              {topic}
            </Pill>
          </Link>
        ))}
      </div>
    </div>
  );
}