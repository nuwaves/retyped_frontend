'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/_components/common/Button';

const styles = {
  container: "flex items-center justify-center px-4 py-12 lg:py-20",
  wrapper: "max-w-4xl w-full text-center",
  title: "text-4xl lg:text-[51px] font-bold leading-[115%] tracking-normal text-center align-middle lining-nums proportional-nums mb-6 px-4 lg:px-8 text-slate-900",
  description: "text-sm lg:text-base font-normal leading-6 tracking-normal text-center text-gray-600 lining-nums proportional-nums mb-8 lg:mb-12 px-4 lg:px-8",
  searchContainer: "w-full px-4 lg:px-0",
  inputWrapper: "flex gap-2 max-w-[732px] mx-auto items-center",
  input: "flex-1 min-h-[45px] h-[45px] md:min-h-[40px] md:h-[40px] px-4 text-sm lg:text-[16px] font-normal leading-[24px] tracking-normal border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-colors duration-300 ease-out lining-nums proportional-nums placeholder:text-sm lg:placeholder:text-base",
  inputShadow: "0px 2px 6px 0px #00000008",
  button: "hidden min-[380px]:block !w-auto lg:!w-[79px] !px-3 lg:!px-0 !py-0 !h-[45px] md:!h-[40px]"
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
          Find shows <br className="min-[500px]:hidden" />you love
        </h1>
        
        <p className={styles.description}>
          Build your personal media library. Follow your favorite people, shows, and topics
        </p>
        
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people, shows, topics"
              className={styles.input}
              style={{ boxShadow: styles.inputShadow }}
            />
            <Button
              type="submit"
              variant="secondary"
              size="md"
              className={styles.button}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}