import HeroSearch from './components/home/HeroSearch';
import TrendingShows from './components/home/TrendingShows';
import TrendingEpisodes from './components/home/TrendingEpisodes';

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSearch />
      <TrendingShows />
      <TrendingEpisodes />
    </div>
  );
}