import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/_store/store';

interface PodcastClaimsState {
  // Map of podcast_id -> claim_id for O(1) lookup
  claimsMap: Record<number, number>;

  // UI state
  activeClaimPodcastId: number | null; // Currently viewing claim
}

const initialState: PodcastClaimsState = {
  claimsMap: {},
  activeClaimPodcastId: null,
};

export const podcastClaimsSlice = createSlice({
  name: 'podcastClaims',
  initialState,
  reducers: {
    // Add claim to map
    addClaimToMap: (
      state,
      action: PayloadAction<{ podcast_id: number; claim_id: number }>
    ) => {
      state.claimsMap[action.payload.podcast_id] = action.payload.claim_id;
    },

    // Remove claim from map (if rejected/deleted)
    removeClaimFromMap: (state, action: PayloadAction<{ podcast_id: number }>) => {
      delete state.claimsMap[action.payload.podcast_id];
    },

    // Set entire claims map (for initial load)
    setClaimsMap: (state, action: PayloadAction<Record<number, number>>) => {
      state.claimsMap = action.payload;
    },

    // Set active claim (for modal/drawer UI)
    setActiveClaimPodcastId: (state, action: PayloadAction<number | null>) => {
      state.activeClaimPodcastId = action.payload;
    },

    // Clear all claims (on logout)
    clearClaims: (state) => {
      state.claimsMap = {};
      state.activeClaimPodcastId = null;
    },
  },
});

export const {
  addClaimToMap,
  removeClaimFromMap,
  setClaimsMap,
  setActiveClaimPodcastId,
  clearClaims,
} = podcastClaimsSlice.actions;

// Selectors
export const selectClaimsMap = (state: RootState) =>
  state.podcastClaims.claimsMap;

export const selectHasClaim = (state: RootState, podcast_id: number) => {
  return !!state.podcastClaims.claimsMap[podcast_id];
};

export const selectClaimId = (state: RootState, podcast_id: number) => {
  return state.podcastClaims.claimsMap[podcast_id] || null;
};

export const selectActiveClaimPodcastId = (state: RootState) =>
  state.podcastClaims.activeClaimPodcastId;

export default podcastClaimsSlice.reducer;
