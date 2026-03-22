'use client';

import { useState, useCallback } from 'react';
import EpisodeListItem from '@/app/(app)/shows/[showSlug]/components/EpisodeListItem';
import LoadingSpinner from '@/app/_components/common/LoadingSpinner';
import InfiniteScrollTrigger from '@/app/_components/common/InfiniteScrollTrigger';
import { useInfiniteScroll } from '@/app/_hooks/useInfiniteScroll';
import { Episode, PaginatedResponse } from '@/app/_types';

const LOAD_MORE_LIMIT = 20;

interface TopicEpisodesListProps {
  topicSlug: string;
  initialEpisodes: Episode[];
  totalCount: number;
}

export default function TopicEpisodesList({ topicSlug, initialEpisodes, totalCount }: TopicEpisodesListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [offset, setOffset] = useState(initialEpisodes.length);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasMore = episodes.length < totalCount;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `/api/proxy/api/v1/topics/${topicSlug}/episodes/?limit=${LOAD_MORE_LIMIT}&offset=${offset}`
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const data: PaginatedResponse<Episode> = await res.json();
      setEpisodes((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + data.results.length);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, topicSlug, offset]);

  const { ref } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, loading: isLoading });

  return (
    <>
      <div className="flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeListItem key={episode.id} episode={episode} />
        ))}
      </div>

      {error && (
        <p className="text-center text-red-500 py-4">Failed to load more episodes.</p>
      )}

      {isLoading && <LoadingSpinner />}

      {hasMore && !isLoading && <InfiniteScrollTrigger triggerRef={ref} />}

      {!hasMore && episodes.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-8">No more episodes</p>
      )}
    </>
  );
}
