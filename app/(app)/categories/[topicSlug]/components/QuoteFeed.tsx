'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@/app/_lib/icons';
import LoadingSpinner from '@/app/_components/common/LoadingSpinner';
import InfiniteScrollTrigger from '@/app/_components/common/InfiniteScrollTrigger';
import { useInfiniteScroll } from '@/app/_hooks/useInfiniteScroll';
import { TopicQuote, PaginatedResponse } from '@/app/_types';

const LOAD_MORE_LIMIT = 20;

interface QuoteFeedProps {
  topicSlug: string;
  initialQuotes: TopicQuote[];
  totalCount: number;
}

export default function QuoteFeed({ topicSlug, initialQuotes, totalCount }: QuoteFeedProps) {
  const [quotes, setQuotes] = useState<TopicQuote[]>(initialQuotes);
  const [offset, setOffset] = useState(initialQuotes.length);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasMore = quotes.length < totalCount;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `/api/proxy/api/v1/topics/${topicSlug}/quotes/?limit=${LOAD_MORE_LIMIT}&offset=${offset}`
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const data: PaginatedResponse<TopicQuote> = await res.json();
      setQuotes((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + data.results.length);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, topicSlug, offset]);

  const { ref } = useInfiniteScroll({ onLoadMore: loadMore, hasMore, loading: isLoading });

  if (quotes.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}

      {error && (
        <p className="text-center text-red-500 py-4 text-sm">Failed to load more quotes.</p>
      )}

      {isLoading && <LoadingSpinner />}

      {hasMore && !isLoading && <InfiniteScrollTrigger triggerRef={ref} />}

      {!hasMore && quotes.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-6">No more quotes</p>
      )}
    </div>
  );
}

function QuoteCard({ quote }: { quote: TopicQuote }) {
  const episodeHref = `/shows/${quote.podcast_slug}/${quote.episode_slug}`;
  const showHref = `/shows/${quote.podcast_slug}`;

  return (
    <div className="bg-white rounded-lg shadow-[0px_3px_3px_0px_#E2E8F0] p-6 flex flex-col gap-4">
      <div className="flex gap-3">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="text-gray-200 text-2xl flex-shrink-0 mt-1"
        />
        <Link href={episodeHref} className="text-gray-800 text-base leading-relaxed hover:text-black transition-colors">
          {quote.text}
        </Link>
      </div>

      {quote.speaker && (
        <p className="text-sm font-semibold text-gray-600 pl-9">— {quote.speaker}</p>
      )}

      <div className="flex items-center gap-3 pl-9 pt-1 border-t border-gray-100">
        {quote.podcast_image_url && (
          <Link href={showHref} className="flex-shrink-0">
            <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100">
              <Image
                src={quote.podcast_image_url}
                alt={quote.podcast_name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          </Link>
        )}
        <div className="min-w-0 flex flex-col">
          <Link href={showHref} className="text-xs font-medium text-gray-500 hover:text-gray-800 truncate transition-colors">
            {quote.podcast_name}
          </Link>
          <Link href={episodeHref} className="text-xs text-gray-400 hover:text-gray-600 truncate transition-colors line-clamp-1">
            {quote.episode_title}
          </Link>
        </div>
      </div>
    </div>
  );
}
