import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import InfiniteEpisodesList from './components/InfiniteEpisodesList';
import { Episode, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';
import { sanitize } from '@/app/_utils/sanitizeHtml';

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const data = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/?ordering=-release_date&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );
  const count = data.count || 0;
  const topShow = data.results?.[0]?.podcast?.name;
  const description = count > 0 && topShow
    ? `Browse ${count.toLocaleString()} podcast episodes indexed on Retyped — latest from ${topShow} and more. AI-generated summaries for every episode.`
    : 'Discover the latest podcast episodes on Retyped. AI-generated summaries and key takeaways updated daily.';
  return {
    title: 'New Episodes | Retyped',
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: 'New Episodes | Retyped',
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped new episodes' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'New Episodes | Retyped',
      description,
    },
  };
}

export default async function NewEpisodesPage() {
  const initialData = await safeApi<PaginatedResponse<Episode>>(
    '/api/v1/episodes/?ordering=-release_date&limit=20',
    { count: 0, next: null, previous: null, results: [] }
  );

  const sanitizedEpisodes = initialData.results.map(episode => ({
    ...episode,
    description: sanitize(episode.description)
  }));

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href="/" label="Home" />

        <h1 className="text-3xl font-bold text-black mb-8">New Episodes</h1>

        <InfiniteEpisodesList
          initialEpisodes={sanitizedEpisodes}
          totalCount={initialData.count}
        />
      </div>
    </>
  );
}