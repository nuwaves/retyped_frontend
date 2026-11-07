import Link from 'next/link';
import OptimizedImage from '@/app/_components/common/OptimizedImage';
import type { RelatedEpisode } from '@/app/_types';
import { formatDate } from '@/app/_utils/formatters';
import { ensureHttps } from '@/app/_utils/imageUrl';

interface RecommendedEpisodesProps {
  episodes: RelatedEpisode[];
}

const styles = {
  container: "bg-white rounded-lg p-6",
  header: "text-base font-bold leading-6 text-slate-900 mb-4",
  list: "flex flex-col divide-y divide-slate-100",
  item: "group flex gap-3 py-3 first:pt-0 last:pb-0",
  image: "w-12 h-12 flex-shrink-0 overflow-hidden rounded bg-gradient-to-br from-purple-400 to-blue-500",
  details: "flex flex-col gap-1 min-w-0",
  title: "text-sm font-bold leading-5 text-slate-900 line-clamp-2 group-hover:underline",
  meta: "text-xs leading-4 text-neutral-500 truncate",
};

export default function RecommendedEpisodes({ episodes }: RecommendedEpisodesProps) {
  if (episodes.length === 0) return null;

  return (
    <section className={styles.container} aria-labelledby="recommended-episodes-heading">
      <h3 id="recommended-episodes-heading" className={styles.header}>
        Recommended Episodes
      </h3>

      <ul className={styles.list}>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link
              href={`/shows/${episode.podcast.slug}/${episode.slug}`}
              className={styles.item}
            >
              <OptimizedImage
                src={ensureHttps(episode.image_url || episode.podcast.image_url)}
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="w-full h-full object-cover"
                containerClassName={styles.image}
              />
              <div className={styles.details}>
                <span className={styles.title}>{episode.title}</span>
                <span className={styles.meta}>
                  {episode.podcast.name}
                  {episode.release_date && ` · ${formatDate(episode.release_date)}`}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
