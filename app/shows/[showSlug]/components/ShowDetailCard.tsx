import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMicrophone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import type { Podcast } from '@/app/types';
import { formatCompactNumber } from '@/app/utils/formatters';
import { ensureHttps } from '@/app/utils/imageUrl';
import Pill from '@/app/components/common/Pill';
import SafeHTML from '@/app/components/common/SafeHTML';

interface ShowDetailCardProps {
  show: Podcast;
  children?: React.ReactNode;
}

const styles = {
  container: "bg-white rounded-lg overflow-hidden",
  wrapper: "flex flex-col md:flex-row gap-0 md:gap-6 md:p-6",
  imageContainer: "flex-shrink-0 w-full md:w-72",
  image: "w-full h-64 md:h-72 object-cover bg-gray-100",
  contentWrapper: "flex-1 flex flex-col gap-6 p-4 md:p-0",
  titleWrapper: "flex flex-col gap-1",
  title: "text-[40px] font-bold text-black leading-[150%] lining-nums proportional-nums",
  author: "text-base font-bold text-black leading-6 lining-nums proportional-nums",
  descriptionWrapper: "flex flex-col gap-4",
  description: "text-base font-normal leading-6 tracking-normal text-gray-700 line-clamp-4 md:line-clamp-none",
  statsContainer: "flex flex-wrap gap-6 text-gray-600",
  statItem: "flex items-center gap-2",
  statIcon: "text-gray-400 text-xs",
  statText: "text-xs font-normal leading-3 tracking-normal align-middle lining-nums proportional-nums"
};

export default function ShowDetailCard({ show, children }: ShowDetailCardProps) {
  const secureImageUrl = ensureHttps(show.image_url);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          {secureImageUrl ? (
            <Image
              src={secureImageUrl}
              alt={show.name}
              width={288}
              height={288}
              className={styles.image}
              sizes="288px"
              priority
            />
          ) : (
            <div className={styles.image} />
          )}
        </div>
        
        <div className={styles.contentWrapper}>
          {/* Category pills */}
          {show.tags && show.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {show.tags.map(tag => (
                <Pill key={tag.id} size="sm" variant="outline">
                  {tag.name}
                </Pill>
              ))}
            </div>
          )}

          {/* Title and author */}
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{show.name}</h1>
            {show.author && <p className={styles.author}>By {show.author}</p>}
          </div>
          
          {/* Description, stats and buttons grouped */}
          <div className={styles.descriptionWrapper}>
            <SafeHTML html={show.description} className={styles.description} />
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
                <span className={styles.statText}>
                  {formatCompactNumber(show.followers || 0)} Followers
                </span>
              </div>
              
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faMicrophone} className={styles.statIcon} />
                <span className={styles.statText}>
                  {show.episodeCount || 0} Episodes
                </span>
              </div>
              
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faCalendarAlt} className={styles.statIcon} />
                <span className={styles.statText}>
                  {show.releaseFrequency || '-'}
                </span>
              </div>
            </div>
            
            {/* Action buttons slot - below stats */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}