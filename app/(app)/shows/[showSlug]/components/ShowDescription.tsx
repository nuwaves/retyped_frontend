'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SafeHTML from '@/app/_components/common/SafeHTML';

interface ShowDescriptionProps {
  description: string;
}

const styles = {
  descriptionContainer: "relative overflow-hidden",
  description: "text-base font-normal leading-6 tracking-normal text-gray-700",
  descriptionFade: "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none",
  viewMoreButton: "text-sm font-normal text-gray-600 hover:text-black transition-colors underline md:hidden self-start min-h-[45px] flex items-center py-2"
};

export default function ShowDescription({ description }: ShowDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
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
          html={description}
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
    </>
  );
}
