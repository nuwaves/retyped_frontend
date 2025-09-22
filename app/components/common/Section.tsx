import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import SectionHeader from './SectionHeader';
import { ReactNode } from 'react';

const styles = {
  container: "w-full py-4 px-4",
  wrapper: "max-w-7xl mx-auto",
  defaultGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
};

interface SectionProps {
  title: string;
  icon: IconDefinition;
  children: ReactNode;
  gridClassName?: string;
  containerClassName?: string;
}

export default function Section({
  title,
  icon,
  children,
  gridClassName = styles.defaultGrid,
  containerClassName = styles.container
}: SectionProps) {
  return (
    <section className={containerClassName}>
      <div className={styles.wrapper}>
        <SectionHeader
          icon={icon}
          title={title}
        />

        <div className={gridClassName}>
          {children}
        </div>
      </div>
    </section>
  );
}