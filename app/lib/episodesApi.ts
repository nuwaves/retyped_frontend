import axios from 'axios';
import { Episode } from '@/app/types/podcast.types';

export const getTopEpisodesByViews = async (timeframe: string = 'all'): Promise<Episode[]> => {
    try {
        const response = await axios.get<Episode[]>(
            '/api/episodes/top-by-views',
            { params: { timeframe } }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch top episodes:', error);
        throw error;
    }
};