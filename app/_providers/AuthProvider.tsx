  'use client';
  import { SessionProvider } from 'next-auth/react';
  import { AuthManager } from '@/app/_components/common/AuthManager';
  import { BookmarkFollowSync } from '@/app/_components/common/BookmarkFollowSync';

  export default function AuthProvider({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <SessionProvider>
        <AuthManager />
        <BookmarkFollowSync />
        {children}
      </SessionProvider>
    );
  }
