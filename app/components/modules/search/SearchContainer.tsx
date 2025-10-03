'use client';

import { useEffect } from 'react';
import { useSearchQuery } from '@/app/store/services/searchApi';
import SearchResults from './SearchResults';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';

interface SearchContainerProps {
  initialQuery: string;
}

const styles = {
  container: "container mx-auto px-4 py-8 max-w-7xl",
  errorContainer: "text-center py-12",
  errorText: "text-red-500 text-lg"
};

export default function SearchContainer({ initialQuery }: SearchContainerProps) {
  const { data, isLoading, isFetching, error, refetch } = useSearchQuery(
    { q: initialQuery },
    { skip: !initialQuery }
  );

  useEffect(() => {
    if (initialQuery) {
      refetch();
    }
  }, [initialQuery, refetch]);

  if (!initialQuery) {
    return (
      <div className={styles.container}>
        <p className="text-gray-500 text-center py-12">
          Enter a search term
        </p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>
            Error searching. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SearchResults
        query={initialQuery}
        episodes={data?.episodes || []}
        podcasts={data?.podcasts || []}
        entities={data?.entities || []}
      />
    </div>
  );
}
