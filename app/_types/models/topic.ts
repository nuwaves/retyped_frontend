import { TimestampedModel } from './common';

export interface Topic extends TimestampedModel {
  id: number;
  name: string;
  slug: string;
  description: string;
  top_words: string[] | null;
  is_enabled: boolean;
  episode_count: number;
}
