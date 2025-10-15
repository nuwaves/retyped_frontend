import { faStar } from '@/app/_lib/icons';
import SectionHeader from '../../common/SectionHeader';
import { ReactNode } from 'react';

const styles = {
  container: "w-full py-4",
  wrapper: "max-w-7xl mx-auto px-3 lg:px-4",
  scrollContainer: "flex lg:grid lg:grid-cols-4 gap-2 lg:gap-6 overflow-x-scroll lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-hide pb-2",
  card: "min-w-[320px] max-w-[320px] lg:min-w-0 lg:max-w-none flex-shrink-0 lg:flex-shrink snap-start lg:snap-align-none px-2 lg:px-0"
};

interface NewEpisodesProps {
  children: ReactNode;
}

export default function NewEpisodes({ children }: NewEpisodesProps) {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader
          icon={faStar}
          title="New Episodes"
          viewAllLink="/new-episodes"
        />

        <div className={styles.scrollContainer}>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index} className={styles.card}>
                  {child}
                </div>
              ))
            : <div className={styles.card}>{children}</div>
          }
        </div>
      </div>
    </section>
  );
}