import axios from 'axios';
import { Episode } from '@/app/types/podcast.types';

export interface EpisodesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Episode[];
}

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

export const getLatestEpisodes = async (page: number = 1, limit: number = 4): Promise<EpisodesResponse> => {
    try {
        const response = await axios.get<EpisodesResponse>(
            '/api/episodes',
            { params: { page, limit } }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch latest episodes:', error);
        throw error;
    }
};