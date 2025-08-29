import Link from 'next/link';
import { buttonStyles } from '@/app/styles/buttons';

const styles = {
  container: "flex items-center space-x-3"
};

export default function AuthButtons() {
  return (
    <div className={styles.container}>
      <Link href="/login" className={buttonStyles.outline}>
        Log in
      </Link>
      <Link href="/signup" className={buttonStyles.primary}>
        Sign up
      </Link>
    </div>
  );
}