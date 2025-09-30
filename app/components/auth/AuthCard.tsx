'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

interface AuthCardProps {
  mode: 'login' | 'signup';
}

const styles = {
  container: "w-[480px] bg-white rounded-2xl p-8",
  header: "text-center mb-8",
  title: "text-gray-900 mb-2",
  subtitle: "text-gray-500",
  errorBox: "mb-6 p-3 bg-red-50 border border-red-200 rounded-lg",
  errorContent: "flex items-start",
  errorIcon: "h-5 w-5 text-red-400 mt-0.5",
  errorText: "text-sm text-red-800",
  errorClose: "h-4 w-4 text-red-400 hover:text-red-600",
  socialsContainer: "space-y-3",
  alternateSection: "mt-8 text-center",
  alternateText: "text-gray-600",
  alternateLink: "font-semibold text-gray-900 hover:underline",
  termsSection: "mt-8",
  termsText: "text-center text-gray-500 text-xs leading-[14px] font-normal",
  termsLink: "text-gray-700 hover:underline font-medium"
};

export default function AuthCard({ mode }: AuthCardProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLogin = mode === 'login';

  const content = {
    login: {
      title: <>Welcome Back to <span className="font-black">RETYPED</span></>,
      subtitle: 'Sign in with your social account',
      alternateText: 'New to Retyped?',
      alternateLinkText: 'Sign Up',
      alternateHref: '/signup'
    },
    signup: {
      title: <>Welcome to <span className="font-black">RETYPED</span></>,
      subtitle: '',
      alternateText: 'Already have an account?',
      alternateLinkText: 'Sign In',
      alternateHref: '/login'
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
        <h1 className="text-gray-900 mb-2 text-[19.36px] leading-[28px] font-normal text-center">
          {currentContent.title}
        </h1>
        <p className={styles.subtitle}>
          {currentContent.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className={styles.errorBox}>
          <div className={styles.errorContent}>
            <div className="flex-shrink-0">
              <svg className={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className={styles.errorText}>{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="ml-3 flex-shrink-0"
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
            className={`
              w-full flex items-center justify-center gap-3 py-3 px-4
              rounded-lg transition-all duration-200
              text-[12.11px] leading-[17.5px] font-medium
              ${provider.bgColor} ${provider.textColor}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading === provider.id ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={provider.icon}
                  className="w-5 h-5"
                />
                <span>Continue with {provider.name}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <div className={styles.alternateSection}>
        <p className="text-gray-600 text-center text-[14px] leading-[21px] font-normal">
          {currentContent.alternateText}{' '}
          <a href={currentContent.alternateHref} className={styles.alternateLink}>
            {currentContent.alternateLinkText}
          </a>
        </p>
      </div>
    </div>
  );
}