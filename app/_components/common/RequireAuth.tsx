'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, pathname, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
