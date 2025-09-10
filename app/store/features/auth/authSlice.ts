import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        clearAuthToken: (state) => {
            state.token = null;
        },
    },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

// Selector to get the token from the state
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
