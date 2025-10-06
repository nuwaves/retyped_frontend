'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ensureHttps } from '@/app/_utils/imageUrl';
import SafeHTML from '@/app/_components/common/SafeHTML';

interface SearchPodcastCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const styles = {
  card: "flex gap-3 bg-white rounded p-3 hover:shadow-md transition-shadow",
  imageContainer: "relative w-[75px] h-[75px] flex-shrink-0",
  image: "w-full h-full object-cover rounded",
  content: "flex flex-col justify-center gap-2 flex-1 min-w-0",
  title: "text-sm font-bold leading-[115%] tracking-normal line-clamp-1",
  description: "text-xs font-normal leading-4 tracking-normal text-gray-600 line-clamp-2"
};

export default function SearchPodcastCard({
  title,
  description,
  imageUrl,
  href
}: SearchPodcastCardProps) {
  const secureImageUrl = ensureHttps(imageUrl);

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageContainer}>
        {secureImageUrl ? (
          <Image
            src={secureImageUrl}
            alt={title}
            width={75}
            height={75}
            className={styles.image}
          />
        ) : (
          <div className={styles.image} style={{ backgroundColor: '#e5e7eb' }} />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <SafeHTML html={description} className={styles.description} as="div" />
      </div>
    </Link>
  );
}
