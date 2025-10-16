import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@/app/_lib/icons';
import RequireAuth from '@/app/_components/common/RequireAuth';

export const metadata: Metadata = {
  title: 'Creator Dashboard - Coming Soon | Retyped',
  description: 'Creator dashboard coming soon to Retyped',
};

const styles = {
  container: "min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-12",
  content: "max-w-md w-full text-center",
  iconWrapper: "mb-6 flex justify-center",
  icon: "text-gray-300 text-6xl",
  title: "font-inter font-semibold text-3xl md:text-4xl text-gray-900 mb-3",
  description: "font-inter font-normal text-base text-gray-600 leading-relaxed"
};

export default function CreatorDashboardPage() {
  return (
    <RequireAuth>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
          </div>
          <h1 className={styles.title}>Coming Soon</h1>
          <p className={styles.description}>
            The Creator Dashboard is currently under development. Check back soon for analytics, insights, and tools to grow your podcast.
          </p>
        </div>
      </div>
    </RequireAuth>
  );
}
