import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@/app/_lib/icons';
import SafeHTML from '@/app/_components/common/SafeHTML';
import ContentSection from './ContentSection';

interface ShowNotesSectionProps {
  description: string | null;
}

const styles = {
  notes: "text-base text-gray-700 leading-relaxed break-words [overflow-wrap:anywhere] [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-4",
  empty: "text-sm text-gray-500 py-12 text-center",
};

export default function ShowNotesSection({ description }: ShowNotesSectionProps) {
  const hasNotes = !!description && description.trim().length > 0;

  return (
    <ContentSection
      title={
        <>
          <FontAwesomeIcon icon={faMicrophone} className="text-gray-400" />
          Show Notes
        </>
      }
    >
      {hasNotes ? (
        <SafeHTML html={description} className={styles.notes} />
      ) : (
        <p className={styles.empty}>No show notes for this episode.</p>
      )}
    </ContentSection>
  );
}
