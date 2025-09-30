'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from '@/app/components/common/Button';

const styles = {
  container: "flex items-center space-x-3"
};

export default function AuthButtons() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return <div className={styles.container} />;
  }

  if (session) {
    return (
      <div className={styles.container}>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/login">
        <Button variant="outline" size="sm">
          Log in
        </Button>
      </Link>
      <Link href="/signup">
        <Button variant="primary" size="sm">
          <FontAwesomeIcon icon={faUser} className="text-white" />
          Sign up
        </Button>
      </Link>
    </div>
  );
}