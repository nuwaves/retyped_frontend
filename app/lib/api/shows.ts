import { api } from '@/app/lib/api';
import { Podcast, Episode, PaginatedResponse } from '@/app/types';

/**
 * Fetch a single podcast show by slug
 */
export async function getShow(slug: string): Promise<Podcast | null> {
  try {
    return await api<Podcast>(`/api/v1/podcasts/${slug}/`);
  } catch (error) {
    console.error(`Failed to fetch show ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch episodes for a specific show
 */
export async function getShowEpisodes(
  showName: string,
  limit = 5
): Promise<Episode[]> {
  try {
    // TODO: Change to use the show's endpoint for fetching its episodes
    // Should be: /api/v1/podcasts/${showSlug}/episodes/?limit=${limit}
    const response = await api<PaginatedResponse<Episode>>(
      `/api/v1/episodes/?search=${encodeURIComponent(showName)}&limit=${limit}`
    );
    return response.results || [];
  } catch (error) {
    console.error(`Failed to fetch episodes for show ${showName}:`, error);
    return [];
  }
}

