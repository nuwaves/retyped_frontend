import type { Episode } from '@/app/lib/mockData';
import TabNavigation from './TabNavigation';
import TranscriptSection from './TranscriptSection';

interface EpisodeTabsProps {
  episode: Episode;
  isAuthenticated: boolean;
}

const styles = {
  container: "mt-8",
  summaryContent: "prose max-w-none",
  summaryText: "text-gray-700 leading-relaxed mb-4"
};

export default function EpisodeTabs({ episode, isAuthenticated }: EpisodeTabsProps) {
  const summaryContent = (
    <div className={styles.summaryContent}>
      <p className={styles.summaryText}>
        {episode.description}
      </p>
      {episode.summary && (
        <p className={styles.summaryText}>
          {episode.summary}
        </p>
      )}
      {episode.guests && episode.guests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Guests</h3>
          <ul className="list-disc list-inside">
            {episode.guests.map((guest, index) => (
              <li key={index} className="text-gray-700">{guest}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const transcriptContent = (
    <TranscriptSection 
      transcript={episode.transcript} 
      isAuthenticated={isAuthenticated} 
    />
  );

  return (
    <div className={styles.container}>
      <TabNavigation
        summaryContent={summaryContent}
        transcriptContent={transcriptContent}
      />
    </div>
  );
}