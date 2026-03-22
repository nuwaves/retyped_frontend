import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteShowsGrid from './components/InfiniteShowsGrid';
import { Podcast, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await safeApi<PaginatedResponse<Podcast>>(
    '/api/v1/podcasts/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );
  const count = data.count || 0;
  const topShow = data.results?.[0]?.name;
  const description = count > 0 && topShow
    ? `Browse ${count} trending podcasts on Retyped — discover ${topShow} and more. Updated daily.`
    : 'Discover the most popular podcasts trending right now on Retyped. Updated daily.';
  return {
    title: 'Trending Shows | Retyped',
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: 'Trending Shows | Retyped',
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped trending shows' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trending Shows | Retyped',
      description,
    },
  };
}

export default async function TrendingShowsPage() {
  const initialData = await safeApi<PaginatedResponse<Podcast>>(
    '/api/v1/podcasts/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  return (
    <>
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