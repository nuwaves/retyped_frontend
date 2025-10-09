export interface TokenValidation {
    grant_type: string;
    client_id: string;
    backend: string;
    token: string;
}

export interface BackendToken {
    access_token: string;
    refresh_token: string;
    expires_in?: number;        // seconds until expiration from backend
    token_created_at?: number;  // timestamp when token was created (milliseconds)
    user: {
        email?: string;
        first_name?: string;
        last_name?: string;
    }
}