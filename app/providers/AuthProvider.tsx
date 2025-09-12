  'use client';
  import { SessionProvider } from 'next-auth/react';
  import { AuthManager } from '@/app/components/common/AuthManager';

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
