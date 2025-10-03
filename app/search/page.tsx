'use client';

import { useSearchParams } from 'next/navigation';
import SearchContainer from '@/app/components/modules/search/SearchContainer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchContainer initialQuery={query} />;
}
