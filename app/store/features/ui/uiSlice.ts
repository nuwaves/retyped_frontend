import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isSearchBarFocused: boolean;
}

const initialState: UIState = {
  isSearchBarFocused: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchBarFocus: (state, action: PayloadAction<boolean>) => {
      state.isSearchBarFocused = action.payload;
    },
  },
});

export const { setSearchBarFocus } = uiSlice.actions;
export default uiSlice.reducer;