'use client';

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
  contentWrapper: "flex flex-col flex-grow bg-white p-4",
  categoryChip: "inline-block px-6 py-0.5 text-[10px] font-normal border border-black text-black rounded-full leading-[155%] mb-2 w-fit font-[family-name:var(--font-open-sans)]",
  title: "text-md font-bold leading-[115%] tracking-normal align-middle lining-nums proportional-nums mb-2",
  description: "text-sm text-gray-600 mb-4 line-clamp-2",
  buttonWrapper: "mt-auto",
  button: "w-full py-2.5 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
};

export default function ShowCard({ title, description, imageUrl, category }: ShowCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Placeholder for image - will be replaced with actual images */}
        <div className={styles.image} style={{ backgroundColor: imageUrl || '#e5e7eb' }} />
      </div>
      
      <div className={styles.contentWrapper}>
        <span className={styles.categoryChip}>{category}</span>
        
        <h3 className={styles.title}>{title}</h3>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.buttonWrapper}>
          <button className={styles.button}>
            Explore Show
          </button>
        </div>
      </div>
    </div>
  );
}