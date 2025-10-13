'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartRegular } from '@/app/_lib/icons';
import { motion } from 'framer-motion';
import Button from '@/app/_components/common/Button';
import { useFollow } from '@/app/_hooks/useFollow';

interface ShowActionButtonsProps {
  showId: string;
  initialFollowing?: boolean;
}

const styles = {
  container: "flex gap-4 items-center"
};

export default function ShowActionButtons({ showId }: ShowActionButtonsProps) {
  const { isFollowing, toggleFollow, isLoading } = useFollow('podcast', parseInt(showId));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFollowClick = async () => {
    // Trigger animation before API call
    if (!isFollowing) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200);
    }

    // Call the real API
    await toggleFollow();
  };

  const handleClaimClick = () => {
    // In production, this would navigate to claim flow
    console.log(`Claim podcast for show ID: ${showId}`);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleFollowClick}
        disabled={isLoading}
        className={`px-6 py-3 md:py-1 min-h-[45px] md:min-h-0 text-sm font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2 leading-6 ${
          isFollowing
            ? 'bg-gray-200 text-slate-900 hover:bg-gray-300'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
      >
        <motion.div
          animate={isAnimating ? {
            scale: [1, 1.3, 0.9, 1.2, 1, 1, 1],
          } : {}}
          transition={{ 
            duration: 0.8,
            times: [0, 0.2, 0.3, 0.4, 0.5, 0.7, 1],
            ease: "easeInOut" 
          }}
          className="flex items-center"
        >
          <motion.div
            animate={isAnimating ? {
              color: ['#ffffff', '#ef4444', '#ef4444', '#ef4444', '#0f172a']
            } : {
              color: isFollowing ? '#0f172a' : '#ffffff'
            }}
            transition={{ 
              duration: isAnimating ? 1.2 : 0.2,
              times: isAnimating ? [0, 0.25, 0.45, 0.75, 1] : undefined,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon 
              icon={isFollowing ? faHeart : faHeartRegular} 
              className="text-sm"
            />
          </motion.div>
        </motion.div>
        <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
      </button>
      
      <Button
        onClick={handleClaimClick}
        variant="outline"
        size="md"
      >
        Claim Show
      </Button>
    </div>
  );
}