'use client';

import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { selectIsValidAuth } from '@/app/_store/features/auth/authSlice';

/**
 * Hook to require authentication for protected actions
 *
 * Usage:
 * ```tsx
 * const { requireAuth, isValidAuth } = useRequireAuth();
 *
 * const handleBookmark = () => {
 *   requireAuth(() => {
 *     createBookmark({ entity_id: episode.id, entity_type: 'episode' });
 *   });
 * };
 * ```
 *
 * @returns {object} - { requireAuth, isValidAuth }
 */
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const isValidAuth = useSelector(selectIsValidAuth);

  /**
   * Checks if user is authenticated with valid token,
   * executes callback if yes, redirects to login if no
   *
   * @param callback - Function to execute if authenticated
   * @returns {boolean} - true if authenticated and callback was executed, false otherwise
   */
  const requireAuth = (callback: () => void): boolean => {
    if (!isValidAuth) {
      // Redirect to login with callback URL
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return false;
    }

    // Execute the callback if authenticated
    callback();
    return true;
  };

  return {
    requireAuth,
    isValidAuth
  };
}
