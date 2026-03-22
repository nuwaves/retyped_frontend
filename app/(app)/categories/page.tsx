import { Metadata } from 'next';
import Link from 'next/link';
import BackNavigation from '@/app/_components/common/BackNavigation';
import Pill from '@/app/_components/common/Pill';
import { Topic, PaginatedResponse } from '@/app/_types';
import { safeApi } from '@/app/_lib/serverApi';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data = await safeApi<PaginatedResponse<Topic>>(
    '/api/v1/topics/?limit=1',
    { count: 0, next: null, previous: null, results: [] }
  );
  const count = data.count || 0;
  const description = count > 0
    ? `Browse ${count} podcast topic categories on Retyped — explore episodes by subject across technology, business, culture, and more.`
    : 'Browse podcast topic categories on Retyped — explore episodes by subject.';
  return {
    title: 'Categories | Retyped',
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: 'Categories | Retyped',
      description,
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped categories' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Categories | Retyped',
      description,
    },
  };
}

export default async function CategoriesPage() {
  const data = await safeApi<PaginatedResponse<Topic>>(
    '/api/v1/topics/',
    { count: 0, next: null, previous: null, results: [] }
  );
  const topics = data.results;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <BackNavigation href="/" label="Home" />

      <h1 className="text-3xl font-bold text-black mb-2">Categories</h1>
      <p className="text-gray-500 text-sm mb-8">
        {data.count > 0 ? `${data.count} topics across the podcast library` : 'Browse podcast topics'}
      </p>

      {topics.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/categories/${topic.slug}`}
      className="group flex flex-col gap-3 bg-white rounded shadow-[0px_4px_6px_0px_#00000017] p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-bold text-black leading-snug group-hover:underline line-clamp-2">
          {topic.name}
        </h2>
        <span className="flex-shrink-0 text-xs font-medium text-gray-400 tabular-nums pt-0.5">
          {topic.episode_count.toLocaleString()} ep
        </span>
      </div>

      {topic.description && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {topic.description}
        </p>
      )}

      {topic.top_words && topic.top_words.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {topic.top_words.slice(0, 5).map((word) => (
            <Pill key={word} size="xs" variant="filled" radius="full">
              {word}
            </Pill>
          ))}
        </div>
      )}
    </Link>
  );
}
