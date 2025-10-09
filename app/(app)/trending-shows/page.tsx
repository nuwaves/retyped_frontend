import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteShowsGrid from './components/InfiniteShowsGrid';
import { Podcast, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

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