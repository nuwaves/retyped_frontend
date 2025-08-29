'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './navbar/Logo';
import SearchBar from './navbar/SearchBar';
import AuthButtons from './navbar/AuthButtons';

const styles = {
  nav: "w-full bg-white fixed top-0 left-0 right-0 z-10",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  wrapper: "flex justify-between items-end py-2",
  rightSection: "flex items-center gap-4 w-1/2"
};

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [prevScroll, setPrevScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScroll = latest;
    if (currentScroll > prevScroll && currentScroll > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setPrevScroll(currentScroll);
  });

  return (
    <motion.nav 
      className={styles.nav}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Logo />
          <div className={styles.rightSection}>
            <SearchBar />
            <AuthButtons />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}