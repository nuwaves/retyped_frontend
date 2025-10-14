'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Episode, Podcast } from '@/app/_types';
import SearchPodcastList from '@/app/(app)/search/components/SearchPodcastList';
import SearchEpisodeList from '@/app/(app)/search/components/SearchEpisodeList';
import SearchHeader from '@/app/(app)/search/components/SearchHeader';
import SearchSkeleton from './SearchSkeleton';

interface SearchResultsProps {
  query: string;
  episodes: Episode[];
  podcasts: Podcast[];
  isLoading?: boolean;
  error?: unknown;
}

const styles = {
  tabButtons: "flex bg-gray-100/50 rounded-lg p-1.5 mb-6 relative",
  tabButton: "px-4 py-2 font-medium text-[14px] leading-5 tracking-normal transition-colors rounded-md relative",
  activeTab: "text-slate-900",
  inactiveTab: "text-slate-700 hover:text-slate-900",
  backgroundPill: "absolute inset-0 bg-white rounded-md",
  episodesGrid: "grid grid-cols-1 gap-6",
  showsGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
  emptyState: "text-center py-12 text-gray-500"
};

type TabType = 'all' | 'podcasts' | 'episodes';

export default function SearchResults({ query, episodes, podcasts, isLoading = false, error }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const totalResults = episodes.length + podcasts.length;

  const tabs = [
    { id: 'all' as TabType, label: 'All', count: totalResults },
    { id: 'podcasts' as TabType, label: 'Podcasts', count: podcasts.length },
    { id: 'episodes' as TabType, label: 'Episodes', count: episodes.length },
  ];

  return (
    <>
      <SearchHeader query={query} isLoading={isLoading} totalResults={totalResults} />

      <div className={styles.tabButtons}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.activeTab : styles.inactiveTab
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {activeTab === tab.id && (
              <m.div
                className={styles.backgroundPill}
                layoutId="searchTabBackground"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
            <span className="relative z-10">
              {tab.label} {!isLoading && `(${tab.count})`}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Error searching. Please try again.</p>
        </div>
      )}

      {isLoading ? (
        <SearchSkeleton />
      ) : activeTab === 'all' && (
        <div className="space-y-8">
          {podcasts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Podcasts</h2>
              <SearchPodcastList podcasts={podcasts} />
            </div>
          )}
          {episodes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              <SearchEpisodeList episodes={episodes} />
            </div>
          )}
        </div>
      )}

      {!isLoading && activeTab === 'podcasts' && (
        <>
          {podcasts.length > 0 ? (
            <SearchPodcastList podcasts={podcasts} />
          ) : (
            <p className={styles.emptyState}>No podcasts found</p>
          )}
        </>
      )}

      {!isLoading && activeTab === 'episodes' && (
        <>
          {episodes.length > 0 ? (
            <SearchEpisodeList episodes={episodes} />
          ) : (
            <p className={styles.emptyState}>No episodes found</p>
          )}
        </>
      )}
    </>
  );
}
