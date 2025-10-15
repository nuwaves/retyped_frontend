import { TimestampedModel } from './common';

export type BookmarkEntityType = 'episode' | 'podcast';

export interface Bookmark extends TimestampedModel {
  id: number;
  user: number;
  entity_type: BookmarkEntityType;
  entity_id: number;
  entity: string | Record<string, unknown>;
}

export interface CreateBookmarkRequest {
  entity_type: BookmarkEntityType;
  entity_id: number;
}
