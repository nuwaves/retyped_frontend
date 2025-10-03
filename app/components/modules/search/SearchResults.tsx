'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Episode, Podcast } from '@/app/types';
import EpisodeCard from '@/app/components/cards/EpisodeCard';
import ShowCard from '@/app/components/cards/ShowCard';
import SearchSkeleton from './SearchSkeleton';
import { formatDate } from '@/app/utils/formatters';

interface SearchResultsProps {
  query: string;
  episodes: Episode[];
  podcasts: Podcast[];
  entities: any[];
  isLoading?: boolean;
  error?: any;
}

const styles = {
  header: "mb-8",
  title: "text-[32px] font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums text-black mb-2",
  subtitle: "text-[14px] font-normal leading-[115%] tracking-normal lining-nums proportional-nums text-[#656565]",
  queryText: "text-[14px] font-semibold leading-[115%] tracking-normal lining-nums proportional-nums text-slate-900",
  tabButtons: "flex bg-gray-100/50 rounded-lg p-1.5 mb-6 relative",
  tabButton: "px-4 py-2 font-medium text-[14px] leading-5 tracking-normal transition-colors rounded-md relative",
  activeTab: "text-slate-900",
  inactiveTab: "text-slate-700 hover:text-slate-900",
  backgroundPill: "absolute inset-0 bg-white rounded-md",
  episodesGrid: "grid grid-cols-1 gap-6",
  showsGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
  emptyState: "text-center py-12 text-gray-500"
};

type TabType = 'all' | 'podcasts' | 'episodes' | 'entities';

export default function SearchResults({ query, episodes, podcasts, entities, isLoading = false, error }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const totalResults = episodes.length + podcasts.length + entities.length;

  const tabs = [
    { id: 'all' as TabType, label: 'All', count: totalResults },
    { id: 'podcasts' as TabType, label: 'Podcasts', count: podcasts.length },
    { id: 'episodes' as TabType, label: 'Episodes', count: episodes.length },
    ...(entities.length > 0 ? [{ id: 'entities' as TabType, label: 'Entities', count: entities.length }] : [])
  ];

  return (
    <>
      <div className={styles.header}>
        {isLoading ? (
          <motion.h1
            key="searching-title"
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Searching
            <span className="inline-flex ml-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </span>
          </motion.h1>
        ) : (
          <motion.h1
            key="results-title"
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Search Results
          </motion.h1>
        )}
        {isLoading ? (
          <motion.p
            key="loading"
            className={styles.subtitle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="animate-pulse">Searching for</span> <span className={`${styles.queryText} animate-pulse`}>&quot;{query}&quot;</span>
          </motion.p>
        ) : totalResults === 0 ? (
          <motion.p
            key="no-results"
            className={styles.subtitle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            No results found for <span className={styles.queryText}>&quot;{query}&quot;</span>
          </motion.p>
        ) : (
          <motion.p
            key="results"
            className={styles.subtitle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {totalResults} {totalResults === 1 ? 'result' : 'results'} for <span className={styles.queryText}>&quot;{query}&quot;</span>
          </motion.p>
        )}
      </div>

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
              <motion.div
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
              <div className={styles.showsGrid}>
                {podcasts.map((podcast) => (
                  <ShowCard
                    key={podcast.id}
                    title={podcast.name}
                    description={podcast.description}
                    imageUrl={podcast.image_url}
                    categories={podcast.tags || []}
                    episodeCount={podcast.episode_count}
                    totalViews={podcast.total_views}
                    href={`/shows/${podcast.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
          {episodes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              <div className={styles.episodesGrid}>
                {episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    showName={episode.podcast?.name || ''}
                    showSlug={episode.podcast?.slug}
                    episodeTitle={episode.title}
                    description={episode.description || episode.summary}
                    duration={episode.duration || '--:--'}
                    date={formatDate(episode.release_date)}
                    href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isLoading && activeTab === 'podcasts' && (
        <div className={styles.showsGrid}>
          {podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <ShowCard
                key={podcast.id}
                title={podcast.name}
                description={podcast.description}
                imageUrl={podcast.image_url}
                categories={podcast.tags || []}
                episodeCount={podcast.episode_count}
                totalViews={podcast.total_views}
                href={`/shows/${podcast.slug}`}
              />
            ))
          ) : (
            <p className={styles.emptyState}>No podcasts found</p>
          )}
        </div>
      )}

      {!isLoading && activeTab === 'episodes' && (
        <div className={styles.episodesGrid}>
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                showName={episode.podcast?.name || ''}
                showSlug={episode.podcast?.slug}
                episodeTitle={episode.title}
                description={episode.description || episode.summary}
                duration={episode.duration || '--:--'}
                date={formatDate(episode.release_date)}
                href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
              />
            ))
          ) : (
            <p className={styles.emptyState}>No episodes found</p>
          )}
        </div>
      )}

      {!isLoading && activeTab === 'entities' && (
        <div className={styles.emptyState}>
          <p>Entities will be displayed here soon</p>
        </div>
      )}
    </>
  );
}
