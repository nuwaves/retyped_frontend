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