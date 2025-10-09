import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackNavigation from "@/app/_components/common/BackNavigation";
import ShowDetailCard from "./components/ShowDetailCard";
import ShowActionButtons from "./components/ShowActionButtons";
import EpisodesList from "@/app/_components/modules/shows/EpisodesList";
import { api } from "@/app/_lib/serverApi";
import { Episode, PaginatedResponse, Podcast } from "@/app/_types";

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

  const metaTitle = `Retyped summaries of ${show.name}`;
  const metaDescription = `Explore AI-generated summaries of ${show.name} episodes on Retyped. Get quick insights and key takeaways from every episode.`;

  return {
    title: `${metaTitle} | Retyped`,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      siteName: 'Retyped',
      images: [
        {
          url: show.image_url || '',
          alt: show.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [show.image_url || ''],
    },
    alternates: {
      canonical: `/shows/${show.slug}`,
    },
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

  const INITIAL_EPISODES_LIMIT = 15;
  const episodesResponse = await api<PaginatedResponse<Episode>>(
    `/api/v1/podcasts/${showSlug}/episodes?limit=${INITIAL_EPISODES_LIMIT}`
  ).catch(() => ({ count: 0, next: null, previous: null, results: [] }));

  const episodes = episodesResponse.results || [];

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href="/" label="Home" />
        
        <ShowDetailCard show={show}>
          <ShowActionButtons showId={show.id.toString()} />
        </ShowDetailCard>

        <EpisodesList
          episodes={episodes}
          totalCount={episodesResponse.count || episodes.length}
          showSlug={showSlug}
        />
      </div>
    </>
  );
}