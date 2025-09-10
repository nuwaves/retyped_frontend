import type { Episode } from '@/app/lib/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

interface SummarySectionProps {
  episode: Episode;
}

const styles = {
  summaryContent: "prose max-w-none bg-white rounded-lg p-6",
  summaryTitle: "flex items-center gap-3 text-2xl font-bold leading-tight mb-4",
  summaryText: "text-gray-700 leading-relaxed mb-4",
  guestsSection: "mt-6",
  guestsTitle: "text-lg font-semibold mb-2",
  guestsList: "list-disc list-inside",
  guestItem: "text-gray-700"
};

export default function SummarySection({ episode }: SummarySectionProps) {
  return (
    <div className={styles.summaryContent}>
      <h2 className={styles.summaryTitle}>
        <FontAwesomeIcon icon={faQuoteLeft} className="text-gray-400" />
        Summary
      </h2>
      <p className={styles.summaryText}>
        {episode.description}
      </p>
      {episode.summary && (
        <p className={styles.summaryText}>
          {episode.summary}
        </p>
      )}
      {episode.guests && episode.guests.length > 0 && (
        <div className={styles.guestsSection}>
          <h3 className={styles.guestsTitle}>Guests</h3>
          <ul className={styles.guestsList}>
            {episode.guests.map((guest, index) => (
              <li key={index} className={styles.guestItem}>{guest}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}