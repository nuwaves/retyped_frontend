import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import type { Podcast } from '@/app/_types';
import { ensureHttps } from '@/app/_utils/imageUrl';
import Pill from '@/app/_components/common/Pill';
import SafeHTML from '@/app/_components/common/SafeHTML';
import OptimizedImage from '@/app/_components/common/OptimizedImage';

interface ShowDetailCardProps {
  show: Podcast;
  children?: React.ReactNode;
}

const styles = {
  container: "bg-white rounded-lg overflow-hidden",
  wrapper: "flex flex-wrap md:flex-nowrap gap-3 md:gap-6 p-4 md:p-6",
  imageContainer: "order-1 flex-shrink-0",
  image: "w-24 h-24 md:w-72 md:h-72 object-cover rounded-lg",
  headerContent: "order-2 flex-1 md:hidden flex flex-col gap-2 min-w-0",
  contentColumn: "order-3 w-full md:order-2 md:w-auto md:flex-1 flex flex-col gap-4 md:gap-6",
  titleWrapper: "flex flex-col gap-1",
  title: "text-xl md:text-[40px] font-bold text-black leading-[150%] tracking-normal lining-nums proportional-nums",
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
        <OptimizedImage
          src={secureImageUrl}
          alt={show.name}
          width={288}
          height={288}
          sizes="(max-width: 768px) 96px, 288px"
          className={styles.image}
          containerClassName={styles.imageContainer}
          priority
        />

        <div className={styles.headerContent}>
          {show.tags && show.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {show.tags.map(tag => (
                <Pill key={tag.id} size="sm" variant="filled">
                  {tag.name}
                </Pill>
              ))}
            </div>
          )}

          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{show.name}</h1>
          </div>
        </div>

        <div className={styles.contentColumn}>
          {show.tags && show.tags.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-1">
              {show.tags.map(tag => (
                <Pill key={tag.id} size="sm" variant="filled">
                  {tag.name}
                </Pill>
              ))}
            </div>
          )}

          <div className={`hidden md:block ${styles.titleWrapper}`}>
            <h1 className={styles.title}>{show.name}</h1>
          </div>

          <div className={styles.descriptionWrapper}>
            <SafeHTML html={show.description} className={styles.description} />

            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
                <span className={styles.statText}>
                  - Views
                </span>
              </div>

              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faMicrophone} className={styles.statIcon} />
                <span className={styles.statText}>
                  - Episodes
                </span>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}