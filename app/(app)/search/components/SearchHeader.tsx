'use client';

import { motion } from 'framer-motion';
import LoadingDots from './LoadingDots';

interface SearchHeaderProps {
  query: string;
  isLoading: boolean;
  totalResults: number;
}

const styles = {
  header: "mb-8",
  title: "text-[32px] font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums text-black mb-2",
  subtitle: "text-[14px] font-normal leading-[115%] tracking-normal lining-nums proportional-nums text-[#656565]",
  queryText: "text-[14px] font-semibold leading-[115%] tracking-normal lining-nums proportional-nums text-slate-900"
};

const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

const slideAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  transition: { duration: 0.3 }
};

export default function SearchHeader({ query, isLoading, totalResults }: SearchHeaderProps) {
  return (
    <div className={styles.header}>
      {isLoading ? (
        <motion.h1
          key="searching-title"
          className={styles.title}
          {...fadeAnimation}
        >
          Searching
          <LoadingDots />
        </motion.h1>
      ) : (
        <motion.h1
          key="results-title"
          className={styles.title}
          {...fadeAnimation}
        >
          Search Results
        </motion.h1>
      )}
      {isLoading ? (
        <motion.p
          key="loading"
          className={styles.subtitle}
          {...slideAnimation}
        >
          <span className="animate-pulse">Searching for</span> <span className={`${styles.queryText} animate-pulse`}>&quot;{query}&quot;</span>
        </motion.p>
      ) : totalResults === 0 ? (
        <motion.p
          key="no-results"
          className={styles.subtitle}
          {...slideAnimation}
        >
          No results found for <span className={styles.queryText}>&quot;{query}&quot;</span>
        </motion.p>
      ) : (
        <motion.p
          key="results"
          className={styles.subtitle}
          {...slideAnimation}
        >
          {totalResults} {totalResults === 1 ? 'result' : 'results'} for <span className={styles.queryText}>&quot;{query}&quot;</span>
        </motion.p>
      )}
    </div>
  );
}
