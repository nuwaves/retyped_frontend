'use client';

import { useState } from 'react';

const styles = {
  container: "flex items-center justify-center px-4 py-20",
  wrapper: "max-w-4xl w-full text-center",
  title: "text-[51px] font-bold leading-[115%] tracking-normal text-center align-middle lining-nums proportional-nums mb-6 px-8",
  description: "text-base font-normal leading-6 tracking-normal text-center text-gray-600 lining-nums proportional-nums mb-12 px-8",
  searchContainer: "w-full",
  inputWrapper: "flex gap-2",
  input: "flex-1 h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent",
  button: "h-12 px-6 bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-colors"
};

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Build your podcast library
        </h1>
        
        <p className={styles.description}>
          Discover episodes to bookmark, podcasts to follow, and transcript moments to highlight. Search podcasts 
          and transcripts to build your personalized listening library.
        </p>
        
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, episodes, keywords...."
              className={styles.input}
            />
            <button 
              type="submit"
              className={styles.button}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}