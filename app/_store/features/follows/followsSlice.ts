import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/_store/store';

interface FollowsState {
  // Map of entity_type:entity_id -> follow_id for O(1) lookup
  followMap: Record<string, number>;
}

const initialState: FollowsState = {
  followMap: {},
};

export const followsSlice = createSlice({
  name: 'follows',
  initialState,
  reducers: {
    addFollowToMap: (
      state,
      action: PayloadAction<{ entity_type: string; entity_id: number; follow_id: number }>
    ) => {
      const key = `${action.payload.entity_type}:${action.payload.entity_id}`;
      state.followMap[key] = action.payload.follow_id;
    },
    removeFollowFromMap: (
      state,
      action: PayloadAction<{ entity_type: string; entity_id: number }>
    ) => {
      const key = `${action.payload.entity_type}:${action.payload.entity_id}`;
      delete state.followMap[key];
    },
    setFollowsMap: (state, action: PayloadAction<Record<string, number>>) => {
      state.followMap = action.payload;
    },
    clearFollows: (state) => {
      state.followMap = {};
    },
  },
});

export const {
  addFollowToMap,
  removeFollowFromMap,
  setFollowsMap,
  clearFollows,
} = followsSlice.actions;

// Selectors
export const selectFollowMap = (state: RootState) => state.follows.followMap;

export const selectIsFollowing = (
  state: RootState,
  entity_type: string,
  entity_id: number
) => {
  const key = `${entity_type}:${entity_id}`;
  return !!state.follows.followMap[key];
};

export const selectFollowId = (
  state: RootState,
  entity_type: string,
  entity_id: number
) => {
  const key = `${entity_type}:${entity_id}`;
  return state.follows.followMap[key] || null;
};

export default followsSlice.reducer;
