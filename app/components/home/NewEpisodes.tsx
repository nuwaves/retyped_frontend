'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import EpisodeCard from '../cards/EpisodeCard';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  header: "flex items-center justify-between mb-8",
  titleSection: "flex items-center gap-3",
  icon: "text-xl",
  title: "text-2xl font-bold text-black",
  viewAll: "text-sm font-medium text-black flex items-center",
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
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            <h2 className={styles.title}>New Episodes</h2>
          </div>
          <a href="#" className={styles.viewAll}>
            View all <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs" />
          </a>
        </div>
        
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