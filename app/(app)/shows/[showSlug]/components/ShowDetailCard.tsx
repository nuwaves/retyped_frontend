import type { Podcast } from '@/app/_types';
import { ensureHttps } from '@/app/_utils/imageUrl';
import OptimizedImage from '@/app/_components/common/OptimizedImage';
import ShowStats from './ShowStats';
import ShowTags from './ShowTags';
import ShowDescription from './ShowDescription';

interface ShowDetailCardProps {
  show: Podcast;
  children?: React.ReactNode;
}

const styles = {
  container: "bg-white rounded-lg overflow-hidden",
  wrapper: "grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr] gap-3 md:gap-6 p-4 md:p-6",
  imageContainer: "row-span-1 md:row-span-3",
  image: "w-24 h-24 md:w-72 md:h-72 object-cover rounded-lg",
  headerContent: "flex flex-col gap-2 md:gap-4",
  titleWrapper: "flex flex-col gap-1",
  title: "text-xl md:text-[40px] font-bold text-black leading-[150%] tracking-normal lining-nums proportional-nums",
  descriptionWrapper: "col-span-2 md:col-span-1 flex flex-col gap-3"
};

export default function ShowDetailCard({ show, children }: ShowDetailCardProps) {
  const secureImageUrl = ensureHttps(show.image_url);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <OptimizedImage
          src={secureImageUrl}
          alt={show.name}
          width={288}
          height={288}
          sizes="(max-width: 768px) 96px, 288px"
          className={styles.image}
          containerClassName={styles.imageContainer}
          priority
        />

        <div className={styles.headerContent}>
          <ShowTags tags={show.tags} />

          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{show.name}</h1>
          </div>
        </div>

        <div className={styles.descriptionWrapper}>
          <ShowDescription description={show.description} />
          <ShowStats />
          {children}
        </div>
      </div>
    </div>
  );
}