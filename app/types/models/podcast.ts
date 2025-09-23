import { Tag, TimestampedModel } from './common';

export interface Podcast extends TimestampedModel {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  subtitle?: string;
  summary?: string;
  author?: string;
  language?: string;
  copyright?: string;
  itunes_explicit?: boolean;
  itunes_type?: string;
  itunes_categories?: string | null;
  image_url?: string;
  itunes_image_url?: string | null;
  owner_name?: string | null;
  owner_email?: string | null;
  pub_date?: string;
  last_build_date?: string;
  is_active?: boolean;
  last_processed?: string;
  tags: Tag[];
  total_views?: number;
}