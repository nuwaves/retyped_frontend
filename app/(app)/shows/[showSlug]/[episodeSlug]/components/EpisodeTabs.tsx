import type { Episode } from '@/app/_types';
import SummarySection from './SummarySection';
import ShowNotesSection from './ShowNotesSection';
import TranscriptSection from './TranscriptSection';
import TabNavigation from './TabNavigation';

interface EpisodeTabsProps {
  episode: Episode;
}

export default function EpisodeTabs({ episode }: EpisodeTabsProps) {
  return (
    <TabNavigation
      tabs={[
        { id: 'summary', label: 'Summary', content: <SummarySection episode={episode} /> },
        { id: 'show-notes', label: 'Show Notes', content: <ShowNotesSection description={episode.description} /> },
        {
          id: 'transcript',
          label: 'Transcript',
          content: (
            <TranscriptSection
              transcript={episode.transcript}
              scriptTranscript={episode.script_transcript}
            />
          ),
        },
      ]}
    />
  );
}
