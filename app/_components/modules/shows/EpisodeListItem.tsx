'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRegular } from '@/app/_lib/icons';
import type { Episode } from '@/app/_types';
import { formatDate } from '@/app/_utils/formatters';
import Pill from '../../common/Pill';
import SafeHTML from '../../common/SafeHTML';

interface EpisodeCardProps {
  episode: Episode;
}

const styles = {
  container: "relative flex gap-3 lg:gap-4 p-4 lg:p-6 bg-white rounded-lg hover:shadow-md transition-shadow",
  imageWrapper: "flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 relative rounded overflow-hidden bg-gray-100 z-20",
  content: "flex flex-col gap-2 flex-1 min-w-0 relative z-10",
  header: "flex items-center gap-2",
  title: "text-lg font-bold text-black leading-6",
  newBadge: "flex-shrink-0",
  description: "text-base font-normal leading-6 text-gray-600 line-clamp-2",
  stats: "flex items-center gap-1 text-xs font-normal text-gray-500 mt-2",
  statIcon: "text-gray-400",
  statSeparator: "mx-2 text-gray-400",
  overlay: "absolute inset-0 z-10"
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
    <div className={styles.container}>
      <Link
        href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
        className={styles.overlay}
        aria-label={`View episode: ${episode.title}`}
      />

      <Link
        href={`/shows/${episode.podcast?.slug}`}
        className={styles.imageWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        {episode.podcast?.image_url && (
          <Image
            src={episode.podcast.image_url}
            alt={episode.podcast.name || 'Podcast'}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 64px, 80px"
          />
        )}
      </Link>

      <div className={styles.content}>
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
          <FontAwesomeIcon icon={faClockRegular} className={styles.statIcon} />
          <span>{episode.duration || '--:--'}</span>
          <span className={styles.statSeparator}>•</span>
          <span>{formatDate(episode.release_date, true)}</span>
        </div>
      </div>
    </div>
  );
}