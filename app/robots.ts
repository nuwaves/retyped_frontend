import { MetadataRoute } from 'next'

import {
  PRIVATE_PATHS,
  SEARCH_CRAWLERS,
  TRAINING_CRAWLERS,
} from '@/app/_config/crawlers'

// Policy and sources: app/_config/crawlers.ts (decision D17).
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz';

  return {
    rules: [
      // A crawler obeys only the most specific group that names it, so the
      // search group repeats the private paths from the `*` group.
      {
        userAgent: SEARCH_CRAWLERS,
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: TRAINING_CRAWLERS,
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
  }
}
