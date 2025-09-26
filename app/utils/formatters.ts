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