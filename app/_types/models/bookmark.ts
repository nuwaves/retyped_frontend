import { TimestampedModel } from './common';

export type BookmarkEntityType = 'episode' | 'podcast';

export interface Bookmark extends TimestampedModel {
  id: number;
  user: number;
  entity_type: BookmarkEntityType;
  entity_id: number;
  entity: string | Record<string, any>; // Can be JSON string or parsed object from backend
}

export interface CreateBookmarkRequest {
  entity_type: BookmarkEntityType;
  entity_id: number;
}
