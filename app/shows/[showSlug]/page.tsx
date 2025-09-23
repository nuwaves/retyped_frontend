import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BackNavigation from "@/app/components/common/BackNavigation";
import ShowDetailCard from "./components/ShowDetailCard";
import ShowActionButtons from "./components/ShowActionButtons";
import EpisodesList from "@/app/components/modules/shows/EpisodesList";
import { getShow, getShowWithEpisodes } from "@/app/lib/api/shows";
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

  const { show, episodes } = await getShowWithEpisodes(showSlug, 5);

  if (!show) {
    notFound();
  }

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