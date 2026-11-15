import { Metadata } from 'next';
import BackNavigation from '@/app/_components/common/BackNavigation';
import ShowCard from '@/app/_components/cards/ShowCard';
import { Podcast, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';
import { serializeJsonLd } from '@/app/_utils/jsonLd';

// Render per request instead of prerendering at build time: the image is built in CI,
// where the backend is unreachable, so a build-time prerender would bake in an empty page.
// The backend fetch is still cached below.
export const dynamic = 'force-dynamic';
const API_CACHE = { next: { revalidate: 3600 } };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz';

// Every show on one page: the catalog is small, and this is the page the
// "Shows" breadcrumb on every show and episode page points to.
async function getShows(): Promise<Podcast[]> {
  const data = await safeApi<PaginatedResponse<Podcast>>(
    '/api/v1/podcasts/?limit=500',
    { count: 0, next: null, previous: null, results: [] },
    API_CACHE
  );
  return [...(data.results || [])]
    // Shows whose feed has not been ingested yet have no episodes or artwork.
    .filter((show) => show.slug && show.episode_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function generateMetadata(): Promise<Metadata> {
  const count = (await getShows()).length;
  const title = 'All Podcasts: Transcripts & Summaries';
  const description = count > 0
    ? `Browse all ${count} podcasts on Retyped. Read episode transcripts and AI summaries for every show.`
    : 'Browse every podcast on Retyped. Read episode transcripts and AI summaries for every show.';
  return {
    title: `${title} | Retyped`,
    description,
    alternates: { canonical: './' },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Podcasts on Retyped' }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ShowsPage() {
  const shows = await getShows();

  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Podcasts on Retyped',
    numberOfItems: shows.length,
    itemListElement: shows.map((show, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: show.name,
      url: `${SITE_URL}/shows/${show.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListData) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BackNavigation href="/" label="Home" />

        <h1 className="text-3xl font-bold text-black mb-2">All Shows</h1>
        <p className="text-gray-500 text-sm mb-8">
          {shows.length > 0
            ? `${shows.length} podcasts with episode transcripts and summaries`
            : 'Podcasts with episode transcripts and summaries'}
        </p>

        {shows.length === 0 ? (
          <p className="text-gray-500">No shows found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {shows.map((show, index) => (
              <ShowCard
                key={show.id}
                title={show.name}
                description={show.description}
                imageUrl={show.image_url}
                categories={show.tags}
                episodeCount={show.episode_count}
                href={`/shows/${show.slug}`}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
