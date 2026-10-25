import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faQuoteLeft } from '@/app/_lib/icons';
import EpisodeCard from '@/app/_components/cards/EpisodeCard';
import { Episode, TopicQuote } from '@/app/_types';
import { formatDate } from '@/app/_utils/formatters';
import { sanitize } from '@/app/_utils/sanitizeHtml';

interface PersonalizedFeedProps {
  episodes: Episode[];
  quotes: TopicQuote[];
}

function FeedQuoteCard({ quote }: { quote: TopicQuote }) {
  const episodeHref = `/shows/${quote.podcast_slug}/${quote.episode_slug}`;
  const showHref = `/shows/${quote.podcast_slug}`;

  return (
    <div className="bg-white rounded-lg shadow-[0px_3px_3px_0px_#E2E8F0] p-5 flex flex-col gap-3">
      <div className="flex gap-3">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="text-gray-200 text-xl flex-shrink-0 mt-1"
        />
        <Link
          href={episodeHref}
          className="text-gray-800 text-sm leading-relaxed hover:text-black transition-colors"
        >
          {quote.text}
        </Link>
      </div>
      {quote.speaker && (
        <p className="text-xs font-semibold text-gray-500 pl-8">— {quote.speaker}</p>
      )}
      <div className="flex items-center gap-2 pl-8 pt-2 border-t border-gray-100">
        {quote.podcast_image_url && (
          <Link href={showHref} className="flex-shrink-0">
            <div className="relative w-7 h-7 rounded overflow-hidden bg-gray-100">
              <Image
                src={quote.podcast_image_url}
                alt={quote.podcast_name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          </Link>
        )}
        <div className="min-w-0">
          <Link
            href={showHref}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 truncate transition-colors block"
          >
            {quote.podcast_name}
          </Link>
          <Link
            href={episodeHref}
            className="text-xs text-gray-400 hover:text-gray-600 truncate transition-colors block"
          >
            {quote.episode_title}
          </Link>
        </div>
      </div>
    </div>
  );
}

type FeedItem =
  | { type: 'episode'; item: Episode; key: string }
  | { type: 'quote'; item: TopicQuote; key: string };

export default function PersonalizedFeed({ episodes, quotes }: PersonalizedFeedProps) {
  // Interleave episodes and quotes: 1 episode, 2 quotes, repeat
  const feedItems: FeedItem[] = [];
  let ei = 0;
  let qi = 0;
  while (ei < episodes.length || qi < quotes.length) {
    if (ei < episodes.length) {
      feedItems.push({ type: 'episode', item: episodes[ei], key: `ep-${episodes[ei].id}` });
      ei++;
    }
    for (let q = 0; q < 2 && qi < quotes.length; q++, qi++) {
      feedItems.push({ type: 'quote', item: quotes[qi], key: `qt-${quotes[qi].id}` });
    }
  }

  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faHeadphones} className="text-xl text-slate-900" />
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Your Feed</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedItems.map((entry) => {
            if (entry.type === 'episode') {
              const episode = entry.item;
              return (
                <EpisodeCard
                  key={entry.key}
                  episodeId={episode.id}
                  showName={episode.podcast?.name || ''}
                  showSlug={episode.podcast?.slug}
                  episodeTitle={episode.title}
                  description={sanitize(episode.description)}
                  duration={episode.duration || '--:--'}
                  date={formatDate(episode.release_date)}
                  href={`/shows/${episode.podcast?.slug}/${episode.slug}`}
                  imageUrl={episode.podcast?.image_url}
                />
              );
            }
            return <FeedQuoteCard key={entry.key} quote={entry.item} />;
          })}
        </div>
      </div>
    </section>
  );
}
