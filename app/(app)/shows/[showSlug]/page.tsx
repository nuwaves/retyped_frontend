import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackNavigation from "@/app/_components/common/BackNavigation";
import ShowDetailCard from "./components/ShowDetailCard";
import ShowActionButtons from "./components/ShowActionButtons";
import EpisodesList from "./components/EpisodesList";
import { api } from "@/app/_lib/serverApi";
import { Episode, PaginatedResponse, Podcast } from "@/app/_types";
import { sanitize } from "@/app/_utils/sanitizeHtml";

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
          width: 1080,
          height: 1080,
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
      canonical: './',
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

  const episodes = (episodesResponse.results || []).map(episode => ({
    ...episode,
    description: sanitize(episode.description)
  }));

  const podcastSeriesData = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: show.name,
    description: show.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'}/shows/${show.slug}`,
    image: show.image_url,
    ...(show.author && {
      author: show.author,
    }),
    ...(show.url && {
      webFeed: show.url,
    }),
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastSeriesData)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />

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