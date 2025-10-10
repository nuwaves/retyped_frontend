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
  container: "relative -mx-6 -mb-6 px-6 pb-32",
  transcript: "space-y-8",
  transcriptEntry: "flex gap-3 items-center",
  transcriptText: "flex-1 text-base font-normal leading-6 text-gray-700",
  speaker: "text-base font-normal leading-6 text-gray-900",
  gradualBlurSection: "relative select-none pointer-events-none pb-6",
  gradualBlurContent: "relative max-h-24 overflow-hidden",
  blurOverlay: "absolute -inset-x-6 inset-y-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_10%,black_50%,black_100%)] pointer-events-none",
  fadeOverlay: "absolute -inset-x-6 inset-y-0 bg-gradient-to-b from-transparent from-[10%] via-white/50 via-[40%] to-white pointer-events-none",
  authPrompt: "absolute left-0 right-0 top-16 text-center w-full mx-auto max-w-md z-10 pointer-events-auto px-6",
  lockIcon: "text-gray-400 text-4xl mb-6",
  authTitle: "text-sm font-normal leading-[22px] mb-2 text-gray-900",
  authDescription: "text-sm font-normal leading-[22px] text-gray-600 mb-6",
  authButtons: "flex gap-4 justify-center"
};

export default function TranscriptSection({ transcript, scriptTranscript, isAuthenticated }: TranscriptSectionProps) {
  const pathname = usePathname();
  const CHARACTER_LIMIT = 200;

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
            <div className={styles.blurOverlay} />
            <div className={styles.fadeOverlay} />
          </div>

          <div className={styles.authPrompt}>
            <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
            <h3 className={styles.authTitle}>Transcript requires login</h3>
            <div className={styles.authButtons}>
              <Link href={`/auth?callbackUrl=${encodeURIComponent(pathname)}`}>
                <Button variant="primary" size="md">Sign In / Sign Up</Button>
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