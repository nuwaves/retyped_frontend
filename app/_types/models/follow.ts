import { TimestampedModel } from './common';

export type FollowEntityType = 'tag' | 'podcast';

export interface Follow extends TimestampedModel {
  id: number;
  user: number;
  entity_type: FollowEntityType;
  entity_id: number;
  entity: string | Record<string, any>; // Can be JSON string or parsed object from backend
}

export interface CreateFollowRequest {
  entity_type: FollowEntityType;
  entity_id: number;
}
