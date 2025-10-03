'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AnyAction } from '@reduxjs/toolkit';

interface UseScrollRestorationProps<T> {
  pageKey: 'trendingShows' | 'trendingEpisodes' | 'newEpisodes';
  isActive: boolean;
  saveAction: (payload: { items: T[]; offset: number; scrollPosition: number }) => AnyAction;
  items: T[];
  offset: number;
  cachedScrollPosition?: number;
}

export function useScrollRestoration<T>({
  isActive,
  saveAction,
  items,
  offset,
  cachedScrollPosition,
}: UseScrollRestorationProps<T>) {
  const dispatch = useDispatch();
  const hasRestoredRef = useRef(false);

  // Save scroll position before unmounting
  useEffect(() => {
    if (!isActive || items.length === 0) return;

    const handleBeforeUnload = () => {
      const scrollPosition = window.scrollY;
      dispatch(saveAction({
        items,
        offset,
        scrollPosition,
      }));
    };

    // Save on navigation away
    return () => {
      handleBeforeUnload();
    };
  }, [isActive, items, offset, dispatch, saveAction]);

  // Restore scroll position after mounting
  useLayoutEffect(() => {
    if (!isActive || hasRestoredRef.current) return;

    if (cachedScrollPosition !== undefined && cachedScrollPosition > 0) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: cachedScrollPosition,
          behavior: 'instant' as ScrollBehavior,
        });
        hasRestoredRef.current = true;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, cachedScrollPosition]);

  // Save scroll position periodically while scrolling
  useEffect(() => {
    if (!isActive || items.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        dispatch(saveAction({
          items,
          offset,
          scrollPosition: window.scrollY,
        }));
      }, 500); // Debounce 500ms
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive, items, offset, dispatch, saveAction]);
}