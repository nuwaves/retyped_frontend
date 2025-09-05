'use client';

import { useState } from 'react';
import Button from '@/app/components/common/Button';

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
}

export default function LoadMoreButton({ onLoadMore }: LoadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="outline" 
        size="md"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
}