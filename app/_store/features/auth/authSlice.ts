import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/_store/store';
import { BackendToken } from '@/app/_types/api.types';

interface AuthState {
    backendToken: BackendToken | null;
}

const initialState: AuthState = {
    backendToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<BackendToken | null>) => {
            state.backendToken = action.payload;
        },
        clearAuthToken: (state) => {
            state.backendToken = null;
        },
    },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

// Selectors
export const selectBackendToken = (state: RootState) => state.auth.backendToken;
export const selectAccessToken = (state: RootState) => state.auth.backendToken?.access_token || null;
export const selectRefreshToken = (state: RootState) => state.auth.backendToken?.refresh_token || null;
export const selectUser = (state: RootState) => state.auth.backendToken?.user || null;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.backendToken?.access_token;

// Legacy selector for backward compatibility
export const selectAuthToken = (state: RootState) => state.auth.backendToken?.access_token || null;

export default authSlice.reducer;
