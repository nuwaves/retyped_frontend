import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';
import HeroSearch from './components/HeroSearch';
import TrendingShows from './components/TrendingShows';
import TrendingEpisodes from './components/TrendingEpisodes';
import NewEpisodes from './components/NewEpisodes';
import PersonalizedFeed from './components/PersonalizedFeed';
import ShowCard from '@/app/_components/cards/ShowCard';
import EpisodeCard from '@/app/_components/cards/EpisodeCard';
import { Episode, Podcast, TopicQuote, PaginatedResponse } from '@/app/_types';
import { formatDate } from '@/app/_utils/formatters';
import { safeApi } from '@/app/_lib/serverApi';
import { sanitize } from '@/app/_utils/sanitizeHtml';
import { serializeJsonLd } from '@/app/_utils/jsonLd';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Retyped - Podcast Transcripts and AI Summaries',
  description: "Read full transcripts and AI summaries of top podcast episodes. Search what was said, skim the key points, and find your next listen.",
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Retyped - Podcast Transcripts and AI Summaries',
    description: "Read full transcripts and AI summaries of top podcast episodes. Search what was said, skim the key points, and find your next listen.",
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped - Podcast Transcripts and AI Summaries' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retyped - Podcast Transcripts and AI Summaries',
    description: "Read full transcripts and AI summaries of top podcast episodes. Search what was said, skim the key points, and find your next listen.",
  },
};

// The page renders per request (it reads the session), but these lists are
// the same for everyone: serve them from the data cache instead of waiting
// on the backend every time.
const PUBLIC_LIST_CACHE = { next: { revalidate: 300 } };

const styles = {
  container: 'flex flex-col gap-4'
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const backendToken = session?.backendToken?.access_token;

  const authHeaders = backendToken
    ? { Authorization: `Bearer ${backendToken}` }
    : undefined;

  const [trendingShowsData, trendingEpisodesData, newEpisodesData, feedEpisodesData, feedQuotesData] =
    await Promise.all([
      safeApi<PaginatedResponse<Podcast>>(
        '/api/v1/podcasts/top-by-views/?timeframe=7d&limit=4',
        { count: 0, next: null, previous: null, results: [] },
        PUBLIC_LIST_CACHE
      ),
      safeApi<PaginatedResponse<Episode>>(
        '/api/v1/episodes/top-by-views/?timeframe=7d&limit=4',
        { count: 0, next: null, previous: null, results: [] },
        PUBLIC_LIST_CACHE
      ),
      safeApi<PaginatedResponse<Episode>>(
        '/api/v1/episodes/?ordering=-release_date&has_content=true&limit=4',
        { count: 0, next: null, previous: null, results: [] },
        PUBLIC_LIST_CACHE
      ),
      backendToken
        ? safeApi<PaginatedResponse<Episode>>(
            '/api/v1/feed/episodes/?limit=9',
            { count: 0, next: null, previous: null, results: [] },
            { headers: authHeaders }
          )
        : Promise.resolve({ count: 0, next: null, previous: null, results: [] } as PaginatedResponse<Episode>),
      backendToken
        ? safeApi<PaginatedResponse<TopicQuote>>(
            '/api/v1/feed/quotes/?limit=18',
            { count: 0, next: null, previous: null, results: [] },
            { headers: authHeaders }
          )
        : Promise.resolve({ count: 0, next: null, previous: null, results: [] } as PaginatedResponse<TopicQuote>),
    ]);

  const trendingShows = trendingShowsData.results || [];
  const trendingEpisodes = (trendingEpisodesData.results || []).map(episode => ({
    ...episode,
    description: sanitize(episode.description)
  }));
  const newEpisodes = (newEpisodesData.results || []).map(episode => ({
    ...episode,
    description: sanitize(episode.description)
  }));
  const feedEpisodes = feedEpisodesData.results || [];
  const feedQuotes = feedQuotesData.results || [];
  const hasPersonalizedFeed = feedEpisodes.length > 0 || feedQuotes.length > 0;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData)
        }}
      />

      <div className={styles.container}>
        <HeroSearch />

        <NewEpisodes>
          {newEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              episodeId={episode.id}
              showName={episode.podcast?.name || ''}
              showSlug={episode.podcast?.slug}
              episodeTitle={episode.title}
              description={episode.description}
              duration={episode.duration || '--:--'}
              date={formatDate(episode.release_date)}
              href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
              imageUrl={episode.podcast?.image_url}
            />
          ))}
        </NewEpisodes>

        <TrendingEpisodes>
          {trendingEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              episodeId={episode.id}
              showName={episode.podcast?.name || ''}
              showSlug={episode.podcast?.slug}
              episodeTitle={episode.title}
              description={episode.description}
              duration={episode.duration || '--:--'}
              date={formatDate(episode.release_date)}
              href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
              imageUrl={episode.podcast?.image_url}
            />
          ))}
        </TrendingEpisodes>

        <TrendingShows>
          {trendingShows.map(show => (
            <ShowCard
              key={show.id}
              title={show.name}
              description={show.description}
              imageUrl={show.image_url}
              categories={show.tags}
              episodeCount={show.episode_count}
              totalViews={show.total_views}
              href={`/shows/${show.slug}`}
            />
          ))}
        </TrendingShows>

        {hasPersonalizedFeed && (
          <PersonalizedFeed episodes={feedEpisodes} quotes={feedQuotes} />
        )}
      </div>
    </>
  );
}
