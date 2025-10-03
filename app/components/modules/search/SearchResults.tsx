'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Episode, Podcast } from '@/app/types';
import EpisodeCard from '@/app/components/cards/EpisodeCard';
import ShowCard from '@/app/components/cards/ShowCard';
import { formatDate } from '@/app/utils/formatters';

interface SearchResultsProps {
  query: string;
  episodes: Episode[];
  podcasts: Podcast[];
  entities: any[];
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

export default function SearchResults({ query, episodes, podcasts, entities }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const totalResults = episodes.length + podcasts.length + entities.length;

  const tabs = [
    { id: 'all' as TabType, label: 'All', count: totalResults },
    { id: 'podcasts' as TabType, label: 'Podcasts', count: podcasts.length },
    { id: 'episodes' as TabType, label: 'Episodes', count: episodes.length },
    ...(entities.length > 0 ? [{ id: 'entities' as TabType, label: 'Entities', count: entities.length }] : [])
  ];

  if (totalResults === 0) {
    return (
      <div className={styles.header}>
        <h1 className={styles.title}>Search Results</h1>
        <p className={styles.subtitle}>
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Search Results</h1>
        <p className={styles.subtitle}>
          {totalResults} {totalResults === 1 ? 'result' : 'results'} for <span className={styles.queryText}>&quot;{query}&quot;</span>
        </p>
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
              {tab.label} ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'all' && (
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

      {activeTab === 'podcasts' && (
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

      {activeTab === 'episodes' && (
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

      {activeTab === 'entities' && (
        <div className={styles.emptyState}>
          <p>Entities will be displayed here soon</p>
        </div>
      )}
    </>
  );
}
