import { Suspense } from 'react';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import AuthHero from '@/app/_components/auth/AuthHero';
import AuthCard from '@/app/_components/auth/AuthCard';

export default function LoginPage() {
  return (
    <AuthLayout
      headerTitle="Discover amazing podcasts"
      headerDescription="Build your personal podcast library with bookmarks, follows, transcript highlights, and more."
      hero={
        <AuthHero
          title="Discover amazing podcasts"
          description="Sign in to access your personal library, transcript highlights, and continue discovering amazing podcast content."
        />
      }
      authCard={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthCard mode="login" />
        </Suspense>
      }
    />
  );
}
