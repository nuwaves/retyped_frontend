import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteEpisodesList from './components/InfiniteEpisodesList';
import { Episode, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

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

  return (
    <>
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