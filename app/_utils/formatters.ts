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