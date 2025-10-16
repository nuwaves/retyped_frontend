import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHeadphones } from '@/app/_lib/icons';
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
  variant?: 'vertical' | 'horizontal';
}

const getStyles = (variant: 'vertical' | 'horizontal') => {
  const isHorizontal = variant === 'horizontal';

  return {
    card: `relative flex ${isHorizontal ? 'flex-row lg:flex-col' : 'flex-col'} gap-3 lg:gap-0 bg-white rounded ${isHorizontal ? 'p-4 lg:p-0' : 'overflow-hidden'} shadow-[0px_4px_6px_0px_#00000017] ${!isHorizontal ? 'overflow-hidden' : ''} h-full`,
    imageContainer: `relative flex-shrink-0 ${isHorizontal ? 'w-20 h-20' : 'w-full h-0 pb-[100%]'} lg:w-full lg:h-0 lg:pb-[100%] ${isHorizontal ? 'rounded' : ''} lg:rounded-none bg-gray-200`,
    imageWrapper: `${isHorizontal ? '' : 'absolute inset-0'} lg:absolute lg:inset-0 w-full h-full`,
    image: "w-full h-full object-cover",
    contentWrapper: `relative flex flex-col gap-2 lg:gap-3 flex-1 min-w-0 ${isHorizontal ? 'pointer-events-none lg:pointer-events-auto' : 'px-4 pt-4 pb-4'} lg:px-4 lg:pt-4 lg:pb-4`,
    title: "text-base lg:text-sm font-bold line-clamp-2 lg:leading-[115%]",
    description: "text-xs font-normal leading-4 tracking-normal text-gray-600 line-clamp-2 mb-auto lining-nums proportional-nums",
    buttonWrapper: "mt-2 lg:mt-auto",
    overlay: isHorizontal ? "absolute inset-0 lg:hidden" : "hidden"
  };
};

export default function ShowCard({
  title,
  description,
  imageUrl,
  categories,
  episodeCount,
  totalViews,
  href,
  priority = false,
  variant = 'vertical'
}: ShowCardProps) {
  const secureImageUrl = ensureHttps(imageUrl);
  const styles = getStyles(variant);

  return (
    <div className={styles.card}>
      <Link
        href={href}
        className={styles.overlay}
        aria-label={`View ${title}`}
      />

      <Link href={href} className={styles.imageContainer}>
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
          <div className={`${variant === 'vertical' ? 'flex lg:flex' : 'hidden lg:flex'} flex-wrap gap-1 mb-2 max-h-[20px] overflow-hidden`}>
            {categories.map((category, index) => (
              <Pill key={index} size="xs" variant="filled">
                {category.name}
              </Pill>
            ))}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>{description}</p>

        <div className="flex items-center gap-2 text-xs font-normal text-gray-500">
          <FontAwesomeIcon icon={faMicrophone} className="text-gray-400 text-xs" />
          <span>{episodeCount} ep</span>
          <FontAwesomeIcon icon={faHeadphones} className="text-gray-400 text-xs ml-1" />
          <span>{formatCompactNumber(totalViews)}</span>
        </div>

        <div className={styles.buttonWrapper}>
          <Link href={href} className={`${variant === 'vertical' ? 'block' : 'hidden lg:block'} w-full`}>
            <Button variant="primary" size="md" fullWidth>
              Explore Show
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}