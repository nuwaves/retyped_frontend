'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram, faXTwitter } from '@/app/_lib/icons';

const styles = {
  container: "w-full max-w-md bg-white rounded-2xl p-8",
  header: "text-center mb-8",
  title: "text-2xl font-bold text-gray-900 mb-2",
  subtitle: "text-gray-500",
  errorBox: "mb-6 p-3 bg-red-50 border border-red-200 rounded-lg",
  errorContent: "flex items-start",
  errorIcon: "h-5 w-5 text-red-400 mt-0.5",
  errorText: "text-sm text-red-800",
  errorClose: "h-4 w-4 text-red-400 hover:text-red-600",
  socialsContainer: "space-y-3",
  signupSection: "mt-8 text-center",
  signupText: "text-gray-600",
  signupLink: "font-semibold text-gray-900 hover:underline",
  termsSection: "mt-8",
  termsText: "text-center text-gray-500 text-xs leading-[14px] font-normal",
  termsLink: "text-gray-700 hover:underline font-medium"
};

export default function LoginSection() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorMessages = {
      'Configuration': 'Authentication service configuration error. Please try again.',
      'AccessDenied': 'Access denied. Please check your permissions.',
      'Verification': 'Email verification required. Please check your email.',
      'Default': 'Authentication failed. Please try again.',
      'BackendConnection': 'Unable to connect to authentication service. Please try again later.',
      'TokenConversion': 'Authentication successful, but service connection failed. Please contact support.'
    };

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
      bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
      textColor: 'text-white'
    },
    {
      id: 'twitter',
      name: 'X',
      icon: faXTwitter,
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: faInstagram,
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div 
      className={styles.container}
      style={{
        boxShadow: '0px 19px 44px -12px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)'
      }}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome Back to <span className="font-black">RETYPED</span>
        </h1>
        <p className={styles.subtitle}>
          Sign in with your social account
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
              font-medium rounded-lg transition-all duration-200
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

      <div className={styles.signupSection}>
        <p className={styles.signupText}>
          New to Retyped?{' '}
          <a href="/signup" className={styles.signupLink}>
            Sign Up
          </a>
        </p>
      </div>

      <div className={styles.termsSection}>
        <p className={styles.termsText}>
          By continuing, you agree to our{' '}
          <a href="/terms" className={styles.termsLink}>Terms</a>
          {' '}and{' '}
          <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}