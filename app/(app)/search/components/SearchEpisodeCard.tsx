'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@/app/_lib/icons';
import SafeHTML from '@/app/_components/common/SafeHTML';

interface SearchEpisodeCardProps {
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
  card: "flex gap-3 lg:gap-4 bg-white rounded p-4 lg:p-6 hover:shadow-md transition-shadow",
  imageWrapper: "flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 relative rounded overflow-hidden bg-gray-100",
  content: "flex flex-col gap-1 flex-1 min-w-0",
  header: "flex items-center gap-2 text-xs text-gray-500",
  icon: "text-xs",
  showName: "text-[14px] font-normal leading-[22px] tracking-normal text-gray-600 lining-nums proportional-nums",
  showLink: "font-normal hover:text-gray-900 hover:underline transition-colors",
  title: "text-base font-bold line-clamp-1",
  description: "text-[14px] font-normal leading-[22px] tracking-normal text-gray-600 line-clamp-2 lining-nums proportional-nums",
  footer: "flex items-center gap-2 text-xs text-gray-500",
  dot: "w-1 h-1 bg-gray-500 rounded-full"
};

export default function SearchEpisodeCard({
  showName,
  showSlug,
  episodeTitle,
  description,
  duration,
  date,
  href,
  imageUrl
}: SearchEpisodeCardProps) {
  return (
    <div className={styles.card}>
      {showSlug && (
        <Link
          href={`/shows/${showSlug}`}
          className={styles.imageWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={showName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 64px, 80px"
            />
          )}
        </Link>
      )}

      <Link href={href} className={styles.content}>
        <h3 className={styles.title}>{episodeTitle}</h3>
        <p className={styles.showName}>{showName}</p>
        <SafeHTML html={description} className={styles.description} as="div" />
        <div className={styles.footer}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <span>{duration}</span>
          <span className={styles.dot}></span>
          <span>{date}</span>
        </div>
      </Link>
    </div>
  );
}
