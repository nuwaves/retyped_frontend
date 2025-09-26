import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../../common/SectionHeader';
import { ReactNode } from 'react';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
};

interface TrendingShowsProps {
  children: ReactNode;
}

export default function TrendingShows({ children }: TrendingShowsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader
          icon={faMicrophone}
          title="Trending Shows"
          viewAllLink="/trending-shows"
        />

        <div className={styles.grid}>
          {children}
        </div>
      </div>
    </section>
  );
}