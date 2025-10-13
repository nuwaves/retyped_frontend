'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Episode, Podcast } from '@/app/_types';
import BookmarkedEpisodesList from './BookmarkedEpisodesList';
import FollowedPodcastsList from './FollowedPodcastsList';
import RecentlyVisitedEpisodesList from './RecentlyVisitedEpisodesList';
import RecentlyVisitedPodcastsList from './RecentlyVisitedPodcastsList';

interface ActivityTabsProps {
  bookmarkedEpisodes: Episode[];
  followedPodcasts: Podcast[];
  recentlyVisitedEpisodes: Episode[];
  recentlyVisitedPodcasts: Podcast[];
}

const styles = {
  tabButtons: "flex flex-wrap bg-gray-100/50 rounded-lg p-1.5 mb-6 relative gap-1",
  tabButton: "px-4 py-2 font-medium text-[14px] leading-5 tracking-normal transition-colors rounded-md relative",
  activeTab: "text-slate-900",
  inactiveTab: "text-slate-700 hover:text-slate-900",
  backgroundPill: "absolute inset-0 bg-white rounded-md",
  emptyState: "text-center py-12 text-gray-500"
};

type TabType = 'bookmarked-episodes' | 'followed-podcasts' | 'recent-episodes' | 'recent-podcasts';

export default function ActivityTabs({ bookmarkedEpisodes, followedPodcasts, recentlyVisitedEpisodes, recentlyVisitedPodcasts }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('bookmarked-episodes');

  const tabs = [
    { id: 'bookmarked-episodes' as TabType, label: 'Bookmarked Episodes', count: bookmarkedEpisodes.length },
    { id: 'followed-podcasts' as TabType, label: 'Followed Podcasts', count: followedPodcasts.length },
    { id: 'recent-episodes' as TabType, label: 'Recently Visited Episodes', count: recentlyVisitedEpisodes.length },
    { id: 'recent-podcasts' as TabType, label: 'Recently Visited Podcasts', count: recentlyVisitedPodcasts.length },
  ];

  return (
    <>
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
                layoutId="activityTabBackground"
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

      <div role="tabpanel">
        {activeTab === 'bookmarked-episodes' && (
          <>
            {bookmarkedEpisodes.length > 0 ? (
              <BookmarkedEpisodesList episodes={bookmarkedEpisodes} />
            ) : (
              <p className={styles.emptyState}>
                You haven&apos;t bookmarked any episodes yet.
              </p>
            )}
          </>
        )}

        {activeTab === 'followed-podcasts' && (
          <>
            {followedPodcasts.length > 0 ? (
              <FollowedPodcastsList podcasts={followedPodcasts} />
            ) : (
              <p className={styles.emptyState}>
                You aren&apos;t following any podcasts yet.
              </p>
            )}
          </>
        )}

        {activeTab === 'recent-episodes' && (
          <>
            {recentlyVisitedEpisodes.length > 0 ? (
              <RecentlyVisitedEpisodesList episodes={recentlyVisitedEpisodes} />
            ) : (
              <p className={styles.emptyState}>
                You haven&apos;t visited any episodes yet.
              </p>
            )}
          </>
        )}

        {activeTab === 'recent-podcasts' && (
          <>
            {recentlyVisitedPodcasts.length > 0 ? (
              <RecentlyVisitedPodcastsList podcasts={recentlyVisitedPodcasts} />
            ) : (
              <p className={styles.emptyState}>
                You haven&apos;t visited any podcasts yet.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
