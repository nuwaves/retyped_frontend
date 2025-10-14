'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Lazy load TabNavigation to avoid blocking LCP with Framer Motion
const TabNavigation = dynamic(() => import('./TabNavigation'), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <div className="inline-flex bg-gray-100/50 rounded-lg p-1.5 mb-6 h-12 w-64 animate-pulse"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
      </div>
    </div>
  ),
});

interface TabNavigationWrapperProps {
  summaryContent: ReactNode;
  transcriptContent: ReactNode;
}

export default function TabNavigationWrapper({
  summaryContent,
  transcriptContent,
}: TabNavigationWrapperProps) {
  return (
    <TabNavigation
      summaryContent={summaryContent}
      transcriptContent={transcriptContent}
    />
  );
}
