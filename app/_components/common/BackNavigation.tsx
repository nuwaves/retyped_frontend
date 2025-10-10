'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BackNavigationProps {
  href: string;
  label: string;
}

const styles = {
  container: "inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-4 md:mb-10",
  icon: "text-xs font-light",
  text: "text-sm font-normal tracking-normal align-middle lining-nums proportional-nums"
};

export default function BackNavigation({ href, label }: BackNavigationProps) {
  return (
    <Link href={href} className={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
      <span className={styles.text}>Back to {label}</span>
    </Link>
  );
}