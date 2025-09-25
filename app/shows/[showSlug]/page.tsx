import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BackNavigation from "@/app/components/common/BackNavigation";
import ShowDetailCard from "./components/ShowDetailCard";
import ShowActionButtons from "./components/ShowActionButtons";
import EpisodesList from "@/app/components/modules/shows/EpisodesList";
import { api } from "@/app/lib/api";
import { Episode, PaginatedResponse, Podcast } from "@/app/types";

export const revalidate = 3600;

interface ShowPageProps {
  params: Promise<{
    showSlug: string;
  }>;
}

function generateShowMetadata(show: Podcast | null): Metadata {
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

function generateShowStructuredData(show: Podcast, episodeCount: number) {
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

export async function generateMetadata({ params }: ShowPageProps): Promise<Metadata> {
  const { showSlug } = await params;

  const show = await api<Podcast>(`/api/v1/podcasts/${showSlug}/`)
    .catch(() => null);

  return generateShowMetadata(show);
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { showSlug } = await params;

  const show = await api<Podcast>(`/api/v1/podcasts/${showSlug}/`)
    .catch(() => null);

  if (!show) {
    notFound();
  }

  // TODO: Change to use the show's endpoint for fetching its episodes
  // Should be: /api/v1/podcasts/${showSlug}/episodes/?limit=5
  const episodesResponse = await api<PaginatedResponse<Episode>>(
    `/api/v1/episodes/?search=${encodeURIComponent(show.name)}&limit=5`
  ).catch(() => ({ count: 0, next: null, previous: null, results: [] }));

  const episodes = episodesResponse.results || [];

  const structuredData = generateShowStructuredData(show, episodes.length);
  
  return (
    <>
      <Script
        id="podcast-show-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href="/" label="Home" />
        
        <ShowDetailCard show={show}>
          <ShowActionButtons showId={show.id.toString()} />
        </ShowDetailCard>

        <EpisodesList
          episodes={episodes}
          totalCount={episodes.length}
        />
      </div>
    </>
  );
}