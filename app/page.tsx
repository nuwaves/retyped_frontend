import HeroSearch from './components/modules/home/HeroSearch';
import TrendingShows from './components/modules/home/TrendingShows';
import TrendingEpisodes from './components/modules/home/TrendingEpisodes';
import NewEpisodes from './components/modules/home/NewEpisodes';
import ShowCard from './components/cards/ShowCard';
import EpisodeCard from './components/cards/EpisodeCard';
import { Episode, Podcast, PaginatedResponse } from './types';
import { formatDate, formatDuration } from './utils/formatters';
import { safeApi } from './lib/api';

export default async function Home() {
  // Debug info for production
  const debugInfo: {
    env: Record<string, string | undefined>;
    errors: Array<{ endpoint: string; error: string }>;
  } = {
    env: {
      DJANGO_BACKEND: process.env.DJANGO_BACKEND ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    },
    errors: []
  };

  // Fetch all data in parallel with error handling
  const [trendingShows, trendingEpisodes, newEpisodesData] = await Promise.all([
    safeApi<Podcast[]>(
      '/api/v1/podcasts/top-by-views/?timeframe=all',
      []
    ).catch(err => {
      debugInfo.errors.push({ endpoint: 'trending-shows', error: err.message });
      return [];
    }),
    safeApi<Episode[]>(
      '/api/v1/episodes/top-by-views/?timeframe=7d',
      []
    ).catch(err => {
      debugInfo.errors.push({ endpoint: 'trending-episodes', error: err.message });
      return [];
    }),
    safeApi<PaginatedResponse<Episode>>(
      '/api/v1/episodes/?limit=4',
      { count: 0, next: null, previous: null, results: [] }
    ).catch(err => {
      debugInfo.errors.push({ endpoint: 'new-episodes', error: err.message });
      return { count: 0, next: null, previous: null, results: [] };
    }),
  ]);

  const newEpisodes = newEpisodesData.results || [];

  return (
    <div className="flex flex-col gap-12">
      {/* Debug info - REMOVE IN PRODUCTION */}
      {process.env.NODE_ENV !== 'production' || debugInfo.errors.length > 0 ? (
        <div style={{
          background: '#fee',
          border: '1px solid #f00',
          padding: '1rem',
          margin: '1rem',
          borderRadius: '8px'
        }}>
          <h3>Debug Info (Remove this in production)</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          <p>Data counts: Shows={trendingShows.length}, Episodes={trendingEpisodes.length}, New={newEpisodes.length}</p>
        </div>
      ) : null}

      <HeroSearch />

      <TrendingShows>
        {trendingShows.map(show => (
          <ShowCard
            key={show.id}
            title={show.name}
            description={show.description}
            imageUrl={show.image_url || ''}
            category={show.tags?.[0]?.name || 'Podcast'}
          />
        ))}
      </TrendingShows>

      <TrendingEpisodes>
        {trendingEpisodes.map(episode => (
          <EpisodeCard
            key={episode.id}
            showName={episode.podcast?.name || ''}
            episodeTitle={episode.title}
            description={episode.description}
            duration={formatDuration(null)}
            date={formatDate(episode.release_date)}
          />
        ))}
      </TrendingEpisodes>

      <NewEpisodes>
        {newEpisodes.map(episode => (
          <EpisodeCard
            key={episode.id}
            showName={episode.podcast?.name || ''}
            episodeTitle={episode.title}
            description={episode.description}
            duration={formatDuration(null)}
            date={formatDate(episode.release_date)}
          />
        ))}
      </NewEpisodes>
    </div>
  );
}