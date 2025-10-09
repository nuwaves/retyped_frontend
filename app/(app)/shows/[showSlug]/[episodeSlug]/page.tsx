import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackNavigation from "@/app/_components/common/BackNavigation";
import EpisodeDetailCard from "./components/EpisodeDetailCard";
import EpisodeTabs from "./components/EpisodeTabs";
import ShowCard from "./components/ShowCard";
import { api } from "@/app/_lib/serverApi";
import { Podcast, Episode } from "@/app/_types";

// ISR: Revalidate every hour for fresh content
export const revalidate = 3600;

// Remove static generation - using ISR only
// export async function generateStaticParams() { ... }

interface EpisodePageProps {
  params: Promise<{
    showSlug: string;
    episodeSlug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { showSlug, episodeSlug } = await params;

  let show: Podcast | null = null;
  let episode: Episode | null = null;

  try {
    // Fetch both in parallel
    [show, episode] = await Promise.all([
      api<Podcast>(`/api/v1/podcasts/${showSlug}/`),
      api<Episode>(`/api/v1/episodes/${episodeSlug}/`)
    ]);
  } catch (error) {
    console.error('Failed to fetch data for metadata:', error);
  }
  
  if (!show || !episode) {
    return {
      title: "Episode Not Found | Retyped",
      description: "The podcast episode you're looking for could not be found.",
    };
  }
  
  const episodeTitle = `Retyped summary of ${episode.title}`;
  const metaDescription = episode.summary || `Listen to ${episode.title} from ${show.name} summarized by Retyped.`;

  return {
    title: `${episodeTitle} | Retyped`,
    description: metaDescription,
    keywords: [show.tags?.[0]?.name || "Podcast", "podcast", "episode", show.name, episode.title],
    authors: [],
    openGraph: {
      title: episodeTitle,
      description: metaDescription,
      type: "article",
      siteName: "Retyped",
      publishedTime: episode.release_date,
      authors: [],
      tags: [show.tags?.[0]?.name || "Podcast", "podcast"],
      images: [
        {
          url: show.image_url || '/',
          alt: episodeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episodeTitle,
      description: metaDescription,
      images: [show.image_url || '/'],
      creator: undefined,
    },
    alternates: {
      canonical: `/shows/${showSlug}/${episodeSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


export default async function EpisodePage({ params }: EpisodePageProps) {
  const { showSlug, episodeSlug } = await params;

  let show: Podcast | null = null;
  let episode: Episode | null = null;

  try {
    // Fetch data in parallel for better performance
    [show, episode] = await Promise.all([
      api<Podcast>(`/api/v1/podcasts/${showSlug}/`),
      api<Episode>(`/api/v1/episodes/${episodeSlug}/`)
    ]);
  } catch (error) {
    console.error('Failed to fetch episode data:', error);
    notFound();
  }

  if (!show || !episode) {
    notFound();
  }

  // Get server session to check authentication status
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.backendToken;

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BackNavigation href={`/shows/${showSlug}`} label={show.name} />

        <div className="flex gap-8">
          <div className="flex-1">
            <EpisodeDetailCard episode={episode} show={show} />
            <EpisodeTabs episode={episode} isAuthenticated={isAuthenticated} />
          </div>

          <aside className="w-[350px] flex-shrink-0">
            <ShowCard show={show} />
          </aside>
        </div>
      </div>
    </>
  );
}