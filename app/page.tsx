import HeroSearch from './components/modules/home/HeroSearch';
import TrendingShows from './components/modules/home/TrendingShows';
import TrendingEpisodes from './components/modules/home/TrendingEpisodes';
import NewEpisodes from './components/modules/home/NewEpisodes';

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSearch />
      <TrendingShows />
      <TrendingEpisodes />
      <NewEpisodes />
    </div>
  );
}