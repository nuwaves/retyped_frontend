import { ReactNode } from 'react';

interface ContentSectionProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
  paddingBottom?: string;
}

const styles = {
  container: "bg-white rounded-lg p-6 min-h-[150px] md:min-h-[300px]",
  title: "flex items-center gap-3 text-2xl font-bold leading-tight mb-8"
};

export default function ContentSection({ 
  children, 
  title,
  className = '', 
  paddingBottom = 'pb-6' 
}: ContentSectionProps) {
  return (
    <div className={`${styles.container} ${paddingBottom} ${className}`.trim()}>
      {title && (
        <h2 className={styles.title}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}