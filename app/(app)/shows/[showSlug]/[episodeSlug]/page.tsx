import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackNavigation from "@/app/_components/common/BackNavigation";
import EpisodeDetailCard from "./components/EpisodeDetailCard";
import EpisodeTabs from "./components/EpisodeTabs";
import ShowCard from "./components/ShowCard";
import RecommendedEpisodes from "./components/RecommendedEpisodes";
import RelevantLinks from "./components/RelevantLinks";
import { api, safeApi } from "@/app/_lib/serverApi";
import { Podcast, Episode, RelatedContent, EMPTY_RELATED_CONTENT } from "@/app/_types";
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
  sidebar: "md:w-[350px] md:flex-shrink-0 flex flex-col gap-6"
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

  let show: Podcast | null = null;
  let episode: Episode | null = null;
  let related: RelatedContent = EMPTY_RELATED_CONTENT;

  try {
    // Fetch data in parallel for better performance. The sidebar's related
    // content is optional: if it fails the page renders without it.
    [show, episode, related] = await Promise.all([
      api<Podcast>(`/api/v1/podcasts/${showSlug}/`),
      api<Episode>(`/api/v1/episodes/${episodeSlug}/`),
      safeApi<RelatedContent>(
        `/api/v1/episodes/${episodeSlug}/related/?limit=5`,
        EMPTY_RELATED_CONTENT
      ),
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
            <EpisodeTabs episode={episode} />
          </div>

          <aside className={styles.sidebar}>
            <ShowCard show={show} />
            <RecommendedEpisodes episodes={related.episodes} />
            <RelevantLinks
              show={show}
              topics={related.topics}
              entities={related.entities}
            />
          </aside>
        </div>
      </div>
    </>
  );
}