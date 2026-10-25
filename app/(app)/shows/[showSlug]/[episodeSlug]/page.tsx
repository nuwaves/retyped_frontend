import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/authOptions";
import BackNavigation from "@/app/_components/common/BackNavigation";
import EpisodeDetailCard from "./components/EpisodeDetailCard";
import EpisodeTabs from "./components/EpisodeTabs";
import ShowCard from "./components/ShowCard";
import { api } from "@/app/_lib/serverApi";
import { Podcast, Episode } from "@/app/_types";
import { convertToISO8601Duration, extractFirstSentence, extractSummaryHeadings } from "@/app/_utils/formatters";
import { serializeJsonLd } from "@/app/_utils/jsonLd";

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

const styles = {
  container: "container mx-auto px-4 py-8 max-w-7xl",
  layout: "flex flex-col md:flex-row gap-8",
  mainContent: "flex-1",
  sidebar: "md:w-[350px] md:flex-shrink-0"
};

// Shared helper so generateMetadata and EpisodePage use the same description
function buildMetaDescription(episode: Episode, show: Podcast): string {
  const firstSentence = extractFirstSentence(episode.summary);
  const episodeLabel = episode.episode_number ? `, Ep. ${episode.episode_number}` : '';
  return firstSentence
    ? `${firstSentence} — ${show.name}${episodeLabel}`
    : `Quick insights and key takeaways for ${episode.title} from ${show.name} on Retyped.`;
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
  
  const pageTitle = `${episode.title} — ${show.name} Podcast Summary`;
  const ogTitle = `${episode.title} | ${show.name} Podcast Summary`;
  const firstSentence = extractFirstSentence(episode.summary);
  const episodeLabel = episode.episode_number ? `, Ep. ${episode.episode_number}` : '';
  const metaDescription = firstSentence
    ? `${firstSentence} — ${show.name}${episodeLabel}`
    : `Quick insights and key takeaways for ${episode.title} from ${show.name} on Retyped.`;

  return {
    title: `${pageTitle} | Retyped`,
    description: metaDescription,
    openGraph: {
      title: ogTitle,
      description: metaDescription,
      type: "article",
      siteName: "Retyped",
      publishedTime: episode.release_date,
      authors: [],
      tags: [show.tags?.[0]?.name || "Podcast", "podcast"],
      images: [
        {
          url: show.image_url || '/',
          alt: `${show.name} podcast cover`,
          width: 1080,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      images: [show.image_url || '/'],
      creator: undefined,
    },
    alternates: {
      canonical: './',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


export default async function EpisodePage({ params }: EpisodePageProps) {
  const { showSlug, episodeSlug } = await params;

  const session = await getServerSession(authOptions);
  const backendToken = session?.backendToken?.access_token;
  const isAuthenticated = !!session?.backendToken;

  // The API only returns the full transcript to signed-in users
  const authHeaders = backendToken
    ? { Authorization: `Bearer ${backendToken}` }
    : undefined;

  let show: Podcast | null = null;
  let episode: Episode | null = null;

  try {
    // Fetch data in parallel for better performance
    [show, episode] = await Promise.all([
      api<Podcast>(`/api/v1/podcasts/${showSlug}/`),
      api<Episode>(
        `/api/v1/episodes/${episodeSlug}/`,
        // Never put a signed-in user's response in the shared data cache
        authHeaders ? { headers: authHeaders, cache: 'no-store' } : undefined
      )
    ]);
  } catch (error) {
    console.error('Failed to fetch episode data:', error);
    notFound();
  }

  if (!show || !episode) {
    notFound();
  }

  const metaDescription = buildMetaDescription(episode, show);

  const summaryHeadings = extractSummaryHeadings(episode.summary);
  const webPageData = summaryHeadings.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: episode.title,
    hasPart: summaryHeadings.map((heading) => ({
      '@type': 'WebPageElement',
      name: heading,
    })),
  } : null;

  const podcastEpisodeData = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${showSlug}/${episodeSlug}`,
    datePublished: episode.release_date,
    ...(episode.duration && {
      duration: convertToISO8601Duration(episode.duration),
    }),
    ...(episode.raw_audio_url && {
      associatedMedia: {
        '@type': 'MediaObject',
        contentUrl: episode.raw_audio_url,
      },
    }),
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: show.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${showSlug}`,
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shows',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: show.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${show.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: episode.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${showSlug}/${episodeSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(podcastEpisodeData)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbData)
        }}
      />

      {webPageData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(webPageData)
          }}
        />
      )}

      <div className={styles.container}>
        <BackNavigation href={`/shows/${showSlug}`} label={show.name} />

        <div className={styles.layout}>
          <div className={styles.mainContent}>
            <EpisodeDetailCard episode={episode} show={show} />
            <EpisodeTabs episode={episode} isAuthenticated={isAuthenticated} />
          </div>

          <aside className={styles.sidebar}>
            <ShowCard show={show} />
          </aside>
        </div>
      </div>
    </>
  );
}