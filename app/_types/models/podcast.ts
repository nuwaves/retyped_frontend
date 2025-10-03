import { Tag, TimestampedModel } from './common';

export interface Podcast extends TimestampedModel {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  image_url: string;
  tags: Tag[];
  episode_count: number;
  total_views: number;
}