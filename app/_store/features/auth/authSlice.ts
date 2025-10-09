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

/**
 * Checks if the backend token has expired
 * Returns true if:
 * - No token exists
 * - Token doesn't have expiration data
 * - Current time is past expiration time (with 60 second buffer)
 */
export const selectIsTokenExpired = (state: RootState) => {
    const token = state.auth.backendToken;

    // No token means expired
    if (!token?.access_token) return true;

    // If we don't have expiration data, assume token is still valid
    // (backward compatibility for existing sessions)
    if (!token.token_created_at || !token.expires_in) return false;

    const expirationTime = token.token_created_at + (token.expires_in * 1000);
    const now = Date.now();
    const bufferTime = 60 * 1000; // 60 seconds buffer before actual expiration

    return now >= (expirationTime - bufferTime);
};

/**
 * Combined check for valid authentication
 * User is authenticated and token is not expired
 */
export const selectIsValidAuth = (state: RootState) => {
    return selectIsAuthenticated(state) && !selectIsTokenExpired(state);
};

// Legacy selector for backward compatibility
export const selectAuthToken = (state: RootState) => state.auth.backendToken?.access_token || null;

export default authSlice.reducer;
