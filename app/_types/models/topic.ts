import { TimestampedModel } from './common';

export interface Topic extends TimestampedModel {
  id: number;
  name: string;
  slug: string;
  description: string;
  top_words: string[] | null;
  episode_count: number;
}
