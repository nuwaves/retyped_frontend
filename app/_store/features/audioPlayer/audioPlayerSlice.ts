import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode } from '@/app/_types';

interface AudioPlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isVisible: boolean;
  volume: number;
}

const initialState: AudioPlayerState = {
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isVisible: false,
  volume: 1,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    playEpisode: (state, action: PayloadAction<Episode>) => {
      state.currentEpisode = action.payload;
      state.isPlaying = true;
      state.isVisible = true;
      state.currentTime = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    closePlayer: (state) => {
      state.isVisible = false;
      state.isPlaying = false;
      state.currentEpisode = null;
      state.currentTime = 0;
      state.duration = 0;
    },
  },
});

export const {
  playEpisode,
  togglePlay,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  closePlayer,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
