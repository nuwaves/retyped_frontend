import type { Episode } from '@/app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import ContentSection from './ContentSection';

interface SummarySectionProps {
  episode: Episode;
}

const styles = {
  summaryText: "text-gray-700 leading-relaxed mb-4",
  guestsSection: "mt-6",
  guestsTitle: "text-lg font-semibold mb-2",
  guestsList: "list-disc list-inside",
  guestItem: "text-gray-700"
};

export default function SummarySection({ episode }: SummarySectionProps) {
  return (
    <ContentSection
      title={
        <>
          <FontAwesomeIcon icon={faQuoteLeft} className="text-gray-400" />
          Summary
        </>
      }
    >
      <div className="prose max-w-none">
        {episode.summary ? (
          <p className={styles.summaryText}>
            {episode.summary}
          </p>
        ) : (
          <p className={styles.summaryText}>
            {episode.description}
          </p>
        )}
      </div>
    </ContentSection>
  );
}