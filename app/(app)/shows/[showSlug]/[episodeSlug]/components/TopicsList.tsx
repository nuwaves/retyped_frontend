'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import Pill from '@/app/_components/common/Pill';

interface TopicsListProps {
  topics: string[];
}

const styles = {
  wrapper: "mt-6",
  container: "flex flex-wrap gap-2 relative overflow-hidden",
  topicLink: "no-underline",
  fade: "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none",
  viewMoreButton: "text-sm font-normal text-gray-600 hover:text-black transition-colors underline self-start min-h-[45px] flex items-center py-2 mt-2"
};

export default function TopicsList({ topics }: TopicsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (containerRef.current) {
        const lineHeight = 32;
        const twoLinesHeight = lineHeight * 2;
        const actualHeight = containerRef.current.scrollHeight;

        setShouldShowButton(actualHeight > twoLinesHeight);
      }
    };

    const timer = setTimeout(checkHeight, 100);
    window.addEventListener('resize', checkHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkHeight);
    };
  }, [topics]);

  return (
    <div className={styles.wrapper}>
      <m.div
        ref={containerRef}
        initial={{ height: '64px' }}
        animate={{
          height: isExpanded || !shouldShowButton ? 'auto' : '64px',
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={styles.container}
      >
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/search?topic=${encodeURIComponent(topic)}`}
            className={styles.topicLink}
          >
            <Pill
              variant="filled"
              size="xs"
              radius="full"
              icon={false}
              className="bg-slate-200 text-gray-500"
            >
              {topic}
            </Pill>
          </Link>
        ))}

        {!isExpanded && shouldShowButton && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.fade}
          />
        )}
      </m.div>

      {shouldShowButton && (
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.viewMoreButton}
        >
          {isExpanded ? 'View less' : 'View more'}
        </m.button>
      )}
    </div>
  );
}
