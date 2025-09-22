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
  total_views?: number;
}