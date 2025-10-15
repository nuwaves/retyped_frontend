'use client';

import { useSession } from 'next-auth/react';
import { useGetBookmarksByTypeQuery } from '@/app/_store/services/bookmarksApi';
import { useGetFollowsByTypeQuery } from '@/app/_store/services/followsApi';
import { useGetUserAnalyticsEpisodesQuery, useGetUserAnalyticsPodcastsQuery } from '@/app/_store/services/analyticsApi';
import { Episode, Podcast } from '@/app/_types';
import ActivityTabs from './ActivityTabs';
import LoadingSpinner from '@/app/_components/common/LoadingSpinner';

const styles = {
  container: "container mx-auto px-4 py-8 max-w-7xl",
  header: "mb-8",
  title: "text-3xl font-bold text-gray-900 mb-2",
  subtitle: "text-gray-600",
  errorContainer: "text-center py-12",
  errorText: "text-red-500 text-lg"
};

export default function ActivityContainer() {
  const { data: session, status } = useSession();

  // Only fetch data if authenticated
  const {
    data: bookmarksData,
    isLoading: isLoadingBookmarks,
    error: bookmarksError
  } = useGetBookmarksByTypeQuery(
    { entity_type: 'episode' },
    { skip: status !== 'authenticated' }
  );

  const {
    data: followsData,
    isLoading: isLoadingFollows,
    error: followsError
  } = useGetFollowsByTypeQuery(
    { entity_type: 'podcast' },
    { skip: status !== 'authenticated' }
  );

  const {
    data: analyticsEpisodesData,
    isLoading: isLoadingAnalyticsEpisodes,
    error: analyticsEpisodesError
  } = useGetUserAnalyticsEpisodesQuery(
    {},
    { skip: status !== 'authenticated' }
  );

  const {
    data: analyticsPodcastsData,
    isLoading: isLoadingAnalyticsPodcasts,
    error: analyticsPodcastsError
  } = useGetUserAnalyticsPodcastsQuery(
    {},
    { skip: status !== 'authenticated' }
  );

  // Parse bookmark entities (handle both string and object)
  const bookmarkedEpisodes: Episode[] = (bookmarksData?.results || [])
    .map(bookmark => {
      try {
        if (typeof bookmark.entity === 'object') {
          return bookmark.entity as unknown as Episode;
        }
        return JSON.parse(bookmark.entity) as Episode;
      } catch (error) {
        console.error('Failed to parse bookmark entity:', error);
        return null;
      }
    })
    .filter((episode): episode is Episode => episode !== null);

  // Parse follow entities (handle both string and object)
  const followedPodcasts: Podcast[] = (followsData?.results || [])
    .map(follow => {
      try {
        if (typeof follow.entity === 'object') {
          return follow.entity as unknown as Podcast;
        }
        return JSON.parse(follow.entity) as Podcast;
      } catch (error) {
        console.error('Failed to parse follow entity:', error);
        return null;
      }
    })
    .filter((podcast): podcast is Podcast => podcast !== null);

  // Parse analytics episodes (handle both string and object)
  const recentlyVisitedEpisodes: Episode[] = (analyticsEpisodesData?.results || [])
    .map(analytic => {
      try {
        if (typeof analytic.entity_detail === 'object') {
          return analytic.entity_detail as unknown as Episode;
        }
        return JSON.parse(analytic.entity_detail) as Episode;
      } catch (error) {
        console.error('Failed to parse analytics episode entity:', error);
        return null;
      }
    })
    .filter((episode): episode is Episode => episode !== null);

  // Parse analytics podcasts (handle both string and object)
  const recentlyVisitedPodcasts: Podcast[] = (analyticsPodcastsData?.results || [])
    .map(analytic => {
      try {
        if (typeof analytic.entity_detail === 'object') {
          return analytic.entity_detail as unknown as Podcast;
        }
        return JSON.parse(analytic.entity_detail) as Podcast;
      } catch (error) {
        console.error('Failed to parse analytics podcast entity:', error);
        return null;
      }
    })
    .filter((podcast): podcast is Podcast => podcast !== null);

  const isLoading = isLoadingBookmarks || isLoadingFollows || isLoadingAnalyticsEpisodes || isLoadingAnalyticsPodcasts;
  const hasError = bookmarksError || followsError || analyticsEpisodesError || analyticsPodcastsError;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>
            Failed to load your library. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Library</h1>
        <p className={styles.subtitle}>
          Your personal collection of bookmarked episodes, followed podcasts, and saved highlights
        </p>
      </div>

      <ActivityTabs
        bookmarkedEpisodes={bookmarkedEpisodes}
        followedPodcasts={followedPodcasts}
        recentlyVisitedEpisodes={recentlyVisitedEpisodes}
        recentlyVisitedPodcasts={recentlyVisitedPodcasts}
      />
    </div>
  );
}
