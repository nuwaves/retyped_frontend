import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';
import { Episode } from '@/app/types/podcast.types';
import { getTopEpisodesByViews, getLatestEpisodes, EpisodesResponse } from '@/app/lib/episodesApi';

interface EpisodesState {
    trendingEpisodes: Episode[];
    latestEpisodes: Episode[];
    latestEpisodesCount: number;
    loading: boolean;
    latestLoading: boolean;
    error: string | null;
    latestError: string | null;
}

const initialState: EpisodesState = {
    trendingEpisodes: [],
    latestEpisodes: [],
    latestEpisodesCount: 0,
    loading: false,
    latestLoading: false,
    error: null,
    latestError: null,
};

export const fetchTrendingEpisodes = createAsyncThunk(
    'episodes/fetchTrending',
    async (timeframe: string = 'all') => {
        const response = await getTopEpisodesByViews(timeframe);
        return response;
    }
);

export const fetchLatestEpisodes = createAsyncThunk(
    'episodes/fetchLatest',
    async ({ page = 1, limit = 4 }: { page?: number; limit?: number } = {}) => {
        const response = await getLatestEpisodes(page, limit);
        return response;
    }
);

export const episodesSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Trending episodes
            .addCase(fetchTrendingEpisodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingEpisodes.fulfilled, (state, action: PayloadAction<Episode[]>) => {
                state.loading = false;
                state.trendingEpisodes = action.payload;
            })
            .addCase(fetchTrendingEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch trending episodes';
            })
            // Latest episodes
            .addCase(fetchLatestEpisodes.pending, (state) => {
                state.latestLoading = true;
                state.latestError = null;
            })
            .addCase(fetchLatestEpisodes.fulfilled, (state, action: PayloadAction<EpisodesResponse>) => {
                state.latestLoading = false;
                state.latestEpisodes = action.payload.results;
                state.latestEpisodesCount = action.payload.count;
            })
            .addCase(fetchLatestEpisodes.rejected, (state, action) => {
                state.latestLoading = false;
                state.latestError = action.error.message || 'Failed to fetch latest episodes';
            });
    },
});

export const { clearError } = episodesSlice.actions;

export const selectTrendingEpisodes = (state: RootState) => state.episodes.trendingEpisodes;
export const selectEpisodesLoading = (state: RootState) => state.episodes.loading;
export const selectEpisodesError = (state: RootState) => state.episodes.error;

export const selectLatestEpisodes = (state: RootState) => state.episodes.latestEpisodes;
export const selectLatestEpisodesLoading = (state: RootState) => state.episodes.latestLoading;
export const selectLatestEpisodesError = (state: RootState) => state.episodes.latestError;
export const selectLatestEpisodesCount = (state: RootState) => state.episodes.latestEpisodesCount;

export default episodesSlice.reducer;