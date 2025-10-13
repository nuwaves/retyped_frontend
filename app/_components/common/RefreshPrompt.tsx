'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@/app/_lib/icons';

interface RefreshPromptProps {
  onRefresh: () => void;
  message?: string;
}

const styles = {
  container: "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down",
  button: "bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors",
  icon: "text-sm",
  text: "text-sm font-medium"
};

export default function RefreshPrompt({
  onRefresh,
  message = "New content available"
}: RefreshPromptProps) {
  return (
    <div className={styles.container}>
      <button onClick={onRefresh} className={styles.button}>
        <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
        <span className={styles.text}>{message}</span>
      </button>
    </div>
  );
}