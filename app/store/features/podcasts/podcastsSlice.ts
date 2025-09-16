import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';
import { Podcast } from '@/app/types/podcast.types';
import { getTopPodcastsByViews } from '@/app/lib/podcastsApi';

interface PodcastsState {
    trendingPodcasts: Podcast[];
    loading: boolean;
    error: string | null;
}

const initialState: PodcastsState = {
    trendingPodcasts: [],
    loading: false,
    error: null,
};

export const fetchTrendingPodcasts = createAsyncThunk(
    'podcasts/fetchTrending',
    async (timeframe: string = 'all') => {
        const response = await getTopPodcastsByViews(timeframe);
        return response;
    }
);

export const podcastsSlice = createSlice({
    name: 'podcasts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingPodcasts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingPodcasts.fulfilled, (state, action: PayloadAction<Podcast[]>) => {
                state.loading = false;
                state.trendingPodcasts = action.payload;
            })
            .addCase(fetchTrendingPodcasts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch trending podcasts';
            });
    },
});

export const { clearError } = podcastsSlice.actions;

export const selectTrendingPodcasts = (state: RootState) => state.podcasts.trendingPodcasts;
export const selectPodcastsLoading = (state: RootState) => state.podcasts.loading;
export const selectPodcastsError = (state: RootState) => state.podcasts.error;

export default podcastsSlice.reducer;