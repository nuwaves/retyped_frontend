import { Topic } from '@/app/_types';

// Topics are machine-generated clusters. Some are built on filler or swear
// words rather than a subject ("yeah / like / um"), and some have too few
// episodes to make a useful page. Those stay reachable by URL but are left
// out of the categories list and marked noindex.
const FILLER_WORDS = new Set([
  'yeah', 'um', 'uh', 'oh', 'know', 'im', 'youre', 'hes', 'dont', 'think',
  'going', 'guy', 'guys', 'dude', 'bro', 'thanks', 'fuck', 'fucking', 'shit',
]);

export const MIN_TOPIC_EPISODES = 5;

export function isUsefulTopic(topic: Pick<Topic, 'episode_count' | 'top_words'>): boolean {
  if ((topic.episode_count || 0) < MIN_TOPIC_EPISODES) return false;
  const leadWords = (topic.top_words || []).slice(0, 4);
  const filler = leadWords.filter((word) => FILLER_WORDS.has(word.toLowerCase())).length;
  return filler < 2;
}
