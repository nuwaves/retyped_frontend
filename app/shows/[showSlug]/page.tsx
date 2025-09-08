import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BackNavigation from "@/app/components/common/BackNavigation";
import ShowDetailCard from "@/app/components/shows/ShowDetailCard";
import ShowActionButtons from "@/app/components/shows/ShowActionButtons";
import EpisodesList from "@/app/components/episodes/EpisodesList";
import { getShowBySlug, getShowEpisodes, Show } from "@/app/lib/mockData";

// ISR: Revalidate every hour
export const revalidate = 3600;

interface ShowPageProps {
  params: Promise<{
    showSlug: string;
  }>;
}

export async function generateMetadata({ params }: ShowPageProps): Promise<Metadata> {
  const { showSlug } = await params;
  const show = await getShowBySlug(showSlug);
  
  if (!show) {
    return {
      title: "Show Not Found | Retyped",
      description: "The podcast show you're looking for could not be found.",
    };
  }
  
  return {
    title: `${show.title} | Retyped`,
    description: show.description,
    openGraph: {
      title: show.title,
      description: show.description,
      type: "website",
      siteName: "Retyped",
      images: [
        {
          url: show.imageUrl,
          width: 1200,
          height: 630,
          alt: show.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: show.title,
      description: show.description,
      images: [show.imageUrl],
    },
    alternates: {
      canonical: `/shows/${show.slug}`,
    },
  };
}

// Generate JSON-LD structured data for SEO
function generateStructuredData(show: Show) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": show.title,
    "description": show.description,
    "author": {
      "@type": "Person",
      "name": show.author
    },
    "numberOfEpisodes": show.episodeCount,
    "genre": show.category,
    "inLanguage": show.language || "en",
    "url": `https://retyped.com/shows/${show.slug}`,
    "aggregateRating": show.rating ? {
      "@type": "AggregateRating",
      "ratingValue": show.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": show.followers
    } : undefined
  };
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { showSlug } = await params;
  const show = await getShowBySlug(showSlug);
  
  if (!show) {
    notFound();
  }
  
  const episodes = await getShowEpisodes(show.id);
  const structuredData = generateStructuredData(show);
  
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
        {/* Back navigation */}
        <BackNavigation href="/" label="Home" />
        
        {/* Server Component with Client Component as children */}
        <ShowDetailCard show={show}>
          <ShowActionButtons showId={show.id} />
        </ShowDetailCard>
        
        {/* Episodes section */}
        <EpisodesList 
          episodes={episodes} 
          totalCount={show.episodeCount} 
        />
      </div>
    </>
  );
}