import HeroSearch from './components/modules/home/HeroSearch';
import TrendingShows from './components/modules/home/TrendingShows';
import TrendingEpisodes from './components/modules/home/TrendingEpisodes';
import NewEpisodes from './components/modules/home/NewEpisodes';
import ShowCard from './components/cards/ShowCard';
import EpisodeCard from './components/cards/EpisodeCard';
import { Episode, Podcast, PaginatedResponse } from './types';
import { formatDate, formatDuration } from './utils/formatters';
import { api } from './lib/api';

export default async function Home() {
  // TEMPORARY DEBUG - Remove after finding the issue
  const errors: string[] = [];
  let trendingShowsData: PaginatedResponse<Podcast> = { count: 0, next: null, previous: null, results: [] };
  let trendingEpisodesData: PaginatedResponse<Episode> = { count: 0, next: null, previous: null, results: [] };
  let newEpisodesData: PaginatedResponse<Episode> = { count: 0, next: null, previous: null, results: [] };

  try {
    trendingShowsData = await api<PaginatedResponse<Podcast>>(
      '/api/v1/podcasts/top-by-views/?timeframe=all&limit=4'
    );
  } catch (error) {
    errors.push(`Shows: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    trendingEpisodesData = await api<PaginatedResponse<Episode>>(
      '/api/v1/episodes/top-by-views/?timeframe=7d&limit=4'
    );
  } catch (error) {
    errors.push(`Trending: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    newEpisodesData = await api<PaginatedResponse<Episode>>(
      '/api/v1/episodes/?limit=4'
    );
  } catch (error) {
    errors.push(`New: ${error instanceof Error ? error.message : String(error)}`);
  }
  // END TEMPORARY DEBUG

  // ORIGINAL CODE - Commented temporarily
  // const [trendingShowsData, trendingEpisodesData, newEpisodesData] = await Promise.all([
  //   safeApi<PaginatedResponse<Podcast>>(
  //     '/api/v1/podcasts/top-by-views/?timeframe=all&limit=4',
  //     { count: 0, next: null, previous: null, results: [] }
  //   ),
  //   safeApi<PaginatedResponse<Episode>>(
  //     '/api/v1/episodes/top-by-views/?timeframe=7d&limit=4',
  //     { count: 0, next: null, previous: null, results: [] }
  //   ),
  //   safeApi<PaginatedResponse<Episode>>(
  //     '/api/v1/episodes/?limit=4',
  //     { count: 0, next: null, previous: null, results: [] }
  //   ),
  // ]);

  const trendingShows = trendingShowsData.results || [];
  const trendingEpisodes = trendingEpisodesData.results || [];
  const newEpisodes = newEpisodesData.results || [];

  return (
    <div className="flex flex-col gap-12">
      {/* TEMPORARY ERROR DISPLAY */}
      {errors.length > 0 && (
        <div style={{
          background: '#ff0000',
          color: 'white',
          padding: '20px',
          margin: '10px',
          borderRadius: '8px'
        }}>
          <h2>API Errors Detected:</h2>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <p>Backend URL: {process.env.DJANGO_BACKEND || 'NOT SET'}</p>
        </div>
      )}

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