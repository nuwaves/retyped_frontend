import type { NextConfig } from "next";
import { DJANGO_BACKEND } from '@/app/_config/env';

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [320, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [64, 75, 288, 302],
  },
  // Force blocking metadata (no streaming) for SEO bots to ensure metadata is in <head>
  // This prevents metadata from streaming after the initial HTML for search engine crawlers
  // See: https://neuralcovenant.com/2025/06/the-metadata-streaming-controversy-in-next.js-15.1-/
  htmlLimitedBots: new RegExp([
    'Googlebot',
    'Googlebot-Image',
    'Googlebot-News',
    'Googlebot-Video',
    'Storebot-Google',
    'Google-InspectionTool',
    'GoogleOther',
    'bingbot',
    'Bingbot',
    'BingPreview',
    'msnbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Sogou',
    'Exabot',
    'facebookexternalhit',
    'facebot',
    'ia_archiver',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'TelegramBot',
  ].join('|')),
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: `${DJANGO_BACKEND}/sitemap.xml`,
        permanent: false,
      },
      {
        source: '/sitemap-episodes:id.xml',
        destination: `${DJANGO_BACKEND}/sitemap-episodes:id.xml`,
        permanent: false,
      },
      {
        source: '/sitemap-podcasts:id.xml',
        destination: `${DJANGO_BACKEND}/sitemap-podcasts:id.xml`,
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
