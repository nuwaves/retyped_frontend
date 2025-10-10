'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/app/_components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import Pill from '@/app/_components/common/Pill';
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
  container: "relative -mx-6 -mb-6 px-6",
  transcript: "space-y-8",
  transcriptEntry: "flex gap-3 items-center",
  transcriptText: "flex-1 text-base font-normal leading-6 text-gray-700",
  speaker: "text-base font-normal leading-6 text-gray-900",
  gradualBlurSection: "relative select-none pointer-events-none pb-6",
  gradualBlurContent: "relative",
  fadeOverlay: "absolute inset-0 bg-gradient-to-b from-transparent from-[20%] via-white/30 via-[60%] to-white pointer-events-none",
  authPrompt: "text-center w-full px-6 pb-6 pt-6",
  lockIcon: "text-gray-400 text-sm mb-4",
  authTitle: "text-sm font-normal leading-[22px] mb-2 text-gray-900",
  authDescription: "text-sm font-normal leading-[22px] text-gray-600 mb-6",
  authButtons: "flex gap-4 justify-center"
};

export default function TranscriptSection({ transcript, scriptTranscript, isAuthenticated }: TranscriptSectionProps) {
  const pathname = usePathname();
  const CHARACTER_LIMIT = 500;

  // Parse script_transcript into blocks
  const parseScriptTranscript = (script: string | undefined): TranscriptEntry[] => {
    if (!script) return [];

    let textToUse = script;

    // Limit text for non-authenticated users
    if (!isAuthenticated && script.length > CHARACTER_LIMIT) {
      textToUse = script.substring(0, CHARACTER_LIMIT) + '...';
    }

    // Split by double newlines to get paragraphs/blocks
    const blocks = textToUse.split(/\n\n+/).filter(block => block.trim());

    return blocks.map(block => ({
      timestamp: "--:--",
      speaker: "",  // No speaker info available
      text: block.trim()
    }));
  };

  let fullTranscript: TranscriptEntry[] = [];

  if (scriptTranscript) {
    fullTranscript = parseScriptTranscript(scriptTranscript);
  } else if (Array.isArray(transcript)) {
    fullTranscript = transcript;
  } else if (typeof transcript === 'string') {
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
      >
        <div className={styles.container}>
          <div className={styles.gradualBlurSection}>
            <div className={styles.gradualBlurContent}>
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
            <div className={styles.fadeOverlay} />
          </div>

          <div className={styles.authPrompt}>
            <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
            <h3 className={styles.authTitle}>Full transcript requires sign up</h3>
            <p className={styles.authDescription}>
              Get access to the complete transcript, episode notes, and exclusive content by signing up.
            </p>
            <div className={styles.authButtons}>
              <Link href={`/signup?callbackUrl=${encodeURIComponent(pathname)}`}>
                <Button variant="primary" size="md">Sign Up for Free</Button>
              </Link>
              <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                <Button variant="outline" size="md">Log In</Button>
              </Link>
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