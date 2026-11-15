export function formatCompactNumber(
  count: number | undefined | null,
  fallback = '0'
): string {
  if (count == null) return fallback;
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${Math.floor(count / 1000)}K`;
  return count.toString();
}

export function formatDuration(duration: string | null): string {
  if (!duration) return '';
  const parts = duration.split(':');
  if (parts.length === 3) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
  return duration;
}

export function formatDate(dateString: string, longFormat = false): string {
  const date = new Date(dateString);
  const utcDate = new Date(date.toISOString());

  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const months = longFormat ? monthsLong : monthsShort;
  const month = months[utcDate.getUTCMonth()];
  const day = utcDate.getUTCDate();
  const year = utcDate.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

export function convertToISO8601Duration(duration: string | null): string | undefined {
  if (!duration) return undefined;
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  let iso = 'PT';
  if (hours > 0) iso += `${hours}H`;
  if (minutes > 0) iso += `${minutes}M`;
  if (seconds > 0) iso += `${seconds}S`;
  return iso !== 'PT' ? iso : undefined;
}

export function sanitizeForMetaDescription(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/\n+/g, ' ')  // Replace all newlines with spaces
    .replace(/\s+/g, ' ')  // Collapse multiple spaces into one
    .trim();               // Remove leading/trailing spaces
}

export function extractSummaryHeadings(text: string | null | undefined): string[] {
  if (!text) return [];
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(text)) !== null) {
    headings.push(match[1].trim());
  }
  return headings;
}

export function extractFirstSentence(text: string | null | undefined): string {
  if (!text) return '';
  const stripped = text
    .replace(/#{1,6}\s+/g, '')           // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
    .replace(/\*(.+?)\*/g, '$1')         // italic
    .replace(/`(.+?)`/g, '$1')           // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // links
    .replace(/\n+/g, ' ')                // newlines to spaces
    .replace(/\s+/g, ' ')                // collapse whitespace
    .trim();

  const match = stripped.match(/^.+?[.!?](?:\s|$)/);
  const sentence = match ? match[0].trim() : stripped.split(' ').slice(0, 20).join(' ');
  return sentence.endsWith('.') || sentence.endsWith('!') || sentence.endsWith('?')
    ? sentence
    : sentence + '.';
}

// Section labels the summary model puts on their own line ("Key Points:") or
// in front of the real sentence ("Main Topic: ..."). They say nothing in a
// search snippet, so they are dropped.
const SUMMARY_LABEL = /^(?:(?:podcast\s+)?(?:episode\s+)?(?:summary|overview)|main\s+(?:topic|theme)s?|topics?|key\s+(?:points|takeaways|insights)|introduction)\s*(?::\s*|$)/i;

// A plain-text description for meta tags, built from a markdown summary (or
// any plain text): no markdown, no section labels, no list numbering, cut at
// a word boundary.
export function summaryToDescription(text: string | null | undefined, maxLength = 155): string {
  if (!text) return '';
  const parts: string[] = [];
  for (const rawLine of text.split(/\n+/)) {
    let line = rawLine
      .trim()
      .replace(/^#{1,6}\s+/, '')           // heading marker
      .replace(/^(?:\d+[.)]|[-*•])\s+/, '') // list marker
      .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
      .replace(/\*(.+?)\*/g, '$1')         // italic
      .replace(/`(.+?)`/g, '$1')           // inline code
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // links
      .replace(/\s+/g, ' ')
      .trim();
    line = line.replace(SUMMARY_LABEL, '').trim();
    if (!line || line.endsWith(':')) continue;
    parts.push(/[.!?…]$/.test(line) ? line : `${line}.`);
  }
  const joined = parts.join(' ');
  if (joined.length <= maxLength) return joined;
  const cut = joined.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-—]+$/, '')}…`;
}

// Plain text from publisher show-notes HTML, for meta descriptions.
export function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// True when an episode has a Retyped summary or a transcript. Episodes
// without either only repeat the publisher's show notes, so they are noindexed.
export function episodeHasContent(episode: {
  summary?: string | null;
  transcript?: unknown;
  script_transcript?: string | null;
}): boolean {
  const hasText = (value: unknown) =>
    typeof value === 'string' ? value.trim().length > 0 : Array.isArray(value) && value.length > 0;
  return hasText(episode.summary) || hasText(episode.transcript) || hasText(episode.script_transcript);
}
