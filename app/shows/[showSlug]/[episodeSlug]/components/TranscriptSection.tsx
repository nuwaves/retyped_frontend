import Link from 'next/link';
import Button from '@/app/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import Pill from '@/app/components/common/Pill';
import ContentSection from './ContentSection';

interface TranscriptEntry {
  timestamp: string;
  speaker: string;
  text: string;
}

interface TranscriptSectionProps {
  transcript?: TranscriptEntry[] | string;
  scriptTranscript?: string;
  isAuthenticated: boolean;
}

const styles = {
  container: "relative",
  transcript: "space-y-8",
  transcriptEntry: "flex gap-3 items-center",
  transcriptText: "flex-1 text-base font-normal leading-6 text-gray-700",
  speaker: "text-base font-normal leading-6 text-gray-900",
  blurredSection: "relative",
  blurredContent: "blur-[3px] select-none pointer-events-none",
  overlay: "absolute inset-0 bg-gradient-to-b from-transparent from-0% via-white/40 via-30% to-white to-50% flex items-end justify-center pb-20",
  authPrompt: "text-center w-full px-6",
  lockIcon: "text-gray-400 text-sm mb-4",
  authTitle: "text-sm font-normal leading-[22px] mb-2 text-gray-900",
  authDescription: "text-sm font-normal leading-[22px] text-gray-600 mb-6",
  authButtons: "flex gap-4 justify-center"
};

export default function TranscriptSection({ transcript, scriptTranscript, isAuthenticated }: TranscriptSectionProps) {
  // Parse script_transcript into blocks
  const parseScriptTranscript = (script: string | undefined): TranscriptEntry[] => {
    if (!script) return [];

    // Split by double newlines to get paragraphs/blocks
    const blocks = script.split(/\n\n+/).filter(block => block.trim());

    return blocks.map(block => ({
      timestamp: "--:--",
      speaker: "",  // No speaker info available
      text: block.trim()
    }));
  };

  // Use script_transcript if available, otherwise try to parse transcript
  let fullTranscript: TranscriptEntry[] = [];

  if (scriptTranscript) {
    fullTranscript = parseScriptTranscript(scriptTranscript);
  } else if (Array.isArray(transcript)) {
    fullTranscript = transcript;
  } else if (typeof transcript === 'string') {
    // If transcript is a string, split it into blocks
    fullTranscript = parseScriptTranscript(transcript);
  }
  
  if (!isAuthenticated) {
    return (
      <ContentSection 
        title={
          <>
            <FontAwesomeIcon icon={faFileAlt} className="text-gray-400" />
            Transcript
          </>
        }
        paddingBottom="pb-32"
      >
        <div className={styles.container}>
          <div className={styles.blurredSection}>
          <div className={styles.blurredContent}>
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
          </div>
          
          <div className={styles.overlay}>
            <div className={styles.authPrompt}>
              <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
              <h3 className={styles.authTitle}>Full transcript requires sign up</h3>
              <p className={styles.authDescription}>
                Get access to the complete transcript, episode notes, and exclusive content by signing up.
              </p>
              <div className={styles.authButtons}>
                <Link href="/signup">
                  <Button variant="primary" size="md">Sign Up for Free</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="md">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </ContentSection>
    );
  }
  
  return (
    <ContentSection 
      title={
        <>
          <FontAwesomeIcon icon={faFileAlt} className="text-gray-400" />
          Transcript
        </>
      }
      paddingBottom="pb-32"
    >
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
    </ContentSection>
  );
}