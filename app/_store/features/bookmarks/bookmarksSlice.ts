import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/_store/store';

interface BookmarksState {
  // Map of entity_type:entity_id -> bookmark_id for O(1) lookup
  bookmarkMap: Record<string, number>;
}

const initialState: BookmarksState = {
  bookmarkMap: {},
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmarkToMap: (
      state,
      action: PayloadAction<{ entity_type: string; entity_id: number; bookmark_id: number }>
    ) => {
      const key = `${action.payload.entity_type}:${action.payload.entity_id}`;
      state.bookmarkMap[key] = action.payload.bookmark_id;
    },
    removeBookmarkFromMap: (
      state,
      action: PayloadAction<{ entity_type: string; entity_id: number }>
    ) => {
      const key = `${action.payload.entity_type}:${action.payload.entity_id}`;
      delete state.bookmarkMap[key];
    },
    setBookmarksMap: (state, action: PayloadAction<Record<string, number>>) => {
      state.bookmarkMap = action.payload;
    },
    clearBookmarks: (state) => {
      state.bookmarkMap = {};
    },
  },
});

export const {
  addBookmarkToMap,
  removeBookmarkFromMap,
  setBookmarksMap,
  clearBookmarks,
} = bookmarksSlice.actions;

// Selectors
export const selectBookmarkMap = (state: RootState) => state.bookmarks.bookmarkMap;

export const selectIsBookmarked = (
  state: RootState,
  entity_type: string,
  entity_id: number
) => {
  const key = `${entity_type}:${entity_id}`;
  return !!state.bookmarks.bookmarkMap[key];
};

export const selectBookmarkId = (
  state: RootState,
  entity_type: string,
  entity_id: number
) => {
  const key = `${entity_type}:${entity_id}`;
  return state.bookmarks.bookmarkMap[key] || null;
};

export default bookmarksSlice.reducer;
