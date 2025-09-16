export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Podcast {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  image_url?: string;
  total_views?: number;
}

export interface Episode {
  id: number;
  slug: string;
  tags: Tag[];
  title: string;
  subtitle: string | null;
  description: string;
  summary: string | null;
  release_date: string;
  created_at: string;
  updated_at: string;
  podcast: Podcast;
  total_views?: number;
}