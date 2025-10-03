export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface TimestampedModel {
  created_at: string;
  updated_at: string;
}