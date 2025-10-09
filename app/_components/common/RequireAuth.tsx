'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsValidAuth } from '@/app/_store/features/auth/authSlice';
import LoadingSpinner from './LoadingSpinner';

/**
 * Component wrapper to protect pages that require authentication
 *
 * Usage:
 * ```tsx
 * // In a page component
 * export default function MyProfilePage() {
 *   return (
 *     <RequireAuth>
 *       <div>Protected content here</div>
 *     </RequireAuth>
 *   );
 * }
 * ```
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isValidAuth = useSelector(selectIsValidAuth);

  useEffect(() => {
    if (!isValidAuth) {
      // Redirect to login with callback URL to return after login
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isValidAuth, pathname, router]);

  // Show loading spinner while redirecting
  if (!isValidAuth) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
