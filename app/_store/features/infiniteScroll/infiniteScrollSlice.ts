import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode, Podcast } from '@/app/_types';

interface ScrollState<T> {
  items: T[];
  offset: number;
  scrollPosition: number;
  lastUpdated: number;
}

interface InfiniteScrollState {
  trendingShows: ScrollState<Podcast> | null;
  trendingEpisodes: ScrollState<Episode> | null;
  newEpisodes: ScrollState<Episode> | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const initialState: InfiniteScrollState = {
  trendingShows: null,
  trendingEpisodes: null,
  newEpisodes: null,
};

const infiniteScrollSlice = createSlice({
  name: 'infiniteScroll',
  initialState,
  reducers: {
    saveTrendingShows: (state, action: PayloadAction<{
      items: Podcast[];
      offset: number;
      scrollPosition: number;
    }>) => {
      state.trendingShows = {
        items: action.payload.items,
        offset: action.payload.offset,
        scrollPosition: action.payload.scrollPosition,
        lastUpdated: Date.now(),
      };
    },
    saveTrendingEpisodes: (state, action: PayloadAction<{
      items: Episode[];
      offset: number;
      scrollPosition: number;
    }>) => {
      state.trendingEpisodes = {
        items: action.payload.items,
        offset: action.payload.offset,
        scrollPosition: action.payload.scrollPosition,
        lastUpdated: Date.now(),
      };
    },
    clearTrendingShows: (state) => {
      state.trendingShows = null;
    },
    clearTrendingEpisodes: (state) => {
      state.trendingEpisodes = null;
    },
    saveNewEpisodes: (state, action: PayloadAction<{
      items: Episode[];
      offset: number;
      scrollPosition: number;
    }>) => {
      state.newEpisodes = {
        items: action.payload.items,
        offset: action.payload.offset,
        scrollPosition: action.payload.scrollPosition,
        lastUpdated: Date.now(),
      };
    },
    clearNewEpisodes: (state) => {
      state.newEpisodes = null;
    },
    clearExpiredCache: (state) => {
      const now = Date.now();

      if (state.trendingShows && now - state.trendingShows.lastUpdated > CACHE_DURATION) {
        state.trendingShows = null;
      }

      if (state.trendingEpisodes && now - state.trendingEpisodes.lastUpdated > CACHE_DURATION) {
        state.trendingEpisodes = null;
      }

      if (state.newEpisodes && now - state.newEpisodes.lastUpdated > CACHE_DURATION) {
        state.newEpisodes = null;
      }
    },
  },
});

export const {
  saveTrendingShows,
  saveTrendingEpisodes,
  saveNewEpisodes,
  clearTrendingShows,
  clearTrendingEpisodes,
  clearNewEpisodes,
  clearExpiredCache,
} = infiniteScrollSlice.actions;

export default infiniteScrollSlice.reducer;

// Selectors
export const selectTrendingShows = (state: { infiniteScroll: InfiniteScrollState }) => {
  const cached = state.infiniteScroll.trendingShows;
  if (!cached) return null;

  // Check if cache is expired
  const isExpired = Date.now() - cached.lastUpdated > CACHE_DURATION;
  return isExpired ? null : cached;
};

export const selectTrendingEpisodes = (state: { infiniteScroll: InfiniteScrollState }) => {
  const cached = state.infiniteScroll.trendingEpisodes;
  if (!cached) return null;

  // Check if cache is expired
  const isExpired = Date.now() - cached.lastUpdated > CACHE_DURATION;
  return isExpired ? null : cached;
};

export const selectNewEpisodes = (state: { infiniteScroll: InfiniteScrollState }) => {
  const cached = state.infiniteScroll.newEpisodes;
  if (!cached) return null;

  // Check if cache is expired
  const isExpired = Date.now() - cached.lastUpdated > CACHE_DURATION;
  return isExpired ? null : cached;
};