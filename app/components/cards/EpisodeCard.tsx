import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faClock } from '@fortawesome/free-solid-svg-icons';

interface EpisodeCardProps {
  showName: string;
  showSlug?: string;
  episodeTitle: string;
  description: string;
  duration: string;
  date: string;
  href?: string;
}

const styles = {
  card: "flex flex-col gap-6 bg-white rounded-lg px-6 pt-8 pb-15 hover:shadow-md transition-shadow",
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
  const content = (
    <>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
        <Link href={`/shows/${showSlug}`} className={styles.showLink}>
          {showName}
        </Link>
      </div>
      
      <h3 className={styles.title}>{episodeTitle}</h3>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.footer}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <span>{duration}</span>
        <span className={styles.dot}></span>
        <span>{date}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <div className={styles.card}>
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div className={styles.card}>
      {content}
    </div>
  );
}