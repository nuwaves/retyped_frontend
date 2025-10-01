import { Metadata } from 'next';
import Script from 'next/script';
import HeroSearch from './components/modules/home/HeroSearch';
import TrendingShows from './components/modules/home/TrendingShows';
import TrendingEpisodes from './components/modules/home/TrendingEpisodes';
import NewEpisodes from './components/modules/home/NewEpisodes';
import ShowCard from './components/cards/ShowCard';
import EpisodeCard from './components/cards/EpisodeCard';
import { Episode, Podcast, PaginatedResponse } from './types';
import { formatDate } from './utils/formatters';
import { safeApi } from './lib/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Retyped - Discover Your Next Favorite Podcast',
  description: 'Explore trending podcasts, discover new episodes, and find your next audio obsession. Updated daily with the best content from around the web.',
  openGraph: {
    title: 'Retyped - Discover Your Next Favorite Podcast',
    description: 'Discover, listen, and connect with the stories that matter. Explore the world\'s best podcasts',
    type: 'website',
    // TODO: Replace with actual OpenGraph image
    images: ['https://placehold.co/1200x630/000000/FFFFFF/png?text=RETYPED'],
  },
};

const styles = {
  container: 'flex flex-col gap-12'
};

export default async function Home() {
  const [trendingShowsData, trendingEpisodesData, newEpisodesData] = await Promise.all([
    safeApi<PaginatedResponse<Podcast>>(
      '/api/v1/podcasts/top-by-views/?timeframe=all&limit=4',
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
          {trendingShows.map(show => (
            <ShowCard
              key={show.id}
              title={show.name}
              description={show.description}
              imageUrl={show.image_url || ''}
              categories={show.tags || []}
              href={`/shows/${show.slug}`}
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