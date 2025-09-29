import { Metadata } from 'next';
import Script from 'next/script';
import BackNavigation from '@/app/components/common/BackNavigation';
import InfiniteEpisodesList from './components/InfiniteEpisodesList';
import { Episode, PaginatedResponse } from '@/app/types';
import { safeApi } from '@/app/lib/api';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'New Episodes | Retyped',
  description: 'Discover the latest podcast episodes. Stay up to date with fresh content from your favorite shows.',
  openGraph: {
    title: 'New Episodes | Retyped',
    description: 'Discover the latest podcast episodes',
    type: 'website',
  },
};

export default async function NewEpisodesPage() {
  const initialData = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/?ordering=-updated_at&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'New Episodes',
    description: 'Latest podcast episodes on Retyped',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/new-episodes`,
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
        id="new-episodes-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href="/" label="Home" />

        <h1 className="text-3xl font-bold text-black mb-8">New Episodes</h1>

        <InfiniteEpisodesList
          initialEpisodes={initialData.results}
          totalCount={initialData.count}
        />
      </div>
    </>
  );
}