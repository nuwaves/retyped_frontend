export interface RelatedEpisode {
  id: number;
  slug: string;
  title: string;
  release_date: string | null;
  duration: string | null;
  image_url: string | null;
  podcast: {
    id: number;
    slug: string;
    name: string;
    image_url: string | null;
  };
}

export interface RelatedTopic {
  id: number;
  name: string;
  slug: string;
}

export interface RelatedEntity {
  id: number;
  name: string;
  type: 'PERSON' | 'ORGANIZATION' | 'PRODUCT' | string;
}

/** Response of GET /api/v1/episodes/<slug>/related/ */
export interface RelatedContent {
  episodes: RelatedEpisode[];
  topics: RelatedTopic[];
  entities: RelatedEntity[];
}

export const EMPTY_RELATED_CONTENT: RelatedContent = {
  episodes: [],
  topics: [],
  entities: [],
};
