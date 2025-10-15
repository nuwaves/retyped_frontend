'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram, faXTwitter } from '@/app/_lib/icons';

interface AuthCardProps {
  mode: 'login' | 'signup';
}

const styles = {
  container: "w-full max-w-[480px] bg-white rounded-2xl p-6 md:p-8",
  header: "text-center mb-6 md:mb-8",
  title: "text-gray-900 mb-2 text-[17px] md:text-[19.36px] leading-[24px] md:leading-[28px] font-normal text-center",
  subtitle: "text-gray-500 text-[13px] md:text-[14px]",
  errorBox: "mb-6 p-3 bg-red-50 border border-red-200 rounded-lg",
  errorContent: "flex items-start",
  errorIcon: "h-5 w-5 text-red-400 mt-0.5",
  errorText: "text-sm text-red-800",
  errorClose: "h-4 w-4 text-red-400 hover:text-red-600",
  errorShrink: "flex-shrink-0",
  errorExpand: "ml-3 flex-1",
  errorButton: "ml-3 flex-shrink-0",
  socialsContainer: "space-y-3",
  socialButton: "w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 text-[11px] md:text-[12.11px] leading-[16px] md:leading-[17.5px] font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
  spinner: "animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent",
  iconSize: "w-5 h-5",
  whySignUpSection: "mt-6 md:mt-8",
  whySignUpTitle: "text-center text-gray-400 text-[11px] md:text-[12px] font-medium mb-4 tracking-wide flex items-center gap-3",
  titleLine: "flex-1 h-px bg-gray-300",
  featuresList: "space-y-2",
  featureItem: "flex items-center gap-2 text-gray-600 font-medium text-[12px] leading-[16px]",
  featureBullet: "w-1 h-1 rounded-full bg-gray-600 flex-shrink-0"
};

export default function AuthCard({ mode }: AuthCardProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const content = {
    login: {
      title: <>Welcome to <span className="font-black">RETYPED</span></>,
      subtitle: 'Sign in with your social account'
    },
    signup: {
      title: <>Welcome to <span className="font-black">RETYPED</span></>,
      subtitle: 'Sign in with your social account'
    }
  };

  const errorMessages = {
    'Configuration': 'Authentication service configuration error. Please try again.',
    'AccessDenied': 'Access denied. Please check your permissions.',
    'Verification': 'Email verification required. Please check your email.',
    'Default': 'Authentication failed. Please try again.',
    'BackendConnection': 'Unable to connect to authentication service. Please try again later.',
    'TokenConversion': 'Authentication successful, but service connection failed. Please contact support.'
  };

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(errorMessages[error as keyof typeof errorMessages] || errorMessages.Default);
    }
  }, [searchParams]);

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(provider);
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      });

      if (result?.ok) {
        const session = await getSession();
        if (session) {
          router.push(callbackUrl);
        }
      }
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: faGoogle,
      bgColor: 'bg-white hover:bg-gray-50 border border-gray-300',
      textColor: 'text-gray-700'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: faFacebook,
      bgColor: 'bg-white hover:bg-gray-50 border border-gray-300',
      textColor: 'text-gray-700'
    },
    {
      id: 'twitter',
      name: 'X',
      icon: faXTwitter,
      bgColor: 'bg-white hover:bg-gray-50 border border-gray-300',
      textColor: 'text-gray-700'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: faInstagram,
      bgColor: 'bg-white hover:bg-gray-50 border border-gray-300',
      textColor: 'text-gray-700'
    }
  ];

  const currentContent = content[mode];

  return (
    <div
      className={styles.container}
      style={{
        boxShadow: '0px 19px 44px -12px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)'
      }}>
      <div className={styles.header}>
        <div className={styles.title}>
          {currentContent.title}
        </div>
        <p className={styles.subtitle}>
          {currentContent.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className={styles.errorBox}>
          <div className={styles.errorContent}>
            <div className={styles.errorShrink}>
              <svg className={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={styles.errorExpand}>
              <p className={styles.errorText}>{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className={styles.errorButton}
            >
              <svg className={styles.errorClose} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={styles.socialsContainer}>
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading === provider.id}
            className={`${styles.socialButton} ${provider.bgColor} ${provider.textColor}`}
          >
            {isLoading === provider.id ? (
              <>
                <div className={styles.spinner}></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={provider.icon}
                  className={styles.iconSize}
                />
                <span>Continue with {provider.name}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <div className={styles.whySignUpSection}>
        <h3 className={styles.whySignUpTitle}>
          <span className={styles.titleLine}></span>
          <span>WHY SIGN UP?</span>
          <span className={styles.titleLine}></span>
        </h3>
        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <span className={styles.featureBullet}></span>
            <span>Access full episode transcripts</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureBullet}></span>
            <span>Highlight and share transcript segments</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureBullet}></span>
            <span>Bookmark episodes for later</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureBullet}></span>
            <span>Follow your favorite podcasts</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureBullet}></span>
            <span>Build your personal library</span>
          </li>
        </ul>
      </div>
    </div>
  );
}