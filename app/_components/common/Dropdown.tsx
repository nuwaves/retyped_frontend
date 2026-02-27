'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const styles = {
  dropdown: "absolute bg-white rounded shadow-[0px_4px_6px_0px_#00000017] border border-gray-200 p-[5px] flex flex-col gap-[10px] z-50"
};

export default function Dropdown({ isOpen, onClose, children, className = '' }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`.trim()}>
      {children}
    </div>
  );
}
