'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  backdrop: "fixed inset-0 top-14 bg-black/20 backdrop-blur-md z-40",
  sidebar: "fixed top-14 right-0 bottom-0 w-[calc(100%-0.75rem)] bg-white z-50 overflow-y-auto",
  content: "flex flex-col gap-6 p-6",
  searchWrapper: "w-full",
  authWrapper: "w-full"
};

const sidebarVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};


export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className={styles.sidebar}
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
