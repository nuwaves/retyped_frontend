import { Metadata } from 'next';
import { Podcast, Episode } from '@/app/types';

/**
 * Generate metadata for a show page
 */
export function generateShowMetadata(show: Podcast | null): Metadata {
  if (!show) {
    return {
      title: 'Show Not Found | Retyped',
      description: "The podcast show you're looking for could not be found.",
    };
  }

  return {
    title: `${show.name} | Retyped`,
    description: show.description,
    openGraph: {
      title: show.name,
      description: show.description,
      type: 'website',
      siteName: 'Retyped',
      images: [
        {
          url: show.image_url || '',
          width: 1200,
          height: 630,
          alt: show.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: show.name,
      description: show.description,
      images: [show.image_url || ''],
    },
    alternates: {
      canonical: `/shows/${show.slug}`,
    },
  };
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateShowStructuredData(show: Podcast, episodeCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: show.name,
    description: show.description,
    numberOfEpisodes: episodeCount,
    genre: show.tags?.[0]?.name || 'Podcast',
    url: `https://retyped.com/shows/${show.slug}`,
  };
}