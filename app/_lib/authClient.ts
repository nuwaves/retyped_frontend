import axios from 'axios';
import { TokenValidation } from '@/app/_types/api.types';
import { DJANGO_BACKEND } from '@/app/_config/env';

const authApiClient = axios.create({
    baseURL: DJANGO_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getConvertionToken = async (data: TokenValidation) => {
    try {
        const response = await authApiClient.post('/auth/convert-token/', data);

        // Add timestamp when token was created to calculate expiration
        return {
            ...response.data,
            token_created_at: Date.now()
        };
    } catch (error) {
        console.error('Failed token convertion:', error);
        throw error;
    }
};

export default authApiClient;
