import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMicrophone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import type { Show } from '@/app/lib/mockData';
import { formatFollowers } from '@/app/utils/formatters';
import Pill from '@/app/components/common/Pill';

interface ShowDetailCardProps {
  show: Show;
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
  description: "text-gray-700 leading-relaxed line-clamp-4 md:line-clamp-none",
  statsContainer: "flex flex-wrap gap-6 text-sm text-gray-600",
  statItem: "flex items-center gap-2",
  statIcon: "text-gray-400",
  statText: "font-medium"
};

export default function ShowDetailCard({ show, children }: ShowDetailCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            {/* Placeholder for image - will be replaced with actual image */}
          </div>
        </div>
        
        <div className={styles.contentWrapper}>
          {/* Category pill */}
          <div>
            <Pill size="sm" variant="outline">
              {show.category}
            </Pill>
          </div>
          
          {/* Title and author */}
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{show.title}</h1>
            <p className={styles.author}>By {show.author}</p>
          </div>
          
          {/* Description, stats and buttons grouped */}
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>{show.description}</p>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
                <span className={styles.statText}>
                  {formatFollowers(show.followers)} Followers
                </span>
              </div>
              
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faMicrophone} className={styles.statIcon} />
                <span className={styles.statText}>
                  {show.episodeCount} Episodes
                </span>
              </div>
              
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faCalendarAlt} className={styles.statIcon} />
                <span className={styles.statText}>
                  {show.releaseFrequency}
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