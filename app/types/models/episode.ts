import { Tag, TimestampedModel } from './common';
import { Podcast } from './podcast';

export interface Episode extends TimestampedModel {
  id: number;
  slug: string;
  tags: Tag[];
  title: string;
  subtitle: string | null;
  description: string;
  summary: string | null;
  release_date: string;
  podcast: Podcast;
  image_url?: string | null;
  duration?: string;
  episode_number?: number;
  raw_audio_url?: string;
  total_views?: number;
}