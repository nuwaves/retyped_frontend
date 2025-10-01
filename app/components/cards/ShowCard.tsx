import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import Pill from '@/app/components/common/Pill';
import Button from '@/app/components/common/Button';
import { ensureHttps } from '@/app/utils/imageUrl';
import { formatCompactNumber } from '@/app/utils/formatters';

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
  card: "flex flex-col h-full rounded-md overflow-hidden",
  imageContainer: "relative w-full aspect-square bg-gray-200",
  image: "w-full h-full object-cover",
  contentWrapper: "flex flex-col flex-grow bg-white px-4 pt-4 pb-10 gap-3",
  title: "text-md font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums",
  description: "text-sm text-gray-600 line-clamp-2 mb-auto",
  buttonWrapper: "mt-auto"
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
      <div className={styles.imageContainer}>
        {secureImageUrl ? (
          <Image
            src={secureImageUrl}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 302px, (max-width: 768px) 302px, (max-width: 1024px) 302px, 302px"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className={styles.image} style={{ backgroundColor: '#e5e7eb' }} />
        )}
      </div>

      <div className={styles.contentWrapper}>
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1 max-h-[24px] overflow-hidden">
            {categories.map((category, index) => (
              <Pill key={index} size="xs" variant="filled">
                {category.name}
              </Pill>
            ))}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>{description}</p>

        <div className={styles.buttonWrapper}>
          <div className="flex items-center gap-2 text-xs font-normal text-gray-500 mb-3">
            <FontAwesomeIcon icon={faMicrophone} className="text-gray-400" />
            <span>{episodeCount}</span>
            <FontAwesomeIcon icon={faHeadphones} className="text-gray-400 ml-2" />
            <span>{formatCompactNumber(totalViews)}</span>
          </div>
          <Link href={href} className="w-full">
            <Button variant="primary" size="md" fullWidth>
              Explore Show
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}