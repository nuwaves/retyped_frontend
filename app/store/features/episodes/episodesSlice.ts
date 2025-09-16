import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';
import { Episode } from '@/app/types/podcast.types';
import { getTopEpisodesByViews } from '@/app/lib/episodesApi';

interface EpisodesState {
    trendingEpisodes: Episode[];
    loading: boolean;
    error: string | null;
}

const initialState: EpisodesState = {
    trendingEpisodes: [],
    loading: false,
    error: null,
};

export const fetchTrendingEpisodes = createAsyncThunk(
    'episodes/fetchTrending',
    async (timeframe: string = 'all') => {
        const response = await getTopEpisodesByViews(timeframe);
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
            });
    },
});

export const { clearError } = episodesSlice.actions;

export const selectTrendingEpisodes = (state: RootState) => state.episodes.trendingEpisodes;
export const selectEpisodesLoading = (state: RootState) => state.episodes.loading;
export const selectEpisodesError = (state: RootState) => state.episodes.error;

export default episodesSlice.reducer;