export interface TopicQuote {
  id: number;
  text: string;
  speaker: string | null;
  timestamp: string | null;
  episode_title: string;
  episode_slug: string;
  podcast_name: string;
  podcast_slug: string;
  podcast_image_url: string | null;
  created_at: string;
}
