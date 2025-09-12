import axios from 'axios';
import { TokenValidation } from '@/app/types/api.types'

const authApiClient = axios.create({
    baseURL: process.env.DJANGO_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getConvertionToken = async (data: TokenValidation) => {
    try {
        const response = await authApiClient.post('/auth/convert-token', data);
        return response.data;
    } catch (error) {
        console.error('Failed token convertion:', error.toJSON());
        throw error;
    }
};

export default authApiClient;
