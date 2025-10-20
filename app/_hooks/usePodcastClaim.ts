'use client';

import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@/app/_store/hooks';
import {
  useCreatePodcastClaimMutation,
  useVerifyPodcastClaimMutation,
  useGetClaimVerificationStatusQuery,
} from '@/app/_store/services/podcastClaimsApi';
import {
  selectHasClaim,
  selectClaimId,
  addClaimToMap,
} from '@/app/_store/features/podcastClaims/podcastClaimsSlice';
import { selectIsAuthenticated } from '@/app/_store/features/auth/authSlice';
import { useDispatch } from 'react-redux';

/**
 * Hook for managing podcast claim interactions
 * Provides claim creation and verification submission
 * Note: Verification keys are sent via email and not stored in Redux
 */
export function usePodcastClaim(podcast_id: number) {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const hasClaim = useAppSelector((state) => selectHasClaim(state, podcast_id));
  const claimId = useAppSelector((state) => selectClaimId(state, podcast_id));

  const [createClaim, { isLoading: isCreating }] =
    useCreatePodcastClaimMutation();
  const [verifyClaim, { isLoading: isVerifying }] =
    useVerifyPodcastClaimMutation();

  /**
   * Create a new claim for this podcast
   * Verification key will be sent via email
   */
  const createPodcastClaim = useCallback(async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return false;
    }

    if (hasClaim) {
      console.warn('Claim already exists for this podcast');
      return false;
    }

    try {
      const result = await createClaim({ podcast: podcast_id }).unwrap();

      // Store claim in map
      dispatch(
        addClaimToMap({
          podcast_id,
          claim_id: result.id,
        })
      );

      return true;
    } catch (error) {
      console.error('Claim creation failed:', error);
      // Could add toast notification here
      throw error;
    }
  }, [isAuthenticated, hasClaim, podcast_id, createClaim, dispatch]);

  /**
   * Verify a claim using the verification key from email
   */
  const verifyPodcastClaim = useCallback(
    async (key: string) => {
      if (!isAuthenticated) {
        window.location.href = '/auth';
        return false;
      }

      try {
        const result = await verifyClaim(key).unwrap();
        return result.success;
      } catch (error) {
        console.error('Claim verification failed:', error);
        // Could add toast notification here
        throw error;
      }
    },
    [isAuthenticated, verifyClaim]
  );

  return {
    hasClaim,
    claimId,
    createPodcastClaim,
    verifyPodcastClaim,
    isCreating,
    isVerifying,
    isLoading: isCreating || isVerifying,
    isAuthenticated,
  };
}

/**
 * Hook for checking verification status by key
 * Useful for verification pages/modals
 */
export function useClaimVerificationStatus(verificationKey: string | null) {
  const { data, isLoading, error, refetch } =
    useGetClaimVerificationStatusQuery(verificationKey || '', {
      skip: !verificationKey,
      // Poll every 5 seconds while pending
      pollingInterval: 5000,
    });

  const isPending = useMemo(() => {
    return data?.status === 'pending';
  }, [data?.status]);

  const isVerified = useMemo(() => {
    return data?.status === 'verified';
  }, [data?.status]);

  const isRejected = useMemo(() => {
    return data?.status === 'rejected';
  }, [data?.status]);

  return {
    status: data?.status,
    isPending,
    isVerified,
    isRejected,
    podcast: data?.podcast,
    message: data?.message,
    isLoading,
    error,
    refetch,
  };
}
