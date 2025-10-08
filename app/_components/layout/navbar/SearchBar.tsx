'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/app/_store/hooks';
import { setSearchBarFocus } from '@/app/_store/features/ui/uiSlice';
import { useLazySearchQuery } from '@/app/_store/services/searchApi';

const styles = {
  container: "flex-1 w-full md:max-w-[276px]",
  wrapper: "relative",
  input: "w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent",
  button: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [triggerSearch] = useLazySearchQuery();

  useEffect(() => {
    if (pathname === '/search') {
      const urlQuery = searchParams.get('q') || '';
      setQuery(urlQuery);
    }
  }, [pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmedQuery = query.trim();
    const currentUrlQuery = searchParams.get('q');
    const shouldRefetchInPlace = pathname === '/search' && currentUrlQuery === trimmedQuery;

    if (shouldRefetchInPlace) {
      triggerSearch({ q: trimmedQuery }, false);
    } else {
      const encodedQuery = encodeURIComponent(trimmedQuery).replace(/%20/g, '+');
      router.push(`/search?q=${encodedQuery}`);
    }
  };

  const handleFocus = () => {
    dispatch(setSearchBarFocus(true));
  };

  const handleBlur = () => {
    dispatch(setSearchBarFocus(false));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.wrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search"
          className={styles.input}
        />
      </form>
    </div>
  );
}