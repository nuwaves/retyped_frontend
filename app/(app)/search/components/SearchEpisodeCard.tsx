'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import SafeHTML from '@/app/_components/common/SafeHTML';

interface SearchEpisodeCardProps {
  showName: string;
  episodeTitle: string;
  description: string | null;
  duration: string;
  date: string;
  href: string;
}

const styles = {
  card: "relative flex flex-col gap-1 bg-white rounded px-6 pt-6 pb-6 hover:shadow-md transition-shadow",
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
  episodeTitle,
  description,
  duration,
  date,
  href
}: SearchEpisodeCardProps) {
  return (
    <div className={styles.card}>
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`Listen to ${episodeTitle}`}
      />

      <h3 className={styles.title}>{episodeTitle}</h3>
      <p className={styles.showName}>{showName}</p>
      <SafeHTML html={description} className={styles.description} as="div" />
      <div className={styles.footer}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <span>{duration}</span>
        <span className={styles.dot}></span>
        <span>{date}</span>
      </div>
    </div>
  );
}
