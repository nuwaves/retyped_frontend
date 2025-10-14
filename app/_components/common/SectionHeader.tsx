'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faArrowRight } from '@/app/_lib/icons';

interface SectionHeaderProps {
  icon: IconDefinition;
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
}

const styles = {
  header: "flex items-center justify-between mb-8",
  titleSection: "flex items-center gap-2 lg:gap-3 hover:opacity-70 transition-opacity cursor-pointer",
  icon: "text-lg lg:text-xl text-slate-900",
  title: "text-xl lg:text-2xl font-bold leading-[115%] tracking-normal align-middle text-slate-900 lining-nums proportional-nums",
  viewAll: "text-sm font-medium leading-6 tracking-normal text-black flex items-center"
};

export default function SectionHeader({ 
  icon, 
  title, 
  viewAllLink = "#",
  viewAllText = "View all"
}: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <a href={viewAllLink} className={styles.titleSection}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
      </a>
      <a href={viewAllLink} className={styles.viewAll}>
        {viewAllText} <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs" />
      </a>
    </div>
  );
}