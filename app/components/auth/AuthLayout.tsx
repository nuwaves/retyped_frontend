import { ReactNode } from 'react';

interface AuthLayoutProps {
  hero: ReactNode;
  authCard: ReactNode;
  headerTitle?: string;
  headerDescription?: string;
}

export default function AuthLayout({ hero, authCard, headerTitle, headerDescription }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-3.5rem-8rem)] flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-6xl w-full bg-white px-12 pt-16 pb-24 flex flex-col gap-12">
        {headerTitle && (
          <div className="text-center">
            <h1 className="text-gray-900 mb-4 text-[38.23px] leading-[42px] font-medium">
              {headerTitle}
            </h1>
            {headerDescription && (
              <p className="text-gray-600 max-w-2xl mx-auto text-[15.06px] leading-[24.5px] font-normal">
                {headerDescription}
              </p>
            )}
          </div>
        )}
        <div className="flex items-center gap-16">
          {hero}
          <div className="flex flex-col items-center gap-8">
            {authCard}
            <p className="text-center text-gray-500 text-xs leading-[14px] font-normal">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-gray-700 hover:underline font-medium">Terms</a>
              {' '}and{' '}
              <a href="/privacy" className="text-gray-700 hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}