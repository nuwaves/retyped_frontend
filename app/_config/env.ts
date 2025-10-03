const normalizeUrl = (url: string | undefined): string => {
  if (!url) return '';
  return url.replace(/\/$/, '');
};

export const DJANGO_BACKEND = normalizeUrl(process.env.DJANGO_BACKEND);
