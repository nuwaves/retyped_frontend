import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import type { Episode } from '@/app/lib/mockData';
import Pill from '@/app/components/common/Pill';

interface EpisodeCardProps {
  episode: Episode;
}

const styles = {
  container: "flex flex-col gap-2 p-6 bg-white rounded-lg hover:shadow-md transition-shadow",
  header: "flex items-center gap-2",
  title: "text-lg font-bold text-black leading-6",
  newBadge: "flex-shrink-0",
  description: "text-base font-normal leading-6 text-gray-600 line-clamp-2",
  stats: "flex items-center gap-1 text-xs font-normal text-gray-500 mt-2",
  statIcon: "text-gray-400",
  statSeparator: "mx-2 text-gray-400"
};

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{episode.title}</h3>
        {episode.isNew && (
          <div className={styles.newBadge}>
            <Pill size="xs" variant="solid">
              NEW
            </Pill>
          </div>
        )}
      </div>
      
      <p className={styles.description}>{episode.description}</p>
      
      <div className={styles.stats}>
        <FontAwesomeIcon icon={faClock} className={styles.statIcon} />
        <span>{episode.duration}</span>
        <span className={styles.statSeparator}>•</span>
        <span>{episode.publishDate}</span>
      </div>
    </div>
  );
}