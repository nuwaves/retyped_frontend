'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/_components/common/Button';

const styles = {
  container: "flex items-center justify-center px-4 py-20",
  wrapper: "max-w-4xl w-full text-center",
  title: "text-[51px] font-bold leading-[115%] tracking-normal text-center align-middle lining-nums proportional-nums mb-6 px-8 text-slate-900",
  description: "text-base font-normal leading-6 tracking-normal text-center text-gray-600 lining-nums proportional-nums mb-12 px-8",
  searchContainer: "w-full",
  inputWrapper: "flex gap-2",
  input: "flex-1 h-12 px-4 text-[16px] font-normal leading-[24px] tracking-normal border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-colors duration-300 ease-out lining-nums proportional-nums",
  inputShadow: "0px 2px 6px 0px #00000008"
};

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
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
              style={{ boxShadow: styles.inputShadow }}
            />
            <Button 
              type="submit"
              variant="secondary"
              size="lg"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}