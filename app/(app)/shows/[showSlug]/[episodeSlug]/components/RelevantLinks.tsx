import Link from 'next/link';
import type { Podcast, RelatedEntity, RelatedTopic } from '@/app/_types';

interface RelevantLinksProps {
  show: Podcast;
  topics: RelatedTopic[];
  entities: RelatedEntity[];
}

const styles = {
  container: "bg-white rounded-lg p-6",
  header: "text-base font-bold leading-6 text-slate-900 mb-4",
  group: "mb-5 last:mb-0",
  groupTitle: "text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2",
  list: "flex flex-col gap-2",
  link: "text-sm leading-5 text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-900",
};

export default function RelevantLinks({ show, topics, entities }: RelevantLinksProps) {
  const people = entities.filter((entity) => entity.type === 'PERSON');
  const companies = entities.filter((entity) => entity.type !== 'PERSON');

  const groups: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: 'Categories',
      links: topics.map((topic) => ({
        href: `/categories/${topic.slug}`,
        label: `${topic.name} podcasts`,
      })),
    },
    {
      title: 'People in this episode',
      links: people.map((entity) => ({
        href: `/search?q=${encodeURIComponent(entity.name)}`,
        label: entity.name,
      })),
    },
    {
      title: 'Companies & products mentioned',
      links: companies.map((entity) => ({
        href: `/search?q=${encodeURIComponent(entity.name)}`,
        label: entity.name,
      })),
    },
    {
      title: 'Explore',
      links: [
        { href: `/shows/${show.slug}`, label: `All ${show.name} episodes` },
        { href: '/trending-episodes', label: 'Trending episodes' },
        { href: '/new-episodes', label: 'New episodes' },
      ],
    },
  ].filter((group) => group.links.length > 0);

  return (
    <nav className={styles.container} aria-labelledby="relevant-links-heading">
      <h3 id="relevant-links-heading" className={styles.header}>
        Relevant Links
      </h3>

      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h4 className={styles.groupTitle}>{group.title}</h4>
          <ul className={styles.list}>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
