/**
 * Ensures image URLs use HTTPS protocol for Next.js Image component compatibility
 * Next.js Image component requires HTTPS URLs for security reasons
 */
export function ensureHttps(url: string | undefined | null): string {
  if (!url) return '';

  // If already HTTPS or protocol-relative, return as-is
  if (url.startsWith('https://') || url.startsWith('//')) {
    return url;
  }

  // Convert HTTP to HTTPS
  if (url.startsWith('http://')) {
    return url.replace(/^http:\/\//i, 'https://');
  }

  // If no protocol, assume HTTPS
  return `https://${url}`;
}