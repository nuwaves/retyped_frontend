import { Metadata } from 'next';
import Script from 'next/script';
import BackNavigation from '@/app/components/common/BackNavigation';
import InfiniteShowsGrid from './components/InfiniteShowsGrid';
import { Podcast, PaginatedResponse } from '@/app/types';
import { safeApi } from '@/app/lib/api';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Trending Shows | Retyped',
  description: 'Discover the most popular podcasts trending right now. Updated daily with the best shows from around the web.',
  openGraph: {
    title: 'Trending Shows | Retyped',
    description: 'Discover the most popular podcasts trending right now',
    type: 'website',
  },
};

export default async function TrendingShowsPage() {
  const initialData = await safeApi<PaginatedResponse<Podcast>>(
    '/api/v1/podcasts/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Trending Podcasts',
    description: 'Most popular podcasts trending on Retyped',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/trending-shows`,
    numberOfItems: initialData.count,
    itemListElement: initialData.results.slice(0, 10).map((show, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'PodcastSeries',
        name: show.name,
        description: show.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${show.slug}`,
      }
    }))
  };

  return (
    <>
      <Script
        id="trending-shows-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BackNavigation href="/" label="Home" />

        <h1 className="text-3xl font-bold text-black mb-8">Trending Shows</h1>

        <InfiniteShowsGrid
          initialShows={initialData.results}
          totalCount={initialData.count}
        />
      </div>
    </>
  );
}