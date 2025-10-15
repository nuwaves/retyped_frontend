'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchContainer from './components/SearchContainer';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchContainer initialQuery={query} />;
}

export default function SearchClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
