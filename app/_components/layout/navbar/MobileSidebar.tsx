'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  backdrop: "fixed inset-0 top-14 bg-black/80 backdrop-blur-2xl z-40",
  sidebar: "fixed top-14 right-0 bottom-0 left-0 bg-white z-50 overflow-y-auto",
  content: "flex flex-col gap-6 p-6",
  searchWrapper: "w-full",
  authWrapper: "w-full"
};

const sidebarVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween' as const,
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  }
};



export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const x = useMotionValue(0);
  const backdropOpacity = useTransform(x, [0, 300], [0.8, 0]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 150; // 150px or about 40% of typical mobile screen width
    if (info.offset.x > threshold) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            style={{
              opacity: backdropOpacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className={styles.sidebar}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.5 }}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className={styles.content}>
              <div className={styles.searchWrapper}>
                <SearchBar />
              </div>
              <div className={styles.authWrapper}>
                <AuthButtons />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
