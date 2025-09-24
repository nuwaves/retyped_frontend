import type { Episode } from '@/app/types';
import TabNavigation from './TabNavigation';
import SummarySection from './SummarySection';
import TranscriptSection from './TranscriptSection';

interface EpisodeTabsProps {
  episode: Episode;
  isAuthenticated: boolean;
}

const styles = {
  container: "mt-8"
};

export default function EpisodeTabs({ episode, isAuthenticated }: EpisodeTabsProps) {
  const summaryContent = <SummarySection episode={episode} />;
  
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