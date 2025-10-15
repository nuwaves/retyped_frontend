import { Tag, TimestampedModel } from './common';
import { Podcast } from './podcast';

export interface Episode extends TimestampedModel {
  id: number;
  slug: string;
  tags: Tag[];
  title: string;
  subtitle: string | null;
  description: string | null;
  summary: string | null;
  release_date: string;
  pub_date: string;
  podcast?: Podcast;
  image_url?: string | null;
  duration?: string;
  episode_number?: number;
  season_number?: number | null;
  raw_audio_url?: string;
  audio_type?: string;
  audio_length?: number;
  total_views?: number;
  episode_type?: string;
  has_public_transcript?: boolean;
  itunes_explicit?: boolean;
  itunes_episode_type?: string | null;
  content_encoded?: string;
  transcript?: string;
  script_transcript?: string;
  entities?: number[];
  error?: string;
}