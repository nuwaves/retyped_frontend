import Link from 'next/link';
import Image from 'next/image';
import Pill from '@/app/components/common/Pill';
import Button from '@/app/components/common/Button';

interface ShowCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  href: string;
}

const styles = {
  card: "flex flex-col h-full rounded-md overflow-hidden",
  imageContainer: "relative w-full aspect-square bg-gray-200",
  image: "w-full h-full object-cover",
  contentWrapper: "flex flex-col flex-grow bg-white px-4 pt-4 pb-10 gap-2",
  title: "text-md font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums mb-2",
  description: "text-sm text-gray-600 mb-4 line-clamp-2",
  buttonWrapper: "mt-auto"
};

export default function ShowCard({ title, description, imageUrl, category, href }: ShowCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.image} style={{ backgroundColor: '#e5e7eb' }} />
        )}
      </div>

      <div className={styles.contentWrapper}>
        <div className="mb-2">
          <Pill size="xs" variant="outline">
            {category}
          </Pill>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>{description}</p>

        <div className={styles.buttonWrapper}>
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