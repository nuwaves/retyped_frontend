'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from '@/app/_components/common/Button';

const styles = {
  container: "flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto",
  userInfo: "flex flex-col md:flex-row md:items-center gap-2 w-full",
  initialsCircle: "w-8 h-8 rounded-full bg-slate-200 text-black flex items-center justify-center font-inter font-medium text-sm select-none",
  email: "font-inter font-normal text-sm leading-6 max-w-[300px] truncate",
  separator: "hidden md:inline font-inter font-normal text-sm leading-6 mx-2 text-slate-200",
  logoutText: "font-inter font-normal text-sm leading-6 text-slate-900 cursor-pointer hover:opacity-80 transition-opacity"
};

interface AuthButtonsProps {
  onActionComplete?: () => void;
}

export default function AuthButtons({ onActionComplete }: AuthButtonsProps = {}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    onActionComplete?.();
  };

  const getInitials = () => {
    const firstName = session?.backendToken?.user.first_name || '';
    const lastName = session?.backendToken?.user.last_name || '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  if (status === 'loading') {
    return <div className={styles.container} />;
  }

  if (session) {
    const email = session.backendToken?.user.email || '';
    const initials = getInitials();

    return (
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.initialsCircle}>
            {initials}
          </div>
          <span className={styles.email}>{email}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.logoutText} onClick={handleSignOut}>
            Log out
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href={`/auth?callbackUrl=${encodeURIComponent(pathname)}`} onClick={() => onActionComplete?.()}>
        <Button variant="primary" size="sm">
          <FontAwesomeIcon icon={faUser} className="text-white" />
          Sign In / Sign Up
        </Button>
      </Link>
    </div>
  );
}