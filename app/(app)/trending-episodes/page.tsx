import { Metadata } from 'next';
import Script from 'next/script';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteEpisodesList from './components/InfiniteEpisodesList';
import { Episode, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Trending Episodes | Retyped',
  description: 'Discover the most popular podcast episodes trending right now. Listen to what everyone is talking about.',
  openGraph: {
    title: 'Trending Episodes | Retyped',
    description: 'Discover the most popular podcast episodes trending right now',
    type: 'website',
  },
};

export default async function TrendingEpisodesPage() {
  const initialData = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Trending Episodes',
    description: 'Most popular podcast episodes trending on Retyped',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/trending-episodes`,
    numberOfItems: initialData.count,
    itemListElement: initialData.results.slice(0, 10).map((episode, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'PodcastEpisode',
        name: episode.title,
        description: episode.description,
        datePublished: episode.release_date,
        duration: episode.duration,
        partOfSeries: {
          '@type': 'PodcastSeries',
          name: episode.podcast?.name || 'Unknown Podcast'
        },
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${episode.podcast?.slug}/${episode.slug}`,
      }
    }))
  };

  return (
    <>
      <Script
        id="trending-episodes-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href="/" label="Home" />

        <h1 className="text-3xl font-bold text-black mb-8">Trending Episodes</h1>

        <InfiniteEpisodesList
          initialEpisodes={initialData.results}
          totalCount={initialData.count}
        />
      </div>
    </>
  );
}