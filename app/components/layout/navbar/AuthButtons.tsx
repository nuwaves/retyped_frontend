'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
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
        <FontAwesomeIcon icon={faUser} className="mr-2 text-white" />
        Sign up
      </Link>
    </div>
  );
}