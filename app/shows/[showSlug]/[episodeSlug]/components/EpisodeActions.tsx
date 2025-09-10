'use client';

import { useState } from 'react';
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
        className="!p-2"
      >
        <FontAwesomeIcon icon={isSaved ? faBookmark : faBookmarkRegular} className="w-14 h-14" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        aria-label="Share episode"
        className="!p-2"
      >
        <FontAwesomeIcon icon={faArrowUpFromBracket} className="w-14 h-14" />
      </Button>
    </div>
  );
}