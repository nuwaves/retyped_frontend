'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseImageWithRetryOptions {
  src: string;
  maxRetries?: number;
  retryDelay?: number;
}

interface UseImageWithRetryReturn {
  currentSrc: string;
  isLoading: boolean;
  hasError: boolean;
  handleError: () => void;
  handleLoad: () => void;
  key: string;
}

export function useImageWithRetry({
  src,
  maxRetries = 2,
  retryDelay = 500
}: UseImageWithRetryOptions): UseImageWithRetryReturn {
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(`${src}-0`);

  // Reset state when src changes
  useEffect(() => {
    setRetryCount(0);
    setIsLoading(true);
    setHasError(false);
    setKey(`${src}-0`);
  }, [src]);

  const handleError = useCallback(() => {
    if (retryCount < maxRetries - 1) {
      // Retry
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setKey(`${src}-${retryCount + 1}`);
      }, retryDelay);
    } else {
      // Max retries reached, show fallback
      setHasError(true);
      setIsLoading(false);
    }
  }, [retryCount, maxRetries, retryDelay, src]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  return {
    currentSrc: src,
    isLoading,
    hasError,
    handleError,
    handleLoad,
    key
  };
}
