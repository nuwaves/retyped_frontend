import type { Episode } from '@/app/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import ContentSection from './ContentSection';

interface SummarySectionProps {
  episode: Episode;
}

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
    </ContentSection>
  );
}