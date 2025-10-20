import { TimestampedModel } from './common';

/**
 * Podcast Claim Status
 * - pending: Claim created, awaiting verification
 * - verified: Claim verified successfully
 * - rejected: Claim rejected or failed verification
 */
export type PodcastClaimStatus = 'pending' | 'verified' | 'rejected';

/**
 * Podcast Claim Model
 * Represents a user's claim to own/manage a podcast
 */
export interface PodcastClaim extends TimestampedModel {
  id: number;
  user: number; // User ID who created the claim
  podcast: number; // Podcast ID being claimed
  status?: PodcastClaimStatus; // May not be in API response
  verification_key?: string; // Only present in creation response
}

/**
 * Request payload for creating a new podcast claim
 * the user will be inferred by the access token
 */
export interface CreatePodcastClaimRequest {
  podcast: number; // Podcast ID to claim
}

/**
 * Verification status response
 * Returned when checking verification status via GET /claims/verify/{key}/
 */
export interface ClaimVerificationStatus {
  status: PodcastClaimStatus;
  podcast: number;
  message?: string;
  claim_id?: number;
}

/**
 * Verification result
 * Returned after POST /claims/verify/{key}/
 */
export interface ClaimVerificationResult {
  success: boolean;
  message: string;
  claim?: PodcastClaim;
}
