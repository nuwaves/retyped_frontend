'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/app/components/common/Button';

interface ShowActionButtonsProps {
  showId: string;
  initialFollowing?: boolean;
}

const styles = {
  container: "flex gap-4 items-center"
};

export default function ShowActionButtons({ showId, initialFollowing = false }: ShowActionButtonsProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFollowClick = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!isFollowing) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200);
    }
    
    setIsFollowing(!isFollowing);
    setIsLoading(false);
    
    // In production, this would make an API call
    console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} show with ID: ${showId}`);
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
        className={`px-6 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 leading-6 ${
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
              icon={isFollowing ? faHeartSolid : faHeartRegular} 
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
        Claim Podcast
      </Button>
    </div>
  );
}