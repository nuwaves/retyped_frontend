import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@/app/_lib/icons';
import Pill from '@/app/_components/common/Pill';
import ContentSection from './ContentSection';
import RequestContentPanel from './RequestContentPanel';

interface TranscriptEntry {
  timestamp?: string;
  speaker: string;
  text: string;
  // A bracketed aside such as "[Music plays]", not something anyone said.
  note?: boolean;
}

interface TranscriptSectionProps {
  transcript?: TranscriptEntry[] | string;
  scriptTranscript?: string;
  episodeSlug: string;
  // False when the episode already has a summary, so there's nothing to request.
  canRequest: boolean;
}

const styles = {
  transcript: "space-y-5",
  timedEntry: "flex gap-3 items-start",
  speaker: "text-sm font-semibold leading-5 text-gray-900 mb-1",
  text: "text-base font-normal leading-7 text-gray-700",
  note: "text-sm italic leading-6 text-gray-500",
  empty: "text-sm text-gray-500 py-12 text-center",
};

// "Sophia Du: ..." opening a paragraph.
const SPEAKER_LABEL = /^([^:\n]{1,60}):\s+/;
// One to four capitalized words: "Host", "Speaker 2", "Anish Acharya".
const NAME_LIKE = /^[A-Z0-9][\w.'’-]*(?:\s+[A-Z0-9][\w.'’-]*){0,3}$/;
const LONG_BLOCK_CHARS = 1200;
const PARAGRAPH_CHARS = 600;

// Speech-to-text transcripts can arrive as one unbroken block. Break long
// blocks into paragraphs of a few sentences so they can be read.
function splitLongBlock(text: string): string[] {
  if (text.length <= LONG_BLOCK_CHARS) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g);
  if (!sentences) return [text];
  const paragraphs: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    current += sentence;
    if (current.length >= PARAGRAPH_CHARS) {
      paragraphs.push(current.trim());
      current = '';
    }
  }
  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

// Turn a plain-text transcript into entries: who is speaking (shown once per
// turn), their paragraphs, and bracketed asides.
function parseScriptTranscript(script: string): TranscriptEntry[] {
  const blocks = script
    .split(/\n\n+/)
    .map(block => block.trim())
    .filter(Boolean);

  // A sentence with a colon near its start ("Flip side: ...") looks like a
  // speaker label. Real labels repeat or look like a name.
  const labelCounts = new Map<string, number>();
  for (const block of blocks) {
    const label = SPEAKER_LABEL.exec(block)?.[1];
    if (label && !label.startsWith('[')) {
      labelCounts.set(label, (labelCounts.get(label) || 0) + 1);
    }
  }

  const entries: TranscriptEntry[] = [];
  let lastSpeaker = '';
  for (const block of blocks) {
    if (/^\[[^\]]*\]$/.test(block)) {
      entries.push({ speaker: '', text: block.slice(1, -1).trim(), note: true });
      continue;
    }
    const match = SPEAKER_LABEL.exec(block);
    const label = match?.[1] ?? '';
    const isSpeaker =
      Boolean(label) &&
      !label.startsWith('[') &&
      ((labelCounts.get(label) || 0) >= 2 || NAME_LIKE.test(label));
    const speaker = isSpeaker ? label : '';
    const text = isSpeaker && match ? block.slice(match[0].length) : block;
    splitLongBlock(text).forEach((paragraph, index) => {
      // Name the speaker once per turn, not on every paragraph.
      const showSpeaker = index === 0 && speaker !== '' && speaker !== lastSpeaker;
      entries.push({ speaker: showSpeaker ? speaker : '', text: paragraph });
    });
    if (speaker) lastSpeaker = speaker;
  }
  return entries;
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
          {fullTranscript.map((entry, index) =>
            entry.note ? (
              <p key={index} className={styles.note}>{entry.text}</p>
            ) : entry.timestamp ? (
              <div key={index} className={styles.timedEntry}>
                <Pill size="xs" variant="filled">
                  {entry.timestamp}
                </Pill>
                <div className="flex-1">
                  {entry.speaker && <p className={styles.speaker}>{entry.speaker}</p>}
                  <p className={styles.text}>{entry.text}</p>
                </div>
              </div>
            ) : (
              <div key={index}>
                {entry.speaker && <p className={styles.speaker}>{entry.speaker}</p>}
                <p className={styles.text}>{entry.text}</p>
              </div>
            )
          )}
        </div>
      ) : canRequest ? (
        <RequestContentPanel episodeSlug={episodeSlug} kind="transcript" />
      ) : (
        <p className={styles.empty}>No transcript available for this episode yet.</p>
      )}
    </ContentSection>
  );
}
