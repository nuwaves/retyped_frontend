import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteEpisodesList from './components/InfiniteEpisodesList';
import { Episode, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const data = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );
  const count = data.count || 0;
  const topShow = data.results?.[0]?.podcast?.name;
  const description = count > 0 && topShow
    ? `Browse ${count} trending podcast episodes on Retyped — featuring ${topShow} and more. Updated daily.`
    : 'Discover the most popular podcast episodes trending right now on Retyped. Updated daily.';
  return {
    title: 'Trending Episodes | Retyped',
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: 'Trending Episodes | Retyped',
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped trending episodes' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trending Episodes | Retyped',
      description,
    },
  };
}

export default async function TrendingEpisodesPage() {
  const initialData = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/top-by-views/?timeframe=7d&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  return (
    <>
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