'use client';

import { useState } from 'react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  summaryContent: ReactNode;
  transcriptContent: ReactNode;
}

const styles = {
  container: "w-full",
  tabButtons: "inline-flex bg-gray-100/50 rounded-lg p-1.5 mb-6 relative",
  tabButton: "px-6 py-2 font-medium text-sm transition-colors rounded-md relative z-10",
  activeTab: "text-black",
  inactiveTab: "text-gray-600 hover:text-gray-900",
  tabContent: "min-h-[300px]",
  backgroundPill: "absolute inset-0 bg-white rounded-md"
};

export default function TabNavigation({ summaryContent, transcriptContent }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  
  return (
    <div className={styles.container}>
      <div className={styles.tabButtons}>
        {activeTab === 'summary' && (
          <motion.div
            className={styles.backgroundPill}
            layoutId="activeTabBackground"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{
              width: 'calc(50% - 6px)',
              height: 'calc(100% - 12px)',
              top: 6,
              left: 6
            }}
          />
        )}
        {activeTab === 'transcript' && (
          <motion.div
            className={styles.backgroundPill}
            layoutId="activeTabBackground"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{
              width: 'calc(50% - 6px)',
              height: 'calc(100% - 12px)',
              top: 6,
              right: 6,
              left: 'auto'
            }}
          />
        )}
        <button
          onClick={() => setActiveTab('summary')}
          className={`${styles.tabButton} ${
            activeTab === 'summary' ? styles.activeTab : styles.inactiveTab
          }`}
          aria-selected={activeTab === 'summary'}
          role="tab"
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('transcript')}
          className={`${styles.tabButton} ${
            activeTab === 'transcript' ? styles.activeTab : styles.inactiveTab
          }`}
          aria-selected={activeTab === 'transcript'}
          role="tab"
        >
          Transcript
        </button>
      </div>
      
      <div className={styles.tabContent} role="tabpanel">
        {activeTab === 'summary' ? summaryContent : transcriptContent}
      </div>
    </div>
  );
}