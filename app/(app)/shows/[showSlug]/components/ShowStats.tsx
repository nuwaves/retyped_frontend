import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const styles = {
  statsContainer: "flex flex-wrap gap-6 text-gray-600",
  statItem: "flex items-center gap-2",
  statIcon: "text-gray-400 text-xs",
  statText: "text-xs font-normal leading-3 tracking-normal align-middle lining-nums proportional-nums"
};

export default function ShowStats() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statItem}>
        <FontAwesomeIcon icon={faHeadphones} className={styles.statIcon} />
        <span className={styles.statText}>
          - Views
        </span>
      </div>

      <div className={styles.statItem}>
        <FontAwesomeIcon icon={faMicrophone} className={styles.statIcon} />
        <span className={styles.statText}>
          - Episodes
        </span>
      </div>
    </div>
  );
}
