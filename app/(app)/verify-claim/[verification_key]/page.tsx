'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@/app/_lib/icons';
import { useVerifyPodcastClaimMutation } from '@/app/_store/services/podcastClaimsApi';

const styles = {
  container: "min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-12",
  content: "max-w-md w-full text-center",
  iconWrapper: "mb-6 flex justify-center",
  iconSuccess: "text-green-500 text-6xl",
  iconError: "text-red-500 text-6xl",
  iconLoading: "text-blue-500 text-6xl animate-spin",
  title: "font-inter font-semibold text-3xl md:text-4xl text-gray-900 mb-3",
  description: "font-inter font-normal text-base text-gray-600 leading-relaxed mb-6",
  button: "inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors",
};

type VerificationState = 'verifying' | 'success' | 'error';

// UUID v4 regex pattern
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUUID(key: string): boolean {
  return UUID_PATTERN.test(key);
}

export default function VerifyClaimPage() {
  const params = useParams();
  const router = useRouter();
  const verificationKey = params.verification_key as string;

  const [verifyPodcastClaim] = useVerifyPodcastClaimMutation();
  const [state, setState] = useState<VerificationState>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyNow = async () => {
      if (!verificationKey) {
        setState('error');
        setErrorMessage('Invalid verification key');
        return;
      }

      // Validate UUID format
      if (!isValidUUID(verificationKey)) {
        setState('error');
        setErrorMessage('Invalid verification key format. The verification key must be a valid UUID.');
        return;
      }

      try {
        const result = await verifyPodcastClaim(verificationKey).unwrap();

        if (result.success) {
          setState('success');
        } else {
          setState('error');
          setErrorMessage(result.message || 'Verification failed');
        }
      } catch (error) {
        setState('error');
        const err = error as { data?: { message?: string; detail?: string } };
        setErrorMessage(
          err?.data?.message ||
          err?.data?.detail ||
          'An error occurred during verification. Please try again.'
        );
      }
    };

    verifyNow();
  }, [verificationKey, verifyPodcastClaim]);

  const handleGoToDashboard = () => {
    router.push('/creator-dashboard');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Loading State */}
        {state === 'verifying' && (
          <>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faSpinner} className={styles.iconLoading} />
            </div>
            <h1 className={styles.title}>Verifying Claim</h1>
            <p className={styles.description}>
              Please wait while we verify your podcast claim...
            </p>
          </>
        )}

        {/* Success State */}
        {state === 'success' && (
          <>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.iconSuccess} />
            </div>
            <h1 className={styles.title}>Claim Verified!</h1>
            <p className={styles.description}>
              Your podcast claim has been successfully verified. 
            </p>
            <button onClick={handleGoToDashboard} className={styles.button}>
              Go to Creator Dashboard
            </button>
          </>
        )}

        {/* Error State */}
        {state === 'error' && (
          <>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faTimesCircle} className={styles.iconError} />
            </div>
            <h1 className={styles.title}>Verification Failed</h1>
            <p className={styles.description}>
              {errorMessage}
            </p>
            <div className="space-y-3">
              <button onClick={handleGoHome} className={styles.button}>
                Return to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
