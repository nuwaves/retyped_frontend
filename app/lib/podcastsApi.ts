import axios from 'axios';
import { Podcast } from '@/app/types/podcast.types';

export const getTopPodcastsByViews = async (timeframe: string = 'all'): Promise<Podcast[]> => {
    try {
        const response = await axios.get<Podcast[]>(
            '/api/podcasts/top-by-views',
            { params: { timeframe } }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch top podcasts:', error);
        throw error;
    }
};