'use client';

import { m } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const styles = {
  button: "md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none",
  line: "absolute h-0.5 w-6 bg-black transition-all"
};

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-5">
        <m.span
          className={styles.line}
          animate={isOpen ? {
            rotate: 45,
            y: 9
          } : {
            rotate: 0,
            y: 0
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
        <m.span
          className={`${styles.line} top-1/2 -translate-y-1/2`}
          animate={isOpen ? {
            opacity: 0,
            scale: 0.8
          } : {
            opacity: 1,
            scale: 1
          }}
          transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
        <m.span
          className={`${styles.line} bottom-0`}
          animate={isOpen ? {
            rotate: -45,
            y: -9
          } : {
            rotate: 0,
            y: 0
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
}
