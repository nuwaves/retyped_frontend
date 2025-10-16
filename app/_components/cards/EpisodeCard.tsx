import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faClock } from '@/app/_lib/icons';
import SafeHTML from '../common/SafeHTML';

interface EpisodeCardProps {
  showName: string;
  showSlug?: string;
  episodeTitle: string;
  description: string | null;
  duration: string;
  date: string;
  href: string;
  imageUrl?: string;
}

const styles = {
  card: "relative flex flex-col gap-6 bg-white rounded px-6 pt-8 pb-6 lg:pb-15 shadow-[0px_3px_3px_0px_#E2E8F0]",
  cardWithImage: "relative flex flex-col gap-4 bg-white rounded p-4 pb-6 lg:pb-12 shadow-[0px_3px_3px_0px_#E2E8F0]",
  topSection: "flex gap-4",
  imageContainer: "flex-shrink-0 w-[70px] h-[70px] relative rounded overflow-hidden",
  content: "flex flex-col gap-2 flex-1 min-w-0",
  header: "flex items-center gap-2 text-[10px] leading-[10px] text-gray-500",
  icon: "text-[10px]",
  showName: "font-normal lining-nums proportional-nums truncate",
  showLink: "font-normal hover:text-gray-900 hover:underline transition-colors lining-nums proportional-nums truncate",
  title: "text-[14px] leading-[22px] font-bold line-clamp-2 lining-nums proportional-nums",
  description: "text-sm text-gray-600 line-clamp-2",
  footer: "flex items-center gap-2 text-xs text-gray-500",
  dot: "w-1 h-1 bg-gray-500 rounded-full"
};

export default function EpisodeCard({
  showName,
  showSlug,
  episodeTitle,
  description,
  duration,
  date,
  href,
  imageUrl
}: EpisodeCardProps) {
  return (
    <div className={imageUrl ? styles.cardWithImage : styles.card}>
      <Link
        href={`/shows/${showSlug}`}
        className="absolute inset-x-0 top-0 h-14 z-10 peer/show"
        aria-label={`Go to ${showName} show`}
      />
      <Link
        href={href}
        className="absolute inset-x-0 top-14 bottom-0 peer/episode"
        aria-label={`Listen to ${episodeTitle}`}
      />

      {imageUrl ? (
        <>
          <div className={styles.topSection}>
            <div className={styles.imageContainer}>
              <Image
                src={imageUrl}
                alt={showName}
                fill
                sizes="70px"
                className="object-cover"
              />
            </div>

            <div className={styles.content}>
              <div className={styles.header}>
                <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
                <span className={styles.showName}>
                  {showName}
                </span>
              </div>

              <h3 className={styles.title}>{episodeTitle}</h3>
            </div>
          </div>

          <SafeHTML html={description} className={styles.description} as="div" />
          <div className={styles.footer}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <span>{duration}</span>
            <span className={styles.dot}></span>
            <span>{date}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
            <span className={styles.showName}>
              {showName}
            </span>
          </div>

          <h3 className={styles.title}>{episodeTitle}</h3>
          <SafeHTML html={description} className={styles.description} as="div" />
          <div className={styles.footer}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <span>{duration}</span>
            <span className={styles.dot}></span>
            <span>{date}</span>
          </div>
        </>
      )}
    </div>
  );
}