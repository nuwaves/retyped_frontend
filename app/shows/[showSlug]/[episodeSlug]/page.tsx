import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BackNavigation from "@/app/components/common/BackNavigation";
import EpisodeDetailCard from "./components/EpisodeDetailCard";
import EpisodeTabs from "./components/EpisodeTabs";
import { 
  getShowBySlug, 
  getEpisodeBySlug, 
  getAllEpisodePaths,
  Show,
  Episode 
} from "@/app/lib/mockData";

// ISR: Revalidate every hour for fresh content
export const revalidate = 3600;

// Generate static params for all episodes at build time (SSG)
export async function generateStaticParams() {
  const paths = await getAllEpisodePaths();
  return paths.map(({ showSlug, episodeSlug }) => ({
    showSlug,
    episodeSlug,
  }));
}

interface EpisodePageProps {
  params: Promise<{
    showSlug: string;
    episodeSlug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { showSlug, episodeSlug } = await params;
  const show = await getShowBySlug(showSlug);
  const episode = await getEpisodeBySlug(showSlug, episodeSlug);
  
  if (!show || !episode) {
    return {
      title: "Episode Not Found | Retyped",
      description: "The podcast episode you're looking for could not be found.",
    };
  }
  
  const episodeTitle = `${episode.title} | ${show.title}`;
  
  return {
    title: `${episodeTitle} | Retyped`,
    description: episode.description,
    keywords: [show.category, "podcast", "episode", show.title, episode.title],
    authors: [{ name: show.author }],
    openGraph: {
      title: episodeTitle,
      description: episode.description,
      type: "article",
      siteName: "Retyped",
      publishedTime: episode.publishDate,
      authors: [show.author],
      tags: [show.category, "podcast"],
      images: [
        {
          url: show.imageUrl,
          width: 1200,
          height: 630,
          alt: episodeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episodeTitle,
      description: episode.description,
      images: [show.imageUrl],
      creator: `@${show.author.replace(/\s+/g, '')}`,
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
function generateStructuredData(show: Show, episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": episode.title,
    "description": episode.description,
    "datePublished": episode.publishDate,
    "duration": `PT${episode.duration.toUpperCase()}`,
    "episodeNumber": episode.episodeNumber,
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": show.title,
      "url": `https://retyped.com/shows/${show.slug}`
    },
    "author": {
      "@type": "Person",
      "name": show.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Retyped",
      "logo": {
        "@type": "ImageObject",
        "url": "https://retyped.com/logo.png"
      }
    },
    "url": `https://retyped.com/shows/${show.slug}/${episode.slug}`,
    "audio": episode.audioUrl ? {
      "@type": "AudioObject",
      "contentUrl": episode.audioUrl,
      "duration": `PT${episode.duration.toUpperCase()}`
    } : undefined,
    "aggregateRating": show.rating ? {
      "@type": "AggregateRating",
      "ratingValue": show.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": Math.floor(show.followers / 10)
    } : undefined
  };
}

// Breadcrumb structured data for better navigation in search results
function generateBreadcrumbData(show: Show, episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://retyped.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": show.title,
        "item": `https://retyped.com/shows/${show.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": episode.title,
        "item": `https://retyped.com/shows/${show.slug}/${episode.slug}`
      }
    ]
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { showSlug, episodeSlug } = await params;
  
  // Fetch data in parallel for better performance
  const [show, episode] = await Promise.all([
    getShowBySlug(showSlug),
    getEpisodeBySlug(showSlug, episodeSlug)
  ]);
  
  if (!show || !episode) {
    notFound();
  }
  
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
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackNavigation href={`/shows/${showSlug}`} label={show.title} />
        
        <EpisodeDetailCard episode={episode} show={show} />
        
        <EpisodeTabs episode={episode} isAuthenticated={false} />
      </div>
    </>
  );
}