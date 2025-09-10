'use client';

import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ShowCard from '../../cards/ShowCard';
import SectionHeader from '../../common/SectionHeader';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
};

// Mock data for demonstration
const trendingShows = [
  {
    id: 1,
    title: "The Daily",
    description: "This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world.",
    imageUrl: "#3B82F6",
    category: "News"
  },
  {
    id: 2,
    title: "Crime Junkie",
    description: "Does hearing about a true crime case always leave you scouring the internet for more information?",
    imageUrl: "#8B5CF6",
    category: "News"
  },
  {
    id: 3,
    title: "Unicorn Girl",
    description: "This is what the news should sound like.",
    imageUrl: "#EC4899",
    category: "News"
  },
  {
    id: 4,
    title: "Good Hang with Amy Poehler",
    description: "Come hang with Amy Poehler. Each week on her podcast, she'll welcome you into her world.",
    imageUrl: "#F59E0B",
    category: "News"
  }
];

export default function TrendingShows() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader 
          icon={faMicrophone} 
          title="Trending Shows" 
        />
        
        <div className={styles.grid}>
          {trendingShows.map((show) => (
            <ShowCard
              key={show.id}
              title={show.title}
              description={show.description}
              imageUrl={show.imageUrl}
              category={show.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}