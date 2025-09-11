'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import Button from '@/app/components/common/Button';

interface EpisodeActionsProps {
  episodeId: string;
}

const styles = {
  actions: "flex items-center gap-2"
};

export default function EpisodeActions({ }: EpisodeActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this episode',
          url: window.location.href,
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  return (
    <div className={styles.actions}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsSaved(!isSaved)}
        aria-label={isSaved ? "Unsave episode" : "Save episode"}
        className="!p-3 relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isSaved ? 'saved' : 'unsaved'}
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
              icon={isSaved ? faBookmark : faBookmarkRegular} 
              className={`w-5 h-5 transition-colors duration-200 ${isSaved ? 'text-blue-500' : 'text-gray-500'}`}
            />
          </motion.div>
        </AnimatePresence>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        aria-label="Share episode"
        className="!p-3"
      >
        <FontAwesomeIcon icon={faArrowUpFromBracket} className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
  );
}