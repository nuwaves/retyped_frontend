'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmarkRegular, faArrowUpFromBracket } from '@/app/_lib/icons';
import Button from '@/app/_components/common/Button';
import { useBookmark } from '@/app/_hooks/useBookmark';

interface EpisodeActionsProps {
  episodeId: string;
  episodeTitle?: string;
  episodeDescription?: string | null;
}

const styles = {
  actions: "flex items-center gap-2",
  shareButtonWrapper: "relative",
  toast: "absolute top-full mt-2 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-50",
  toastArrow: "absolute bottom-full right-3 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"
};

export default function EpisodeActions({ episodeId, episodeTitle, episodeDescription }: EpisodeActionsProps) {
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark('episode', parseInt(episodeId));
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: episodeTitle || 'Check out this episode',
          text: episodeDescription || '',
          url: window.location.href,
        });
      } catch {
        console.log('Share cancelled');
      }
      return;
    }

    if (!navigator.clipboard) {
      showToastMessage('Sharing not supported');
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      showToastMessage('Link copied!');
    } catch {
      showToastMessage('Sharing not supported');
    }
  };
  
  return (
    <div className={styles.actions}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleBookmark}
        disabled={isLoading}
        aria-label={isBookmarked ? "Unsave episode" : "Save episode"}
        className="!p-3 relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isBookmarked ? 'saved' : 'unsaved'}
            className="flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: {
                duration: 0.15,
                ease: "easeIn"
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon
              icon={isBookmarked ? faBookmark : faBookmarkRegular}
              className={`w-5 h-5 transition-colors duration-200 ${isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
            />
          </motion.div>
        </AnimatePresence>
      </Button>
      <div className={styles.shareButtonWrapper}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          aria-label="Share episode"
          className="!p-3"
        >
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="w-5 h-5 text-gray-500" />
        </Button>
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={styles.toast}
            >
              <div className={styles.toastArrow} />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}