import type { Episode } from '@/app/_types';
import SummarySection from './SummarySection';
import TranscriptSection from './TranscriptSection';
import TabNavigationWrapper from './TabNavigationWrapper';

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
      scriptTranscript={episode.script_transcript}
      isAuthenticated={isAuthenticated}
    />
  );

  return (
    <div className={styles.container}>
      <TabNavigationWrapper
        summaryContent={summaryContent}
        transcriptContent={transcriptContent}
      />
    </div>
  );
}