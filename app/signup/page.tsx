import { Suspense } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHero from '../components/auth/AuthHero';
import AuthCard from '../components/auth/AuthCard';

export default function SignupPage() {
  return (
    <AuthLayout
      headerTitle="Join the Future of Podcast Discovery"
      headerDescription="Create your free account to unlock powerful features for discovering, consuming, and sharing podcast content in entirely new ways."
      hero={
        <AuthHero
          title="Start your podcast journey"
          description="Join thousands of podcast enthusiasts. Create your account to build your personal library, save highlights, and discover amazing content."
        />
      }
      authCard={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthCard mode="signup" />
        </Suspense>
      }
    />
  );
}