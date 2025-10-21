import { clientApi } from './clientApi';
import {
  PodcastClaim,
  CreatePodcastClaimRequest,
  ClaimVerificationResult,
  PaginatedResponse,
} from '@/app/_types';

export const podcastClaimsApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/podcast_claims/ - List user's podcast claims
    getPodcastClaims: builder.query<
      PaginatedResponse<PodcastClaim>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 100, offset = 0 }) => ({
        url: 'podcast_claims/',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'PodcastClaim' as const,
                id,
              })),
              { type: 'PodcastClaim', id: 'LIST' },
            ]
          : [{ type: 'PodcastClaim', id: 'LIST' }],
    }),

    // POST /api/v1/podcast_claims/ - Create a new podcast claim
    createPodcastClaim: builder.mutation<
      PodcastClaim,
      CreatePodcastClaimRequest
    >({
      query: (body) => ({
        url: 'podcast_claims/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'PodcastClaim', id: 'LIST' },
        { type: 'Podcast', id: 'LIST' }, // Invalidate podcast list
      ],
    }),

    // POST /api/v1/claims/verify/{verification_key}/ - Verify claim
    verifyPodcastClaim: builder.mutation<ClaimVerificationResult, string>({
      query: (verificationKey) => ({
        url: `claims/verify/${verificationKey}/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, verificationKey) => [
        { type: 'PodcastClaim', id: 'LIST' },
        { type: 'PodcastClaim', id: `VERIFY_${verificationKey}` },
        { type: 'Podcast', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPodcastClaimsQuery,
  useLazyGetPodcastClaimsQuery,
  useCreatePodcastClaimMutation,
  useVerifyPodcastClaimMutation,
} = podcastClaimsApi;
