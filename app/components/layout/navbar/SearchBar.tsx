'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { setSearchBarFocus } from '@/app/store/features/ui/uiSlice';

const styles = {
  container: "flex-1 max-w-[276px]",
  wrapper: "relative",
  input: "w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent",
  button: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', query);
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