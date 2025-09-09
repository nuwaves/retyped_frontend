'use client';

import { useState } from 'react';
import { ReactNode } from 'react';

interface TabNavigationProps {
  summaryContent: ReactNode;
  transcriptContent: ReactNode;
}

const styles = {
  container: "w-full",
  tabButtons: "flex border-b border-gray-200 mb-6",
  tabButton: "px-4 py-2 font-medium text-sm transition-colors relative",
  activeTab: "text-black border-b-2 border-black",
  inactiveTab: "text-gray-500 hover:text-gray-700",
  tabContent: "min-h-[300px]"
};

export default function TabNavigation({ summaryContent, transcriptContent }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  
  return (
    <div className={styles.container}>
      <div className={styles.tabButtons}>
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