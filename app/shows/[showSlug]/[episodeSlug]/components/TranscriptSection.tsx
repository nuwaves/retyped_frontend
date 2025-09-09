import Link from 'next/link';
import Button from '@/app/components/common/Button';

interface TranscriptSectionProps {
  transcript?: string;
  isAuthenticated: boolean;
}

const styles = {
  container: "relative",
  transcript: "prose max-w-none",
  paragraph: "text-gray-700 leading-relaxed mb-4",
  blurredSection: "relative",
  blurredContent: "blur-sm select-none pointer-events-none",
  overlay: "absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex items-center justify-center",
  authPrompt: "bg-white rounded-lg p-6 shadow-lg text-center max-w-md",
  authTitle: "text-xl font-bold mb-2",
  authDescription: "text-gray-600 mb-4",
  authButtons: "flex gap-3 justify-center"
};

export default function TranscriptSection({ transcript, isAuthenticated }: TranscriptSectionProps) {
  const defaultTranscript = `
    Host: Welcome to today's episode where we dive deep into the case that shocked the community.
    
    The story begins on a seemingly ordinary day in Rochester, New York. Wendy Jerome, a vibrant teenager with her whole life ahead of her, left her home to deliver a birthday card to her best friend. It was a simple errand, one that should have taken no more than an hour.
    
    But Wendy never made it to her friend's house. What followed was a decades-long investigation that would test the limits of forensic science and the determination of law enforcement.
    
    Detective Sarah Martinez: "This case haunted our department for years. Every detective who worked on it carried the weight of finding justice for Wendy."
    
    The initial investigation faced numerous challenges. Technology limitations of the time meant that crucial evidence couldn't be fully analyzed. Witnesses were scarce, and leads quickly went cold.
    
    It wasn't until advances in DNA technology that investigators got their first real break. The evidence that had been carefully preserved for decades could finally reveal its secrets.
  `;
  
  const fullTranscript = transcript || defaultTranscript;
  const paragraphs = fullTranscript.trim().split('\n\n');
  
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.transcript}>
          <p className={styles.paragraph}>{paragraphs[0]}</p>
          <p className={styles.paragraph}>{paragraphs[1]}</p>
        </div>
        
        <div className={styles.blurredSection}>
          <div className={styles.blurredContent}>
            {paragraphs.slice(2).map((para, index) => (
              <p key={index} className={styles.paragraph}>{para}</p>
            ))}
          </div>
          
          <div className={styles.overlay}>
            <div className={styles.authPrompt}>
              <h3 className={styles.authTitle}>Sign in to read the full transcript</h3>
              <p className={styles.authDescription}>
                Get unlimited access to all episode transcripts and exclusive content.
              </p>
              <div className={styles.authButtons}>
                <Link href="/login">
                  <Button variant="primary" size="md">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="md">Sign Up Free</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.transcript}>
      {paragraphs.map((para, index) => (
        <p key={index} className={styles.paragraph}>{para}</p>
      ))}
    </div>
  );
}