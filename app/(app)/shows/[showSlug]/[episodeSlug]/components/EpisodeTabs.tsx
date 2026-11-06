import type { Episode } from '@/app/_types';
import SummarySection from './SummarySection';
import ShowNotesSection from './ShowNotesSection';
import TranscriptSection from './TranscriptSection';
import TabNavigation from './TabNavigation';

interface EpisodeTabsProps {
  episode: Episode;
}

export default function EpisodeTabs({ episode }: EpisodeTabsProps) {
  const summaryTab = { id: 'summary', label: 'Summary', content: <SummarySection episode={episode} /> };
  const showNotesTab = {
    id: 'show-notes',
    label: 'Show Notes',
    content: (
      <ShowNotesSection
        contentEncoded={episode.content_encoded}
        description={episode.description}
      />
    ),
  };
  // Open on the show notes when there's no summary to show.
  const hasSummary = Boolean(episode.summary?.trim());

  return (
    <TabNavigation
      tabs={[
        ...(hasSummary ? [summaryTab, showNotesTab] : [showNotesTab, summaryTab]),
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
