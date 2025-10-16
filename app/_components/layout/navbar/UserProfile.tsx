'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@/app/_lib/icons';

interface UserProfileProps {
  email: string;
  initials: string;
}

const styles = {
  container: "relative",
  userButton: "flex items-center gap-2 cursor-pointer",
  initialsCircle: "w-8 h-8 rounded-full bg-slate-200 text-black flex items-center justify-center font-inter font-medium text-sm select-none",
  email: "font-inter font-normal text-sm leading-6 max-w-[300px] truncate",
  caret: "text-gray-600 text-xs",
  dropdown: "absolute top-[calc(100%+8px)] right-0 bg-white rounded shadow-[0px_4px_6px_0px_#00000017] border border-gray-200 p-[5px] flex flex-col gap-[10px] z-50",
  menuItem: "font-inter font-normal text-sm leading-6 text-slate-900 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition-colors"
};

export default function UserProfile({ email, initials }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onBlur={() => setIsOpen(false)}
      tabIndex={-1}
    >
      <div className={styles.userButton} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.initialsCircle}>{initials}</div>
        <span className={styles.email}>{email}</span>
        <FontAwesomeIcon icon={faCaretDown} className={styles.caret} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <Link href="/my-activity" className={styles.menuItem} onClick={() => setIsOpen(false)}>
            My Activity
          </Link>
          <Link href="/creator-dashboard" className={styles.menuItem} onClick={() => setIsOpen(false)}>
            Creator Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
