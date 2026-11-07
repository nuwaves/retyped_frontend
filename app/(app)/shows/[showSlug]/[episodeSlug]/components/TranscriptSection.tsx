import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@/app/_lib/icons';
import Pill from '@/app/_components/common/Pill';
import ContentSection from './ContentSection';
import RequestContentPanel from './RequestContentPanel';

interface TranscriptEntry {
  timestamp: string;
  speaker: string;
  text: string;
}

interface TranscriptSectionProps {
  transcript?: TranscriptEntry[] | string;
  scriptTranscript?: string;
  episodeSlug: string;
  // False when the episode already has a summary, so there's nothing to request.
  canRequest: boolean;
}

const styles = {
  transcript: "space-y-8",
  transcriptEntry: "flex gap-3 items-center",
  transcriptText: "flex-1 text-base font-normal leading-6 text-gray-700",
  speaker: "text-base font-normal leading-6 text-gray-900",
  empty: "text-sm text-gray-500 py-12 text-center",
};

// Split a plain-text transcript into paragraph blocks
function parseScriptTranscript(script: string): TranscriptEntry[] {
  return script
    .split(/\n\n+/)
    .filter(block => block.trim())
    .map(block => ({
      timestamp: "--:--",
      speaker: "", // No speaker info available
      text: block.trim(),
    }));
}

export default function TranscriptSection({ transcript, scriptTranscript, episodeSlug, canRequest }: TranscriptSectionProps) {
  let fullTranscript: TranscriptEntry[] = [];

  if (scriptTranscript) {
    fullTranscript = parseScriptTranscript(scriptTranscript);
  } else if (Array.isArray(transcript)) {
    fullTranscript = transcript;
  } else if (typeof transcript === 'string') {
    fullTranscript = parseScriptTranscript(transcript);
  }

  return (
    <ContentSection
      title={
        <>
          <FontAwesomeIcon icon={faFileAlt} className="text-gray-400" />
          Transcript
        </>
      }
    >
      {fullTranscript.length > 0 ? (
        <div className={styles.transcript}>
          {fullTranscript.map((entry, index) => (
            <div key={index} className={styles.transcriptEntry}>
              <Pill size="xs" variant="filled">
                {entry.timestamp}
              </Pill>
              <div className={styles.transcriptText}>
                {entry.speaker && <span className={styles.speaker}>{entry.speaker}:</span>} {entry.text}
              </div>
            </div>
          ))}
        </div>
      ) : canRequest ? (
        <RequestContentPanel episodeSlug={episodeSlug} kind="transcript" />
      ) : (
        <p className={styles.empty}>No transcript available for this episode yet.</p>
      )}
    </ContentSection>
  );
}
