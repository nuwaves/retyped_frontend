import { MetadataRoute } from 'next'
import { DJANGO_BACKEND } from '@/app/_config/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz';
  const apiUrl = DJANGO_BACKEND || 'https://api.retyped.xyz';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login', '/signup'],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${apiUrl}/sitemap.xml`,
    ],
  }
}
