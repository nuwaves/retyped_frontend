import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faClock } from '@fortawesome/free-solid-svg-icons';
import SafeHTML from '../common/SafeHTML';

interface EpisodeCardProps {
  showName: string;
  showSlug?: string;
  episodeTitle: string;
  description: string | null;
  duration: string;
  date: string;
  href: string;
}

const styles = {
  card: "relative flex flex-col gap-6 bg-white rounded-lg px-6 pt-8 pb-15 hover:shadow-md transition-shadow",
  header: "flex items-center gap-2 text-xs text-gray-500",
  icon: "text-xs",
  showName: "font-normal",
  showLink: "font-normal hover:text-gray-900 hover:underline transition-colors",
  title: "text-base font-bold line-clamp-1",
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
  href
}: EpisodeCardProps) {
  return (
    <div className={styles.card}>
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

      <div className="peer-hover/show:[&>span:last-child]:text-gray-900 peer-hover/show:[&>span:last-child]:underline flex items-center gap-2 text-xs text-gray-500">
        <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
        <span className="font-normal transition-colors cursor-pointer">
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
    </div>
  );
}