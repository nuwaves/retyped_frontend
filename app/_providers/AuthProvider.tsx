  'use client';
  import { SessionProvider } from 'next-auth/react';
  import { AuthManager } from '@/app/_components/common/AuthManager';

  export default function AuthProvider({ 
    children 
  }: { 
    children: React.ReactNode 
  }) {
    return (
      <SessionProvider>
        <AuthManager />
        {children}
      </SessionProvider>
    );
  }
