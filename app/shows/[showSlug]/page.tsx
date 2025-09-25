import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BackNavigation from "@/app/components/common/BackNavigation";
import ShowDetailCard from "./components/ShowDetailCard";
import ShowActionButtons from "./components/ShowActionButtons";
import EpisodesList from "@/app/components/modules/shows/EpisodesList";
import { getShow } from "@/app/lib/api/shows";
import { api } from "@/app/lib/api";
import { Episode, PaginatedResponse } from "@/app/types";
import { generateShowMetadata, generateShowStructuredData } from "@/app/lib/seo/metadata";

// ISR: Revalidate every hour
export const revalidate = 3600;

interface ShowPageProps {
  params: Promise<{
    showSlug: string;
  }>;
}

export async function generateMetadata({ params }: ShowPageProps): Promise<Metadata> {
  const { showSlug } = await params;
  const show = await getShow(showSlug);
  return generateShowMetadata(show);
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { showSlug } = await params;

  const show = await getShow(showSlug);

  if (!show) {
    notFound();
  }

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