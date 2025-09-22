import Pill from '@/app/components/common/Pill';
import Button from '@/app/components/common/Button';

interface ShowCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const styles = {
  card: "flex flex-col h-full rounded-md overflow-hidden",
  imageContainer: "relative w-full aspect-square bg-gray-200",
  image: "w-full h-full object-cover",
  contentWrapper: "flex flex-col flex-grow bg-white px-4 pt-4 pb-10 gap-2",
  title: "text-md font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums mb-2",
  description: "text-sm text-gray-600 mb-4 line-clamp-2",
  buttonWrapper: "mt-auto"
};

export default function ShowCard({ title, description, imageUrl, category }: ShowCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Placeholder for image - will be replaced with actual images */}
        <div className={styles.image} style={{ backgroundColor: imageUrl || '#e5e7eb' }} />
      </div>
      
      <div className={styles.contentWrapper}>
        <div className="mb-2">
          <Pill size="xs" variant="outline">
            {category}
          </Pill>
        </div>
        
        <h3 className={styles.title}>{title}</h3>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.buttonWrapper}>
          <Button variant="primary" size="md" fullWidth>
            Explore Show
          </Button>
        </div>
      </div>
    </div>
  );
}