import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/common/Button';
import type { Podcast } from '@/app/types';
import { formatCompactNumber } from '@/app/utils/formatters';
import { ensureHttps } from '@/app/utils/imageUrl';

interface ShowCardProps {
  show: Podcast;
}

const styles = {
  container: "bg-white rounded-lg p-6",
  header: "text-sm font-bold leading-6 text-slate-900 mb-4",
  showInfo: "flex gap-4 mb-6",
  showImage: "w-16 h-16 flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500",
  showDetails: "flex flex-col justify-center",
  showTitle: "text-sm font-bold leading-6 text-neutral-500 mb-1",
  showAuthor: "text-xs font-normal leading-4 text-neutral-500",
  showFollowers: "text-[10px] font-normal leading-4 text-neutral-500",
  buttons: "flex flex-col gap-3"
};

export default function ShowCard({ show }: ShowCardProps) {
  const secureImageUrl = ensureHttps(show.image_url);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>From this Show</h3>

      <div className={styles.showInfo}>
        <div className={styles.showImage}>
          {secureImageUrl && (
            <Image
              src={secureImageUrl}
              alt={show.name}
              width={64}
              height={64}
              sizes="64px"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className={styles.showDetails}>
          <h4 className={styles.showTitle}>{show.name}</h4>
          {show.author && <p className={styles.showAuthor}>{show.author}</p>}
          {show.total_views !== undefined && (
            <p className={styles.showFollowers}>{formatCompactNumber(show.total_views)} views</p>
          )}
        </div>
      </div>
      
      <div className={styles.buttons}>
        <Link href={`/shows/${show.slug}`}>
          <Button variant="outline" size="md" fullWidth>
            View Podcast
          </Button>
        </Link>
        <Button variant="outline" size="md" fullWidth>
          Claim Podcast
        </Button>
      </div>
    </div>
  );
}