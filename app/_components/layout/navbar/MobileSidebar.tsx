'use client';

import { m, AnimatePresence, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';
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
      ease: [0.25, 0.1, 0.25, 1] as const
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

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < 0) {
      x.set(0);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < 0) {
      return;
    }
    const threshold = 150;
    if (info.offset.x > threshold) {
      onClose();
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
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
          <m.div
            className={styles.sidebar}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={styles.content}>
              <div className={styles.searchWrapper}>
                <SearchBar onSearchComplete={onClose} />
              </div>
              <div className={styles.authWrapper}>
                <AuthButtons onActionComplete={onClose} />
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
