import HeroSearch from './components/modules/home/HeroSearch';
import TrendingShows from './components/modules/home/TrendingShows';
import TrendingEpisodes from './components/modules/home/TrendingEpisodes';
import NewEpisodes from './components/modules/home/NewEpisodes';
import ShowCard from './components/cards/ShowCard';
import EpisodeCard from './components/cards/EpisodeCard';
import { Episode, Podcast, PaginatedResponse } from './types';
import { formatDate, formatDuration } from './utils/formatters';
import { safeApi } from './lib/api';

export const dynamic = 'force-dynamic';

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
      '/api/v1/episodes/?limit=4',
      { count: 0, next: null, previous: null, results: [] }
    ),
  ]);

  const trendingShows = trendingShowsData.results || [];
  const trendingEpisodes = trendingEpisodesData.results || [];
  const newEpisodes = newEpisodesData.results || [];

  return (
    <div className="flex flex-col gap-12">
      <HeroSearch />

      <TrendingShows>
        {trendingShows.map(show => (
          <ShowCard
            key={show.id}
            title={show.name}
            description={show.description}
            imageUrl={show.image_url || ''}
            category={show.tags?.[0]?.name || 'Podcast'}
            href={`/shows/${show.slug}`}
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