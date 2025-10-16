'use client';

import { m, AnimatePresence, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRegular, faChartLine, faUserRegular } from '@/app/_lib/icons';
import SearchBar from './SearchBar';
import Button from '@/app/_components/common/Button';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  backdrop: "fixed inset-0 top-14 bg-black/80 backdrop-blur-2xl z-40",
  sidebar: "fixed top-14 right-0 bottom-0 left-0 bg-white z-50 overflow-y-auto flex flex-col",
  content: "flex flex-col gap-6 p-6 flex-1",
  searchWrapper: "w-full",
  userSection: "flex flex-col gap-4 w-full",
  menuLink: "flex items-center gap-3 font-inter font-medium text-sm leading-5 text-slate-900 hover:bg-gray-100 px-4 py-3 rounded transition-colors",
  logoutSection: "p-6 border-t border-gray-200 flex items-center justify-between",
  logoutButton: "font-inter font-medium text-sm text-slate-900 hover:opacity-80 transition-opacity",
  userInfo: "flex items-center gap-2",
  initialsCircle: "w-8 h-8 rounded-full bg-slate-200 text-black flex items-center justify-center font-inter font-medium text-sm select-none",
  email: "font-inter font-normal text-sm leading-6"
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
  const { data: session } = useSession();
  const x = useMotionValue(0);
  const backdropOpacity = useTransform(x, [0, 300], [0.8, 0]);

  const getInitials = () => {
    const firstName = session?.backendToken?.user.first_name || '';
    const lastName = session?.backendToken?.user.last_name || '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    onClose();
  };

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

              {session ? (
                <div className={styles.userSection}>
                  <Link href="/my-library" className={styles.menuLink} onClick={onClose}>
                    <FontAwesomeIcon icon={faClockRegular} className="w-5 h-5" />
                    My Activity
                  </Link>

                  <Link href="/creator-dashboard" className={styles.menuLink} onClick={onClose}>
                    <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
                    Creator Dashboard
                  </Link>
                </div>
              ) : (
                <Link href="/auth" onClick={onClose}>
                  <Button variant="primary" size="sm" fullWidth>
                    <FontAwesomeIcon icon={faUserRegular} className="text-white" />
                    Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>

            {session && (
              <div className={styles.logoutSection}>
                <button onClick={handleSignOut} className={styles.logoutButton}>
                  Log out
                </button>
                <div className={styles.userInfo}>
                  <div className={styles.initialsCircle}>{getInitials()}</div>
                  <span className={styles.email}>{session.backendToken?.user.email}</span>
                </div>
              </div>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
