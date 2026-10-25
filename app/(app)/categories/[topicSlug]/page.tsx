import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNavigation from '@/app/_components/common/BackNavigation';
import Pill from '@/app/_components/common/Pill';
import TopicEpisodesList from './components/TopicEpisodesList';
import QuoteFeed from './components/QuoteFeed';
import { Topic, Episode, TopicQuote, PaginatedResponse } from '@/app/_types';
import { api, safeApi } from '@/app/_lib/serverApi';

export const revalidate = 3600;

interface TopicPageProps {
  params: Promise<{ topicSlug: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topicSlug } = await params;
  const topic = await api<Topic>(`/api/v1/topics/${topicSlug}/`).catch(() => null);

  if (!topic) {
    return { title: 'Topic Not Found | Retyped' };
  }

  const description = topic.description
    ? `${topic.description} — Browse ${topic.episode_count.toLocaleString()} episodes on Retyped.`
    : `Browse ${topic.episode_count.toLocaleString()} podcast episodes about ${topic.name} on Retyped.`;

  return {
    title: `${topic.name} Podcasts | Retyped`,
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: `${topic.name} Podcasts | Retyped`,
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: topic.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.name} Podcasts | Retyped`,
      description,
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicSlug } = await params;

  const [topic, episodesData, quotesData] = await Promise.all([
    api<Topic>(`/api/v1/topics/${topicSlug}/`).catch(() => null),
    safeApi<PaginatedResponse<Episode>>(
      `/api/v1/topics/${topicSlug}/episodes/?limit=20`,
      { count: 0, next: null, previous: null, results: [] }
    ),
    safeApi<PaginatedResponse<TopicQuote>>(
      `/api/v1/topics/${topicSlug}/quotes/?limit=20`,
      { count: 0, next: null, previous: null, results: [] }
    ),
  ]);

  if (!topic) {
    notFound();
  }

  const hasQuotes = quotesData.results.length > 0;
  const hasEpisodes = episodesData.results.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <BackNavigation href="/categories" label="Categories" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">{topic.name}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {topic.episode_count.toLocaleString()} episodes
          {quotesData.count > 0 && ` · ${quotesData.count.toLocaleString()} quotes`}
        </p>

        {topic.description && (
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {topic.description}
          </p>
        )}

        {topic.top_words && topic.top_words.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topic.top_words.map((word) => (
              <Pill key={word} size="xs" variant="filled" radius="full">
                {word}
              </Pill>
            ))}
          </div>
        )}
      </div>

      {/* Content: quotes feed + episodes sidebar */}
      {!hasQuotes && !hasEpisodes ? (
        <p className="text-gray-500">No content found for this topic yet.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Quote feed — main column */}
          {hasQuotes && (
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-black mb-4">
                Quotes
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({quotesData.count.toLocaleString()})
                </span>
              </h2>
              <QuoteFeed
                topicSlug={topicSlug}
                initialQuotes={quotesData.results}
                totalCount={quotesData.count}
              />
            </div>
          )}

          {/* Episodes — sidebar */}
          {hasEpisodes && (
            <div className={hasQuotes ? 'lg:w-[360px] lg:flex-shrink-0' : 'w-full'}>
              <h2 className="text-lg font-semibold text-black mb-4">
                Episodes
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({episodesData.count.toLocaleString()})
                </span>
              </h2>
              <TopicEpisodesList
                topicSlug={topicSlug}
                initialEpisodes={episodesData.results}
                totalCount={episodesData.count}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
