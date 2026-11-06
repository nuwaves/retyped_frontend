import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@/app/_lib/icons';
import SafeHTML from '@/app/_components/common/SafeHTML';
import ContentSection from './ContentSection';

interface ShowNotesSectionProps {
  contentEncoded?: string | null;
  description: string | null;
}

const styles = {
  notes: "text-base text-gray-700 leading-relaxed break-words [overflow-wrap:anywhere] [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-4",
  empty: "text-sm text-gray-500 py-12 text-center",
};

// Length of the readable text in an HTML string, ignoring tags and whitespace.
function visibleTextLength(html: string | null | undefined): number {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

// Feeds usually put the full show notes in <content:encoded> and a shortened
// or plain-text copy in <description>. Show whichever has more to read, so a
// truncated description never wins over the full notes and an empty
// content:encoded falls back to the description.
export function pickShowNotes(
  contentEncoded: string | null | undefined,
  description: string | null | undefined,
): string | null {
  const encodedLength = visibleTextLength(contentEncoded);
  const descriptionLength = visibleTextLength(description);
  if (encodedLength === 0 && descriptionLength === 0) return null;
  return encodedLength >= descriptionLength ? contentEncoded! : description!;
}

export default function ShowNotesSection({ contentEncoded, description }: ShowNotesSectionProps) {
  const notes = pickShowNotes(contentEncoded, description);

  return (
    <ContentSection
      title={
        <>
          <FontAwesomeIcon icon={faMicrophone} className="text-gray-400" />
          Show Notes
        </>
      }
    >
      {notes ? (
        <SafeHTML html={notes} className={styles.notes} />
      ) : (
        <p className={styles.empty}>No show notes for this episode.</p>
      )}
    </ContentSection>
  );
}
