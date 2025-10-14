import { ReactNode } from 'react';

interface AuthLayoutProps {
  hero: ReactNode;
  authCard: ReactNode;
  headerTitle?: string;
  headerDescription?: string;
}

const styles = {
  container: "min-h-[calc(100vh-3.5rem-8rem)] flex items-center justify-center bg-gray-50 px-6 py-4 md:p-8",
  innerContainer: "max-w-6xl w-full lg:bg-white lg:px-12 lg:pt-16 lg:pb-24 flex flex-col gap-6 md:gap-12",
  headerContainer: "text-center lg:hidden",
  headerTitle: "text-gray-900 mb-4 text-[28px] leading-[32px] font-medium",
  headerDescription: "text-gray-600 max-w-2xl mx-auto text-[14px] leading-[22px] font-normal px-4",
  contentContainer: "flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
  cardWrapper: "flex flex-col items-center gap-6 md:gap-8 w-full lg:w-auto",
  termsText: "text-center text-gray-500 text-xs leading-[14px] font-normal",
  termsLink: "text-gray-700 hover:underline font-medium"
};

export default function AuthLayout({ hero, authCard, headerTitle, headerDescription }: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {headerTitle && (
          <div className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>
              {headerTitle}
            </h1>
            {headerDescription && (
              <p className={styles.headerDescription}>
                {headerDescription}
              </p>
            )}
          </div>
        )}
        <div className={styles.contentContainer}>
          {hero}
          <div className={styles.cardWrapper}>
            {authCard}
            <p className={styles.termsText}>
              By continuing, you agree to our{' '}
              <a href="/terms" className={styles.termsLink}>Terms</a>
              {' '}and{' '}
              <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}