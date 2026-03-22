import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackNavigation from '@/app/_components/common/BackNavigation';
import Pill from '@/app/_components/common/Pill';
import TopicEpisodesList from './components/TopicEpisodesList';
import { Topic, Episode, PaginatedResponse } from '@/app/_types';
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

  const [topic, episodesData] = await Promise.all([
    api<Topic>(`/api/v1/topics/${topicSlug}/`).catch(() => null),
    safeApi<PaginatedResponse<Episode>>(
      `/api/v1/topics/${topicSlug}/episodes/?limit=20`,
      { count: 0, next: null, previous: null, results: [] }
    ),
  ]);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BackNavigation href="/categories" label="Categories" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">{topic.name}</h1>

        <p className="text-gray-500 text-sm mb-4">
          {topic.episode_count.toLocaleString()} episodes
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

      {episodesData.results.length === 0 ? (
        <p className="text-gray-500">No episodes found for this topic.</p>
      ) : (
        <TopicEpisodesList
          topicSlug={topicSlug}
          initialEpisodes={episodesData.results}
          totalCount={episodesData.count}
        />
      )}
    </div>
  );
}
