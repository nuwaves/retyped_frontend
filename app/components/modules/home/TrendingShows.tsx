'use client';

import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ShowCard from '../../cards/ShowCard';
import SectionHeader from '../../common/SectionHeader';
import { useGetTopPodcastsQuery } from '@/app/store/services/podcastsApi';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
};


export default function TrendingShows() {
  const { data: trendingPodcasts = [], isLoading: loading, error } = useGetTopPodcastsQuery({ timeframe: 'all' });

  const shows = trendingPodcasts.slice(0, 4).map(podcast => ({
    id: podcast.id,
    title: podcast.name,
    description: podcast.description || 'No description available',
    imageUrl: podcast.image_url || `#${Math.floor(Math.random()*16777215).toString(16)}`,
    category: podcast.tags?.[0]?.name || 'General'
  }));

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader 
          icon={faMicrophone} 
          title="Trending Shows" 
        />
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading trending shows...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load trending shows.</p>
          </div>
        )}
        
        {!loading && !error && shows.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No trending shows available.</p>
          </div>
        )}
        
        {shows.length > 0 && (
          <div className={styles.grid}>
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                title={show.title}
                description={show.description}
                imageUrl={show.imageUrl}
                category={show.category}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}