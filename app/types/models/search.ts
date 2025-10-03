import { Episode } from './episode';
import { Podcast } from './podcast';

export interface SearchResponse {
  episodes: Episode[];
  podcasts: Podcast[];
  entities: unknown[];
}
