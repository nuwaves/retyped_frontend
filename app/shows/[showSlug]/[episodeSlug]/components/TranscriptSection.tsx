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

export default function TranscriptSection({ transcript, isAuthenticated }: TranscriptSectionProps) {
  const defaultTranscript: TranscriptEntry[] = [
    {
      timestamp: "00:00",
      speaker: "Host",
      text: "Welcome to today's episode where we dive deep into the case that shocked the community."
    },
    {
      timestamp: "00:15",
      speaker: "Host",
      text: "The story begins on a seemingly ordinary day in Rochester, New York. Wendy Jerome, a vibrant teenager with her whole life ahead of her, left her home to deliver a birthday card to her best friend. It was a simple errand, one that should have taken no more than an hour."
    },
    {
      timestamp: "00:42",
      speaker: "Host",
      text: "But Wendy never made it to her friend's house. What followed was a decades-long investigation that would test the limits of forensic science and the determination of law enforcement."
    },
    {
      timestamp: "01:05",
      speaker: "Detective Sarah Martinez",
      text: "This case haunted our department for years. Every detective who worked on it carried the weight of finding justice for Wendy."
    },
    {
      timestamp: "01:20",
      speaker: "Host",
      text: "The initial investigation faced numerous challenges. Technology limitations of the time meant that crucial evidence couldn't be fully analyzed. Witnesses were scarce, and leads quickly went cold."
    },
    {
      timestamp: "01:45",
      speaker: "Host",
      text: "It wasn't until advances in DNA technology that investigators got their first real break. The evidence that had been carefully preserved for decades could finally reveal its secrets."
    }
  ];
  
  const fullTranscript = transcript || defaultTranscript;
  
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
                    <span className={styles.speaker}>{entry.speaker}:</span> {entry.text}
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
              <span className={styles.speaker}>{entry.speaker}:</span> {entry.text}
            </div>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}