import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import Pill from '@/app/_components/common/Pill';
import Button from '@/app/_components/common/Button';
import OptimizedImage from '@/app/_components/common/OptimizedImage';
import { ensureHttps } from '@/app/_utils/imageUrl';
import { formatCompactNumber } from '@/app/_utils/formatters';

interface ShowCardProps {
  title: string;
  description: string;
  imageUrl: string;
  categories: Array<{ name: string }>;
  episodeCount: number;
  totalViews: number;
  href: string;
  priority?: boolean;
}

const styles = {
  card: "relative flex flex-row lg:flex-col gap-3 lg:gap-0 bg-white rounded p-4 lg:p-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full",
  imageContainer: "relative flex-shrink-0 w-20 h-20 lg:w-full lg:h-0 lg:pb-[100%] rounded lg:rounded-none bg-gray-200",
  imageWrapper: "lg:absolute lg:inset-0 w-full h-full",
  image: "w-full h-full object-cover",
  contentWrapper: "relative flex flex-col gap-2 lg:gap-3 flex-1 min-w-0 lg:px-4 lg:pt-4 lg:pb-4",
  title: "text-base lg:text-sm font-bold line-clamp-2 lg:leading-[115%] relative z-20",
  description: "text-xs font-normal leading-4 tracking-normal text-gray-600 line-clamp-2 mb-auto lining-nums proportional-nums relative z-20",
  buttonWrapper: "mt-2 lg:mt-auto relative z-20"
};

export default function ShowCard({
  title,
  description,
  imageUrl,
  categories,
  episodeCount,
  totalViews,
  href,
  priority = false
}: ShowCardProps) {
  const secureImageUrl = ensureHttps(imageUrl);

  return (
    <div className={styles.card}>
      <Link
        href={href}
        className="absolute inset-0 lg:hidden z-10"
        aria-label={`View ${title}`}
      />

      <Link href={href} className={`${styles.imageContainer} relative z-20`}>
        <div className={styles.imageWrapper}>
          <OptimizedImage
            src={secureImageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 80px, (max-width: 1280px) 45vw, (max-width: 1536px) 30vw, 25vw"
            className={styles.image}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      </Link>

      <div className={styles.contentWrapper}>
        {categories && categories.length > 0 && (
          <div className="hidden lg:flex flex-wrap gap-1 mb-2 max-h-[20px] overflow-hidden relative z-20">
            {categories.map((category, index) => (
              <Pill key={index} size="xs" variant="filled">
                {category.name}
              </Pill>
            ))}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>{description}</p>

        <div className="flex items-center gap-2 text-xs font-normal text-gray-500 relative z-20">
          <FontAwesomeIcon icon={faMicrophone} className="text-gray-400 text-xs" />
          <span>{episodeCount} ep</span>
          <FontAwesomeIcon icon={faHeadphones} className="text-gray-400 text-xs ml-1" />
          <span>{formatCompactNumber(totalViews)}</span>
        </div>

        <div className={styles.buttonWrapper}>
          <Link href={href} className="hidden lg:block w-full relative z-20">
            <Button variant="primary" size="md" fullWidth>
              Explore Show
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}