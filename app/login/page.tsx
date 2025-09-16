import { Suspense } from 'react';
import LoginSection from './components/LoginSection';
import LoginHero from './components/LoginHero';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem-8rem)] flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-6xl w-full bg-white px-12 pt-16 pb-24 flex items-center gap-16">
        <LoginHero />
        <Suspense fallback={<div>Loading...</div>}>
          <LoginSection />
        </Suspense>
      </div>
    </div>
  );
}
