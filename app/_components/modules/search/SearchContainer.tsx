'use client';

import { useSearchQuery } from '@/app/_store/services/searchApi';
import SearchResults from './SearchResults';

interface SearchContainerProps {
  initialQuery: string;
}

const styles = {
  container: "container mx-auto px-4 py-8 max-w-7xl",
  errorContainer: "text-center py-12",
  errorText: "text-red-500 text-lg"
};

export default function SearchContainer({ initialQuery }: SearchContainerProps) {
  const { data, isLoading, isFetching, error } = useSearchQuery(
    { q: initialQuery },
    { skip: !initialQuery }
  );

  if (!initialQuery) {
    return (
      <div className={styles.container}>
        <p className="text-gray-500 text-center py-12">
          Enter a search term
        </p>
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
        isLoading={isLoading || isFetching}
        error={error}
      />
    </div>
  );
}
