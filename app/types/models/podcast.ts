import { Tag, TimestampedModel } from './common';

export interface Podcast extends TimestampedModel {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  tags: Tag[];
  image_url?: string;
  total_views?: number;
}