import { Metadata } from 'next';
import Script from 'next/script';
import HeroSearch from '@/app/_components/modules/home/HeroSearch';
import TrendingShows from '@/app/_components/modules/home/TrendingShows';
import TrendingEpisodes from '@/app/_components/modules/home/TrendingEpisodes';
import NewEpisodes from '@/app/_components/modules/home/NewEpisodes';
import ShowCard from '@/app/_components/cards/ShowCard';
import EpisodeCard from '@/app/_components/cards/EpisodeCard';
import { Episode, Podcast, PaginatedResponse } from '@/app/_types';
import { formatDate } from '@/app/_utils/formatters';
import { safeApi } from '@/app/_lib/serverApi';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Retyped - Discover Your Next Favorite Podcast',
  description: 'Explore trending podcasts, discover new episodes, and find your next audio obsession. Updated daily with the best content from around the web.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Retyped - Discover Your Next Favorite Podcast',
    description: 'Discover, listen, and connect with the stories that matter. Explore the world\'s best podcasts',
    type: 'website',
  },
};

const styles = {
  container: 'flex flex-col gap-4'
};

export default async function Home() {
  const [trendingShowsData, trendingEpisodesData, newEpisodesData] = await Promise.all([
    safeApi<PaginatedResponse<Podcast>>(
      '/api/v1/podcasts/top-by-views/?timeframe=7d&limit=4',
      { count: 0, next: null, previous: null, results: [] }
    ),
    safeApi<PaginatedResponse<Episode>>(
      '/api/v1/episodes/top-by-views/?timeframe=7d&limit=4',
      { count: 0, next: null, previous: null, results: [] }
    ),
    safeApi<PaginatedResponse<Episode>>(
      '/api/v1/episodes/?ordering=-updated_at&limit=4',
      { count: 0, next: null, previous: null, results: [] }
    ),
  ]);

  const trendingShows = trendingShowsData.results || [];
  const trendingEpisodes = trendingEpisodesData.results || [];
  const newEpisodes = newEpisodesData.results || [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Retyped',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script
        id="website-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <div className={styles.container}>
        <HeroSearch />

        <TrendingShows>
          {trendingShows.map((show, index) => (
            <ShowCard
              key={show.id}
              title={show.name}
              description={show.description}
              imageUrl={show.image_url}
              categories={show.tags}
              episodeCount={show.episode_count}
              totalViews={show.total_views}
              href={`/shows/${show.slug}`}
              priority={index === 0}
            />
          ))}
        </TrendingShows>

        <TrendingEpisodes>
          {trendingEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              showName={episode.podcast?.name || ''}
              showSlug={episode.podcast?.slug}
              episodeTitle={episode.title}
              description={episode.description}
              duration={episode.duration || '--:--'}
              date={formatDate(episode.release_date)}
              href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
            />
          ))}
        </TrendingEpisodes>

        <NewEpisodes>
          {newEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              showName={episode.podcast?.name || ''}
              showSlug={episode.podcast?.slug}
              episodeTitle={episode.title}
              description={episode.description}
              duration={episode.duration || '--:--'}
              date={formatDate(episode.release_date)}
              href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
            />
          ))}
        </NewEpisodes>
      </div>
    </>
  );
}