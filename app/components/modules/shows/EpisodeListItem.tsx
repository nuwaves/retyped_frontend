import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import type { Episode } from '@/app/types';
import { formatDate } from '@/app/utils/formatters';
import Pill from '../../common/Pill';
import SafeHTML from '../../common/SafeHTML';

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

export default function EpisodeListItem({ episode }: EpisodeCardProps) {
  // Check if episode was published within the last 7 days
  const isNewEpisode = () => {
    const releaseDate = new Date(episode.release_date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - releaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <Link href={`/shows/${episode.podcast?.slug}/${episode.slug}`} className="block">
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{episode.title}</h3>
          {isNewEpisode() && (
            <div className={styles.newBadge}>
              <Pill size="xs" variant="solid">
                NEW
              </Pill>
            </div>
          )}
        </div>

        <SafeHTML html={episode.description} className={styles.description} as="p" />

        <div className={styles.stats}>
          <FontAwesomeIcon icon={faClock} className={styles.statIcon} />
          <span>{episode.duration || '--:--'}</span>
          <span className={styles.statSeparator}>•</span>
          <span>{formatDate(episode.release_date, true)}</span>
        </div>
      </div>
    </Link>
  );
}