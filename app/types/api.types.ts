export interface TokenValidation {
    grant_type: string;
    client_id: string;
    backend: string;
    token: string;
}

export interface BackendToken {
    access_token: string;
    refresh_token: string;
    user: {
        email?: string;
        first_name?: string;
        last_name?: string;
    }
}