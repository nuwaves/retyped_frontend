'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Podcast } from '@/app/_types';
import { ensureHttps } from '@/app/_utils/imageUrl';
import SafeHTML from '@/app/_components/common/SafeHTML';
import OptimizedImage from '@/app/_components/common/OptimizedImage';
import ShowStats from './ShowStats';
import ShowTags from './ShowTags';

interface ShowDetailCardProps {
  show: Podcast;
  children?: React.ReactNode;
}

const styles = {
  container: "bg-white rounded-lg overflow-hidden",
  wrapper: "grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr] gap-3 md:gap-6 p-4 md:p-6",
  imageContainer: "row-span-1 md:row-span-3",
  image: "w-24 h-24 md:w-72 md:h-72 object-cover rounded-lg",
  headerContent: "flex flex-col gap-2 md:gap-4",
  titleWrapper: "flex flex-col gap-1",
  title: "text-xl md:text-[40px] font-bold text-black leading-[150%] tracking-normal lining-nums proportional-nums",
  author: "text-base font-bold text-black leading-6 lining-nums proportional-nums",
  descriptionWrapper: "col-span-2 md:col-span-1 flex flex-col gap-3",
  descriptionContainer: "relative overflow-hidden",
  description: "text-base font-normal leading-6 tracking-normal text-gray-700",
  descriptionFade: "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none",
  viewMoreButton: "text-sm font-normal text-gray-600 hover:text-black transition-colors underline md:hidden self-start min-h-[45px] flex items-center py-2"
};

export default function ShowDetailCard({ show, children }: ShowDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
          <ShowTags tags={show.tags} />

          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{show.name}</h1>
          </div>
        </div>

        <div className={styles.descriptionWrapper}>
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : '3rem',
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className={styles.descriptionContainer}
            >
              <SafeHTML
                html={show.description}
                className={styles.description}
              />

              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${styles.descriptionFade} md:hidden`}
                />
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.viewMoreButton}
            >
              {isExpanded ? 'View less' : 'View more'}
            </motion.button>

          <ShowStats />

          {children}
        </div>
      </div>
    </div>
  );
}