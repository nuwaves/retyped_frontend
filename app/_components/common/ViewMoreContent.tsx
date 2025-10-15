'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { m } from 'framer-motion';

interface ViewMoreContentProps {
  children: ReactNode;
  maxHeight?: string;
  className?: string;
  mobileOnly?: boolean;
}

const styles = {
  container: "relative",
  fade: "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none",
  viewMoreButton: "text-sm font-normal text-gray-600 hover:text-black transition-colors underline self-start min-h-[45px] flex items-center py-2 mt-2"
};

export default function ViewMoreContent({
  children,
  maxHeight = '3rem',
  className = '',
  mobileOnly = false
}: ViewMoreContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (containerRef.current) {
        const maxHeightPx = maxHeight.includes('px')
          ? parseFloat(maxHeight)
          : parseFloat(maxHeight) * 16;
        const actualHeight = containerRef.current.scrollHeight;
        setShouldShowButton(actualHeight > maxHeightPx);
      }
    };

    const timer = setTimeout(checkHeight, 100);
    window.addEventListener('resize', checkHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkHeight);
    };
  }, [maxHeight, children]);

  const collapsedHeight = isExpanded || !shouldShowButton ? 'auto' : maxHeight;

  return (
    <>
      <m.div
        ref={containerRef}
        initial={false}
        animate={{
          height: collapsedHeight,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={`${styles.container} ${className}`}
        style={{ overflow: 'hidden' }}
      >
        {children}

        {!isExpanded && shouldShowButton && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${styles.fade} ${mobileOnly ? 'md:hidden' : ''}`}
          />
        )}
      </m.div>

      {shouldShowButton && (
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${styles.viewMoreButton} ${mobileOnly ? 'md:hidden' : ''}`}
        >
          {isExpanded ? 'View less' : 'View more'}
        </m.button>
      )}
    </>
  );
}
