import type { Episode } from '@/app/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faClockRotateLeft } from '@/app/_lib/icons';
import ReactMarkdown from 'react-markdown';
import ContentSection from './ContentSection';

interface SummarySectionProps {
  episode: Episode;
}

const styles = {
  emptyState: "flex flex-col items-center justify-center py-12 text-center",
  emptyIcon: "text-gray-300 text-4xl mb-4",
  emptyTitle: "text-lg font-semibold text-gray-700 mb-2",
  emptyText: "text-sm text-gray-500 max-w-md"
};

export default function SummarySection({ episode }: SummarySectionProps) {
  const hasSummary = episode.summary && episode.summary.trim().length > 0;

  return (
    <ContentSection
      title={
        <>
          <FontAwesomeIcon icon={faQuoteLeft} className="text-gray-400" />
          Summary
        </>
      }
    >
      {hasSummary ? (
        <div>
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="font-inter text-base leading-6 font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
              h2: ({children}) => <h2 className="font-inter text-base leading-6 font-semibold text-gray-800 mb-4 mt-6">{children}</h2>,
              h3: ({children}) => <h3 className="font-inter text-base leading-6 font-medium text-gray-700 mb-3 mt-4">{children}</h3>,
              p: ({children}) => <p className="font-inter text-base leading-6 text-gray-700 mt-6">{children}</p>,
              strong: ({children}) => <strong className="font-inter font-bold text-gray-900">{children}</strong>,
              em: ({children}) => <em className="font-inter italic text-gray-700">{children}</em>,
              ul: ({children}) => <ul className="font-inter text-base leading-6 list-disc list-inside space-y-3 mb-6 mt-4 ml-4">{children}</ul>,
              ol: ({children}) => <ol className="font-inter text-base leading-6 list-decimal list-inside space-y-3 mb-6 mt-4 ml-4">{children}</ol>,
              li: ({children}) => <li className="font-inter text-base leading-6 text-gray-700 marker:text-gray-600">{children}</li>,
            }}
          >
            {episode.summary}
          </ReactMarkdown>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <FontAwesomeIcon icon={faClockRotateLeft} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>Summary Coming Soon</h3>
          <p className={styles.emptyText}>
            We're working on generating an AI-powered summary for this episode. Check back soon for key insights and takeaways.
          </p>
        </div>
      )}
    </ContentSection>
  );
}