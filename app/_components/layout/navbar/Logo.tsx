'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { useState } from 'react';

const styles = {
  logo: "flex-shrink-0 font-bold text-[18px] leading-[115%] tracking-normal align-middle lining-nums proportional-nums"
};

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  const letters = 'RETYPED'.split('');

  return (
    <Link href="/" className={styles.logo}>
      <m.span
        className="inline-flex"
        whileHover={{
          scale: 1.03,
          y: 1
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {letters.map((letter, index) => (
          <m.span
            key={index}
            className="inline-block"
            animate={isHovered ? {
              color: '#4b5563'
            } : {
              color: '#000000'
            }}
            transition={{
              delay: index * 0.05,
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {letter}
          </m.span>
        ))}
      </m.span>
    </Link>
  );
}