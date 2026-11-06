'use client';

import { useId, useState, type ReactNode, type KeyboardEvent } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
}

const styles = {
  container: "w-full",
  tabList: "inline-flex max-w-full overflow-x-auto bg-gray-100/50 rounded-lg p-1.5 mb-6 gap-1",
  tabButton: "px-4 sm:px-6 py-2 font-medium text-sm whitespace-nowrap rounded-md transition-colors duration-200",
  activeTab: "bg-white text-black shadow-sm",
  inactiveTab: "text-gray-600 hover:text-gray-900",
};

// Every panel is server-rendered (inactive ones are `hidden`), so summary,
// show notes and transcript text are all in the initial HTML.
export default function TabNavigation({ tabs }: TabNavigationProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const baseId = useId();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveId(tabs[next].id);
    document.getElementById(`${baseId}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div className={styles.container}>
      <div role="tablist" aria-label="Episode content" className={styles.tabList}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${styles.tabButton} ${isActive ? styles.activeTab : styles.inactiveTab}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
