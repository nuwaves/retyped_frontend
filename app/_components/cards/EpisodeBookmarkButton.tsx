'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmarkRegular } from '@/app/_lib/icons';
import { useBookmark } from '@/app/_hooks/useBookmark';

interface EpisodeBookmarkButtonProps {
  episodeId: number;
  className?: string;
}

// The only interactive part of EpisodeCard. Keeping it separate lets the card
// itself render on the server, so the HTML sanitizer stays out of the browser.
export default function EpisodeBookmarkButton({ episodeId, className }: EpisodeBookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark('episode', episodeId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={className}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <FontAwesomeIcon
        icon={isBookmarked ? faBookmark : faBookmarkRegular}
        className={`text-sm ${isBookmarked ? 'text-blue-600' : 'text-gray-600'}`}
      />
    </button>
  );
}
