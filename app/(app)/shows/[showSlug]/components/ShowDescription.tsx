'use client';

import SafeHTML from '@/app/_components/common/SafeHTML';
import ViewMoreContent from '@/app/_components/common/ViewMoreContent';

interface ShowDescriptionProps {
  description: string;
}

const styles = {
  description: "text-base font-normal leading-6 tracking-normal text-gray-700 break-words overflow-wrap-anywhere"
};

export default function ShowDescription({ description }: ShowDescriptionProps) {
  return (
    <ViewMoreContent maxHeight="3rem" mobileOnly={true}>
      <SafeHTML
        html={description}
        className={styles.description}
      />
    </ViewMoreContent>
  );
}
