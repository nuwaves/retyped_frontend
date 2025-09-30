import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackNavigation from "@/app/components/common/BackNavigation";
import EpisodeDetailCard from "./components/EpisodeDetailCard";
import EpisodeTabs from "./components/EpisodeTabs";
import ShowCard from "./components/ShowCard";
import { api } from "@/app/lib/api";
import { Podcast, Episode } from "@/app/types";
import { sanitize } from "@/app/utils/sanitizeHtml";

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
  
  const episodeTitle = `${episode.title} | ${show.name}`;

  const cleanDescription = sanitize(episode.description, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();

  return {
    title: `${episodeTitle} | Retyped`,
    description: cleanDescription,
    keywords: [show.tags?.[0]?.name || "Podcast", "podcast", "episode", show.name, episode.title],
    authors: [],
    openGraph: {
      title: episodeTitle,
      description: cleanDescription,
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
      description: cleanDescription,
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

// Generate JSON-LD structured data for SEO
function generateStructuredData(show: Podcast, episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": episode.title,
    "description": episode.description,
    "datePublished": episode.release_date,
    "duration": episode.duration || "PT0S",
    "episodeNumber": episode.episode_number || 1,
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": show.name,
      "url": `https://retyped.xyz/shows/${show.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Retyped",
      "logo": {
        "@type": "ImageObject",
        "url": "https://retyped.xyz/logo.png"
      }
    },
    "url": `https://retyped.xyz/shows/${show.slug}/${episode.slug}`,
    "audio": episode.raw_audio_url ? {
      "@type": "AudioObject",
      "contentUrl": episode.raw_audio_url,
      "duration": episode.duration || "PT0S"
    } : undefined
  };
}

// Breadcrumb structured data for better navigation in search results
function generateBreadcrumbData(show: Podcast, episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://retyped.xyz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": show.name,
        "item": `https://retyped.xyz/shows/${show.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": episode.title,
        "item": `https://retyped.xyz/shows/${show.slug}/${episode.slug}`
      }
    ]
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

  const structuredData = generateStructuredData(show, episode);
  const breadcrumbData = generateBreadcrumbData(show, episode);

  return (
    <>
      <Script
        id="podcast-episode-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbData)}
      </Script>

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