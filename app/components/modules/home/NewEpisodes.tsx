'use client';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import EpisodeCard from '../../cards/EpisodeCard';
import SectionHeader from '../../common/SectionHeader';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
};

// Mock data for demonstration
const newEpisodes = [
  {
    id: 1,
    showName: "The Daily",
    episodeTitle: "Election 101: What's at Stake",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  },
  {
    id: 2,
    showName: "The Daily",
    episodeTitle: "Election 101: What's at Stake",
    description: "A breakdown of the key issues shaping the national conversation",
    duration: "46m",
    date: "Aug 28, 2025"
  },
  {
    id: 3,
    showName: "The Daily",
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

export default function NewEpisodes() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader 
          icon={faStar} 
          title="New Episodes" 
        />
        
        <div className={styles.grid}>
          {newEpisodes.map((episode) => (
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