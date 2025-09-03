'use client';

import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import EpisodeCard from '../cards/EpisodeCard';
import SectionHeader from '../common/SectionHeader';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
};

// Mock data for demonstration
const trendingEpisodes = [
  {
    id: 1,
    showName: "Tech Brew Ride Home",
    episodeTitle: "Now Meta Has Frozen AI Hiring and Is Restructuring Its Engineering Teams Across Multiple Divisions Including Reality Labs and Infrastructure",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  },
  {
    id: 2,
    showName: "Tech Brew Ride Home",
    episodeTitle: "The Pixel 10 Smartphone Update",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  },
  {
    id: 3,
    showName: "Good Hang with Amy Poehler",
    episodeTitle: "Election 101: What's at Stake",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  },
  {
    id: 4,
    showName: "The Daily",
    episodeTitle: "Election 101: What's at Stake",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  }
];

export default function TrendingEpisodes() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader 
          icon={faChartLine} 
          title="Trending Episodes (TBD)" 
        />
        
        <div className={styles.grid}>
          {trendingEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              showName={episode.showName}
              episodeTitle={episode.episodeTitle}
              description={episode.description}
              duration={episode.duration}
              date={episode.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}